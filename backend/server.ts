import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import postgres from "postgres";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { join } from "node:path";

// Load .env — try both parent directory (local dev) and current directory (cPanel)
dotenv.config({ path: join(process.cwd(), "../.env") });
dotenv.config({ path: join(process.cwd(), ".env") });

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" })); // allow base64 signature images

// ── Database Connection ──────────────────────────────────────────
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("❌ ERROR: DATABASE_URL is not set in .env!");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  ssl: "require",
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  onnotice: () => {}, // suppress notice logs
});

console.log("⚡ Connected to Neon PostgreSQL database!");

// ── Authentication & JWT Helpers ──────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "sira-fallback-secret";

interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token: string): TokenPayload {
  try {
    if (!token) throw new Error("Token wajib disertakan");
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    throw new Error("Sesi tidak valid, silakan login kembali");
  }
}

type RouteHandler = (req: Request, res: Response) => Promise<void>;

const handleRoute =
  (fn: RouteHandler) =>
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan internal";
      console.error("❌ API Route Error:", err);
      res.status(400).json({ error: message });
    }
  };

// ── 1. AUTHENTICATION ENDPOINTS ───────────────────────────────────

app.post(
  "/api/auth/login",
  handleRoute(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email dan password wajib diisi");

    const rows = await sql`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ${email} AND is_active = true
      LIMIT 1
    `;
    if (rows.length === 0) throw new Error("Email atau password salah");
    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash as string);
    if (!ok) throw new Error("Email atau password salah");

    const payload = { userId: user.id, email: user.email, name: user.name, role: user.role };
    const token = signToken(payload);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  })
);

app.post(
  "/api/auth/me",
  handleRoute(async (req, res) => {
    const { token } = req.body;
    const decoded = verifyToken(token);
    res.json(decoded);
  })
);

app.post(
  "/api/auth/change-password",
  handleRoute(async (req, res) => {
    const { token, oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) throw new Error("Password wajib diisi");
    if (newPassword.length < 6) throw new Error("Password baru minimal 6 karakter");

    const me = verifyToken(token);
    const rows = await sql`SELECT password_hash FROM users WHERE id = ${me.userId}`;
    if (rows.length === 0) throw new Error("User tidak ditemukan");

    const ok = await bcrypt.compare(oldPassword, rows[0].password_hash as string);
    if (!ok) throw new Error("Password lama salah");

    const hash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${me.userId}`;
    res.json({ success: true });
  })
);

app.post(
  "/api/auth/update-profile",
  handleRoute(async (req, res) => {
    const { token, name, email } = req.body;
    if (!name || !email) throw new Error("Nama dan email wajib diisi");

    const me = verifyToken(token);
    
    // Check if email is already used by someone else
    const check = await sql`SELECT id FROM users WHERE email = ${email} AND id != ${me.userId}`;
    if (check.length > 0) throw new Error("Email sudah terdaftar untuk pengguna lain");

    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${me.userId}`;
    
    // sign new token
    const payload = { userId: me.userId, email, name, role: me.role };
    const newToken = signToken(payload);
    res.json({ token: newToken, user: { id: me.userId, name, email, role: me.role } });
  })
);

app.post(
  "/api/auth/users",
  handleRoute(async (req, res) => {
    const { token } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC`;
    res.json(rows);
  })
);

app.post(
  "/api/auth/users/create",
  handleRoute(async (req, res) => {
    const { token, name, email, password, role } = req.body;
    if (!name || !email || !password || !role) throw new Error("Semua field wajib diisi");
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const hash = await bcrypt.hash(password, 10);
    const rows = await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email}, ${hash}, ${role})
      RETURNING id, name, email, role, is_active, created_at
    `;
    res.json(rows[0]);
  })
);

app.post(
  "/api/auth/users/toggle",
  handleRoute(async (req, res) => {
    const { token, userId, isActive } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE users SET is_active = ${isActive} WHERE id = ${userId}`;
    res.json({ success: true });
  })
);

app.post(
  "/api/auth/users/delete",
  handleRoute(async (req, res) => {
    const { token, userId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM users WHERE id = ${userId}`;
    res.json({ success: true });
  })
);

// ── 2. ACADEMIC YEARS ENDPOINTS ───────────────────────────────────

app.get(
  "/api/academic-years",
  handleRoute(async (_req, res) => {
    const rows = await sql`SELECT * FROM academic_years ORDER BY year DESC`;
    res.json(rows);
  })
);

app.post(
  "/api/academic-years/create",
  handleRoute(async (req, res) => {
    const { token, year } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`INSERT INTO academic_years (year) VALUES (${year}) RETURNING *`;
    res.json(rows[0]);
  })
);

app.post(
  "/api/academic-years/set-active",
  handleRoute(async (req, res) => {
    const { token, yearId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE academic_years SET is_active = false`;
    await sql`UPDATE academic_years SET is_active = true WHERE id = ${yearId}`;
    res.json({ success: true });
  })
);

app.post(
  "/api/academic-years/delete",
  handleRoute(async (req, res) => {
    const { token, yearId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM academic_years WHERE id = ${yearId}`;
    res.json({ success: true });
  })
);

// ── 3. CLASSES & ROMBELS ENDPOINTS ───────────────────────────────

app.get(
  "/api/classes",
  handleRoute(async (_req, res) => {
    const classes = await sql`SELECT * FROM classes ORDER BY level`;
    const rombels = await sql`
      SELECT r.*, u.name as wali_kelas_name
      FROM rombels r
      LEFT JOIN users u ON u.id = r.wali_kelas_id
      ORDER BY r.name
    `;
    res.json(
      classes.map((c) => ({
        ...c,
        rombels: rombels.filter((r) => r.class_id === c.id),
      }))
    );
  })
);

app.post(
  "/api/rombels",
  handleRoute(async (req, res) => {
    const { classLevel } = req.body;
    if (classLevel) {
      const rows = await sql`
        SELECT r.*, c.level as class_level
        FROM rombels r
        JOIN classes c ON c.id = r.class_id
        WHERE c.level = ${classLevel}
        ORDER BY r.name
      `;
      return res.json(rows);
    }
    const rows = await sql`
      SELECT r.*, c.level as class_level
      FROM rombels r
      JOIN classes c ON c.id = r.class_id
      ORDER BY c.level, r.name
    `;
    res.json(rows);
  })
);

app.post(
  "/api/rombels/create",
  handleRoute(async (req, res) => {
    const { token, classLevel, name, waliKelasId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const classes = await sql`SELECT id FROM classes WHERE level = ${classLevel}`;
    if (classes.length === 0) throw new Error("Kelas tidak ditemukan");
    const rows = await sql`
      INSERT INTO rombels (class_id, name, wali_kelas_id)
      VALUES (${classes[0].id}, ${name}, ${waliKelasId || null})
      RETURNING *
    `;
    res.json(rows[0]);
  })
);

app.post(
  "/api/rombels/update",
  handleRoute(async (req, res) => {
    const { token, rombelId, waliKelasId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`
      UPDATE rombels SET wali_kelas_id = ${waliKelasId}
      WHERE id = ${rombelId} RETURNING *
    `;
    res.json(rows[0]);
  })
);

app.post(
  "/api/rombels/delete",
  handleRoute(async (req, res) => {
    const { token, rombelId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM rombels WHERE id = ${rombelId}`;
    res.json({ success: true });
  })
);

// ── 4. SUBJECTS ENDPOINTS ─────────────────────────────────────────

app.post(
  "/api/subjects",
  handleRoute(async (req, res) => {
    const { classLevel } = req.body;
    if (classLevel !== undefined) {
      const rows = await sql`
        SELECT * FROM subjects WHERE class_level = ${classLevel} AND is_active = true ORDER BY sort_order, name
      `;
      return res.json(rows);
    }
    const rows = await sql`SELECT * FROM subjects WHERE is_active = true ORDER BY class_level, sort_order, name`;
    res.json(rows);
  })
);

app.post(
  "/api/subjects/create",
  handleRoute(async (req, res) => {
    const { token, name, classLevel, bobotTugas, bobotUts, bobotUas, sortOrder } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`
      INSERT INTO subjects (name, class_level, bobot_tugas, bobot_uts, bobot_uas, sort_order)
      VALUES (${name}, ${classLevel}, ${bobotTugas}, ${bobotUts}, ${bobotUas}, ${sortOrder})
      RETURNING *
    `;
    res.json(rows[0]);
  })
);

app.post(
  "/api/subjects/update",
  handleRoute(async (req, res) => {
    const { token, subjectId, ...fields } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");

    const updates: string[] = [];
    const values: unknown[] = [];

    if (fields.name !== undefined) { updates.push("name"); values.push(fields.name); }
    if (fields.bobotTugas !== undefined) { updates.push("bobot_tugas"); values.push(fields.bobotTugas); }
    if (fields.bobotUts !== undefined) { updates.push("bobot_uts"); values.push(fields.bobotUts); }
    if (fields.bobotUas !== undefined) { updates.push("bobot_uas"); values.push(fields.bobotUas); }
    if (fields.sortOrder !== undefined) { updates.push("sort_order"); values.push(fields.sortOrder); }
    if (fields.isActive !== undefined) { updates.push("is_active"); values.push(fields.isActive); }

    if (updates.length === 0) return res.status(400).json({ error: "Tidak ada field yang diupdate" });

    const setClauses = updates.map((col, i) => `${col} = $${i + 1}`).join(", ");
    values.push(subjectId);
    const rows = await sql.unsafe(
      `UPDATE subjects SET ${setClauses} WHERE id = $${values.length} RETURNING *`,
      values as any[]
    );
    res.json(rows[0]);
  })
);

app.post(
  "/api/subjects/delete",
  handleRoute(async (req, res) => {
    const { token, subjectId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE subjects SET is_active = false WHERE id = ${subjectId}`;
    res.json({ success: true });
  })
);

// ── 5. STUDENTS ENDPOINTS ─────────────────────────────────────────

app.post(
  "/api/students",
  handleRoute(async (req, res) => {
    const { token, academicYearId, classLevel, rombelId, status, q, page, limit } = req.body;
    verifyToken(token);

    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 999999;
    const offset = (parsedPage - 1) * parsedLimit;

    if (academicYearId || classLevel || rombelId) {
      const rows = await sql`
        SELECT s.*, r.id as rombel_id, r.name as rombel_name, c.level as class_level,
               ay.year as academic_year, COUNT(*) OVER() as full_count
        FROM students s
        JOIN student_rombels sr ON sr.student_id = s.id
        JOIN rombels r ON r.id = sr.rombel_id
        JOIN classes c ON c.id = r.class_id
        JOIN academic_years ay ON ay.id = sr.academic_year_id
        WHERE (${academicYearId || null}::uuid IS NULL OR ay.id = ${academicYearId || null})
          AND (${classLevel || null}::int IS NULL OR c.level = ${classLevel || null})
          AND (${rombelId || null}::uuid IS NULL OR r.id = ${rombelId || null})
          AND (${status || null}::text IS NULL OR s.status = ${status || null})
          AND (${q || null}::text IS NULL
               OR s.full_name ILIKE ${"%" + (q || "") + "%"}
               OR s.stambuk ILIKE ${"%" + (q || "") + "%"})
        ORDER BY c.level, r.name, s.full_name
        LIMIT ${parsedLimit} OFFSET ${offset}
      `;
      const totalCount = rows.length > 0 ? parseInt(String(rows[0].full_count)) : 0;
      return res.json({ data: rows, total: totalCount, page: parsedPage, limit: parsedLimit });
    }

    const rows = await sql`
      SELECT *, COUNT(*) OVER() as full_count FROM students
      WHERE (${status || null}::text IS NULL OR status = ${status || null})
        AND (${q || null}::text IS NULL
             OR full_name ILIKE ${"%" + (q || "") + "%"}
             OR stambuk ILIKE ${"%" + (q || "") + "%"})
      ORDER BY full_name
      LIMIT ${parsedLimit} OFFSET ${offset}
    `;
    const totalCount = rows.length > 0 ? parseInt(String(rows[0].full_count)) : 0;
    res.json({ data: rows, total: totalCount, page: parsedPage, limit: parsedLimit });
  })
);

app.post(
  "/api/students/bulk-delete",
  handleRoute(async (req, res) => {
    const { token, studentIds } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    if (!studentIds || studentIds.length === 0) return res.json({ success: true });
    await sql`DELETE FROM students WHERE id = ANY(${studentIds})`;
    res.json({ success: true });
  })
);

app.post(
  "/api/students/get",
  handleRoute(async (req, res) => {
    const { token, studentId } = req.body;
    verifyToken(token);
    const students = await sql`SELECT * FROM students WHERE id = ${studentId}`;
    if (students.length === 0) throw new Error("Santri tidak ditemukan");
    const history = await sql`
      SELECT sr.id, ay.year, c.level as class_level, r.name as rombel_name, r.id as rombel_id
      FROM student_rombels sr
      JOIN academic_years ay ON ay.id = sr.academic_year_id
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      WHERE sr.student_id = ${studentId}
      ORDER BY ay.year DESC
    `;
    res.json({ ...students[0], history });
  })
);

app.post(
  "/api/students/create",
  handleRoute(async (req, res) => {
    const { token, stambuk, fullName, gender, birthPlace, birthDate, parentName, address, entryYear, status, rombelId, academicYearId } = req.body;
    verifyToken(token);
    const rows = await sql`
      INSERT INTO students (stambuk, full_name, gender, birth_place, birth_date, parent_name, address, entry_year, status)
      VALUES (${stambuk}, ${fullName}, ${gender}, ${birthPlace || null}, ${birthDate || null},
              ${parentName || null}, ${address || null}, ${entryYear || null}, ${status || "Aktif"})
      RETURNING *
    `;
    const student = rows[0];
    if (rombelId && academicYearId) {
      await sql`
        INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
        VALUES (${student.id}, ${rombelId}, ${academicYearId})
        ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      `;
    }
    res.json(student);
  })
);

app.post(
  "/api/students/update",
  handleRoute(async (req, res) => {
    const { token, studentId, stambuk, fullName, gender, birthPlace, birthDate, parentName, address, entryYear, status } = req.body;
    verifyToken(token);
    const rows = await sql`
      UPDATE students SET
        stambuk     = COALESCE(${stambuk || null}, stambuk),
        full_name   = COALESCE(${fullName || null}, full_name),
        gender      = COALESCE(${gender || null}, gender),
        birth_place = COALESCE(${birthPlace || null}, birth_place),
        birth_date  = COALESCE(${birthDate || null}::date, birth_date),
        parent_name = COALESCE(${parentName || null}, parent_name),
        address     = COALESCE(${address || null}, address),
        entry_year  = COALESCE(${entryYear || null}, entry_year),
        status      = COALESCE(${status || null}, status)
      WHERE id = ${studentId}
      RETURNING *
    `;
    res.json(rows[0]);
  })
);

app.post(
  "/api/students/delete",
  handleRoute(async (req, res) => {
    const { token, studentId } = req.body;
    const me = verifyToken(token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM students WHERE id = ${studentId}`;
    res.json({ success: true });
  })
);

app.post(
  "/api/students/assign-rombel",
  handleRoute(async (req, res) => {
    const { token, studentId, rombelId, academicYearId } = req.body;
    verifyToken(token);
    const rows = await sql`
      INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
      VALUES (${studentId}, ${rombelId}, ${academicYearId})
      ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      RETURNING *
    `;
    res.json(rows[0]);
  })
);

// ── 6. SCORES ENDPOINTS ───────────────────────────────────────────

app.post("/api/scores/subject", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId } = req.body;
  verifyToken(token);
  const students = await sql`
    SELECT s.id, s.full_name, s.stambuk FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id
    WHERE sr.rombel_id = ${rombelId} AND sr.academic_year_id = ${academicYearId}
    ORDER BY s.full_name
  `;
  const subjects = await sql`
    SELECT s.* FROM subjects s
    JOIN rombels r ON r.id = ${rombelId}
    JOIN classes c ON c.id = r.class_id AND c.level = s.class_level
    WHERE s.is_active = true ORDER BY s.sort_order, s.name
  `;
  const scores = await sql`
    SELECT * FROM subject_scores
    WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
  `;
  res.json({ students, subjects, scores });
}));

app.post("/api/scores/subject/save", handleRoute(async (req, res) => {
  const { token, academicYearId, scores } = req.body;
  verifyToken(token);
  for (const score of scores) {
    const subj = await sql`SELECT bobot_tugas, bobot_uts, bobot_uas FROM subjects WHERE id = ${score.subjectId}`;
    if (subj.length === 0) continue;
    const { bobot_tugas: bt, bobot_uts: bu, bobot_uas: buas } = subj[0];
    const tugas = score.tugas ?? 0;
    const uts = score.uts ?? 0;
    const uas = score.uas ?? 0;
    const finalScore = Math.round((tugas * Number(bt) + uts * Number(bu) + uas * Number(buas)) * 10) / 10;
    await sql`
      INSERT INTO subject_scores (student_id, subject_id, academic_year_id, tugas, uts, uas, final_score, updated_at)
      VALUES (${score.studentId}, ${score.subjectId}, ${academicYearId}, ${score.tugas}, ${score.uts}, ${score.uas}, ${finalScore}, now())
      ON CONFLICT (student_id, subject_id, academic_year_id) DO UPDATE
        SET tugas = EXCLUDED.tugas, uts = EXCLUDED.uts, uas = EXCLUDED.uas,
            final_score = EXCLUDED.final_score, updated_at = now()
    `;
  }
  const subjectIds = [...new Set(scores.map((s: any) => s.subjectId))];
  for (const sid of subjectIds) {
    await sql`
      UPDATE subject_scores ss SET class_avg = (
        SELECT ROUND(AVG(final_score)::numeric, 2) FROM subject_scores
        WHERE subject_id = ${sid} AND academic_year_id = ${academicYearId} AND final_score IS NOT NULL
      ) WHERE subject_id = ${sid} AND academic_year_id = ${academicYearId}
    `;
  }
  res.json({ success: true });
}));

app.post("/api/scores/speech", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId } = req.body;
  verifyToken(token);
  const students = await sql`
    SELECT s.id, s.full_name, s.stambuk FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id
    WHERE sr.rombel_id = ${rombelId} AND sr.academic_year_id = ${academicYearId}
    ORDER BY s.full_name
  `;
  const scores = await sql`
    SELECT * FROM speech_scores
    WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
    ORDER BY language
  `;
  res.json({ students, scores });
}));

app.post("/api/scores/speech/save", handleRoute(async (req, res) => {
  const { token, academicYearId, scores } = req.body;
  verifyToken(token);
  for (const s of scores) {
    const vals = [s.penguasaan ?? 0, s.kelancaran ?? 0, s.intonasi ?? 0, s.kepercayaan ?? 0, s.penampilan ?? 0];
    const finalScore = Math.round((vals.reduce((a: number, b: number) => a + b, 0) / 5) * 10) / 10;
    await sql`
      INSERT INTO speech_scores (student_id, academic_year_id, language, penguasaan, kelancaran, intonasi, kepercayaan, penampilan, final_score, updated_at)
      VALUES (${s.studentId}, ${academicYearId}, ${s.language}, ${s.penguasaan}, ${s.kelancaran}, ${s.intonasi}, ${s.kepercayaan}, ${s.penampilan}, ${finalScore}, now())
      ON CONFLICT (student_id, academic_year_id, language) DO UPDATE
        SET penguasaan = EXCLUDED.penguasaan, kelancaran = EXCLUDED.kelancaran,
            intonasi = EXCLUDED.intonasi, kepercayaan = EXCLUDED.kepercayaan,
            penampilan = EXCLUDED.penampilan, final_score = EXCLUDED.final_score, updated_at = now()
    `;
  }
  res.json({ success: true });
}));

app.post("/api/scores/computer", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId } = req.body;
  verifyToken(token);
  const students = await sql`
    SELECT s.id, s.full_name, s.stambuk FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id
    WHERE sr.rombel_id = ${rombelId} AND sr.academic_year_id = ${academicYearId}
    ORDER BY s.full_name
  `;
  const scores = await sql`
    SELECT * FROM computer_scores
    WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
  `;
  res.json({ students, scores });
}));

app.post("/api/scores/computer/save", handleRoute(async (req, res) => {
  const { token, academicYearId, scores } = req.body;
  verifyToken(token);
  for (const s of scores) {
    const vals = [s.pengoperasian ?? 0, s.msWord ?? 0, s.msExcel ?? 0, s.internet ?? 0, s.presentasi ?? 0];
    const finalScore = Math.round((vals.reduce((a: number, b: number) => a + b, 0) / 5) * 10) / 10;
    await sql`
      INSERT INTO computer_scores (student_id, academic_year_id, pengoperasian, ms_word, ms_excel, internet, presentasi, final_score, updated_at)
      VALUES (${s.studentId}, ${academicYearId}, ${s.pengoperasian}, ${s.msWord}, ${s.msExcel}, ${s.internet}, ${s.presentasi}, ${finalScore}, now())
      ON CONFLICT (student_id, academic_year_id) DO UPDATE
        SET pengoperasian = EXCLUDED.pengoperasian, ms_word = EXCLUDED.ms_word, ms_excel = EXCLUDED.ms_excel,
            internet = EXCLUDED.internet, presentasi = EXCLUDED.presentasi, final_score = EXCLUDED.final_score, updated_at = now()
    `;
  }
  res.json({ success: true });
}));

app.post("/api/scores/discussion", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId } = req.body;
  verifyToken(token);
  const students = await sql`
    SELECT s.id, s.full_name, s.stambuk FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id
    WHERE sr.rombel_id = ${rombelId} AND sr.academic_year_id = ${academicYearId}
    ORDER BY s.full_name
  `;
  const scores = await sql`
    SELECT * FROM discussion_scores
    WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
  `;
  res.json({ students, scores });
}));

app.post("/api/scores/discussion/save", handleRoute(async (req, res) => {
  const { token, academicYearId, scores } = req.body;
  verifyToken(token);
  for (const s of scores) {
    const vals = [s.keaktifan ?? 0, s.argumentasi ?? 0, s.kerjasama ?? 0, s.penguasaan ?? 0, s.etika ?? 0];
    const finalScore = Math.round((vals.reduce((a: number, b: number) => a + b, 0) / 5) * 10) / 10;
    await sql`
      INSERT INTO discussion_scores (student_id, academic_year_id, keaktifan, argumentasi, kerjasama, penguasaan, etika, final_score, updated_at)
      VALUES (${s.studentId}, ${academicYearId}, ${s.keaktifan}, ${s.argumentasi}, ${s.kerjasama}, ${s.penguasaan}, ${s.etika}, ${finalScore}, now())
      ON CONFLICT (student_id, academic_year_id) DO UPDATE
        SET keaktifan = EXCLUDED.keaktifan, argumentasi = EXCLUDED.argumentasi, kerjasama = EXCLUDED.kerjasama,
            penguasaan = EXCLUDED.penguasaan, etika = EXCLUDED.etika, final_score = EXCLUDED.final_score, updated_at = now()
    `;
  }
  res.json({ success: true });
}));

app.post("/api/scores/attendance", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId } = req.body;
  verifyToken(token);
  const students = await sql`
    SELECT s.id, s.full_name, s.stambuk FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id
    WHERE sr.rombel_id = ${rombelId} AND sr.academic_year_id = ${academicYearId}
    ORDER BY s.full_name
  `;
  const attendance = await sql`
    SELECT * FROM attendance
    WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
  `;
  res.json({ students, attendance });
}));

app.post("/api/scores/attendance/save", handleRoute(async (req, res) => {
  const { token, academicYearId, attendance } = req.body;
  verifyToken(token);
  for (const a of attendance) {
    await sql`
      INSERT INTO attendance (student_id, academic_year_id, school_days, present, permission, absent, updated_at)
      VALUES (${a.studentId}, ${academicYearId}, ${a.schoolDays}, ${a.present}, ${a.permission}, ${a.absent}, now())
      ON CONFLICT (student_id, academic_year_id) DO UPDATE
        SET school_days = EXCLUDED.school_days, present = EXCLUDED.present,
            permission = EXCLUDED.permission, absent = EXCLUDED.absent, updated_at = now()
    `;
  }
  res.json({ success: true });
}));

// ── 7. PRINT SETTINGS ENDPOINTS ───────────────────────────────────
// Stored globally (one setting for whole school).
// Table: print_settings (id text PK, value text, updated_at)
// Run migration below if table doesn't exist yet.

async function ensurePrintSettingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS print_settings (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}
ensurePrintSettingsTable().catch(console.error);

app.get("/api/print-settings", handleRoute(async (_req, res) => {
  const rows = await sql`SELECT id, value FROM print_settings`;
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[String(row.id)] = String(row.value);
  }
  // Provide defaults if not set
  res.json({
    rapor_date: settings.rapor_date || new Date().toISOString().split("T")[0],
    rapor_headmaster: settings.rapor_headmaster || "",
    rapor_signature: settings.rapor_signature || "",
    rapor_show_sig: settings.rapor_show_sig || "true",
  });
}));

app.post("/api/print-settings/save", handleRoute(async (req, res) => {
  const { token, settings } = req.body as { token: string; settings: Record<string, string> };
  verifyToken(token); // any authenticated user can save

  for (const [id, value] of Object.entries(settings)) {
    await sql`
      INSERT INTO print_settings (id, value, updated_at)
      VALUES (${id}, ${value}, now())
      ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
  }
  res.json({ success: true });
}));

// ── 8. DASHBOARD & REPORTS ENDPOINTS ──────────────────────────────

app.post("/api/dashboard/stats", handleRoute(async (req, res) => {
  const { token, academicYearId } = req.body;
  verifyToken(token);

  let yearId = academicYearId;
  if (!yearId) {
    const activeYear = await sql`SELECT id FROM academic_years WHERE is_active = true LIMIT 1`;
    yearId = activeYear[0]?.id;
  }

  const [totalStudents] = await sql`SELECT COUNT(*) as count FROM students WHERE status = 'Aktif'`;
  const [totalClasses] = await sql`SELECT COUNT(*) as count FROM classes`;
  const [totalRombels] = await sql`SELECT COUNT(*) as count FROM rombels`;

  let avgScore = null;
  if (yearId) {
    const [avg] = await sql`
      SELECT ROUND(AVG(final_score)::numeric, 1) as avg
      FROM subject_scores WHERE academic_year_id = ${yearId} AND final_score IS NOT NULL
    `;
    avgScore = avg?.avg;
  }

  res.json({
    totalStudents: Number(totalStudents.count),
    totalClasses: Number(totalClasses.count),
    totalRombels: Number(totalRombels.count),
    avgScore: avgScore ? Number(avgScore) : null,
  });
}));

app.post("/api/dashboard/top-students", handleRoute(async (req, res) => {
  const { token, academicYearId, limit } = req.body;
  verifyToken(token);
  const rows = await sql`
    SELECT s.id, s.full_name as name, c.level as class_level, r.name as rombel_name,
           CONCAT('Kelas ', c.level, r.name) as kelas_rombel,
           ROUND(AVG(ss.final_score)::numeric, 1) as avg_score
    FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${academicYearId}
    JOIN rombels r ON r.id = sr.rombel_id
    JOIN classes c ON c.id = r.class_id
    JOIN subject_scores ss ON ss.student_id = s.id AND ss.academic_year_id = ${academicYearId}
    WHERE ss.final_score IS NOT NULL
    GROUP BY s.id, s.full_name, c.level, r.name
    ORDER BY avg_score DESC LIMIT ${limit || 10}
  `;
  res.json(rows);
}));

app.post("/api/dashboard/value-trend", handleRoute(async (req, res) => {
  const { token } = req.body;
  verifyToken(token);
  const rows = await sql`
    SELECT ay.year, ROUND(AVG(ss.final_score)::numeric, 1) as rata_rata
    FROM academic_years ay
    JOIN subject_scores ss ON ss.academic_year_id = ay.id
    WHERE ss.final_score IS NOT NULL GROUP BY ay.year ORDER BY ay.year
  `;
  res.json(rows);
}));

app.post("/api/dashboard/class-ranking", handleRoute(async (req, res) => {
  const { token, academicYearId, classLevel } = req.body;
  verifyToken(token);
  const rows = await sql`
    SELECT s.id, s.full_name as name, c.level as class_level, r.name as rombel_name,
           ROUND(AVG(ss.final_score)::numeric, 1) as avg_score,
           RANK() OVER (PARTITION BY c.level, r.id ORDER BY AVG(ss.final_score) DESC) as rank_rombel,
           RANK() OVER (PARTITION BY c.level ORDER BY AVG(ss.final_score) DESC) as rank_kelas
    FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${academicYearId}
    JOIN rombels r ON r.id = sr.rombel_id
    JOIN classes c ON c.id = r.class_id
    JOIN subject_scores ss ON ss.student_id = s.id AND ss.academic_year_id = ${academicYearId}
    WHERE ss.final_score IS NOT NULL
      AND (${classLevel || null}::int IS NULL OR c.level = ${classLevel || null})
    GROUP BY s.id, s.full_name, c.level, r.id, r.name
    ORDER BY c.level, r.name, avg_score DESC
  `;
  res.json(rows);
}));

app.post("/api/reports/card", handleRoute(async (req, res) => {
  const { token, studentId, academicYearId } = req.body;
  verifyToken(token);

  const students = await sql`SELECT * FROM students WHERE id = ${studentId}`;
  if (students.length === 0) throw new Error("Santri tidak ditemukan");
  const student = students[0];

  const years = await sql`SELECT * FROM academic_years WHERE id = ${academicYearId}`;
  const academicYear = years[0];

  const placement = await sql`
    SELECT r.id as rombel_id, r.name as rombel_name, c.level as class_level, u.name as wali_kelas_name
    FROM student_rombels sr
    JOIN rombels r ON r.id = sr.rombel_id
    JOIN classes c ON c.id = r.class_id
    LEFT JOIN users u ON u.id = r.wali_kelas_id
    WHERE sr.student_id = ${studentId} AND sr.academic_year_id = ${academicYearId}
    LIMIT 1
  `;
  const place = placement[0] ?? null;

  const subjectScores = await sql`
    SELECT ss.*, s.name as subject_name, s.sort_order
    FROM subject_scores ss
    JOIN subjects s ON s.id = ss.subject_id
    WHERE ss.student_id = ${studentId} AND ss.academic_year_id = ${academicYearId}
    ORDER BY s.sort_order, s.name
  `;

  const speechScores = await sql`
    SELECT * FROM speech_scores
    WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId}
    ORDER BY language
  `;
  const computerScore = await sql`
    SELECT * FROM computer_scores WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId} LIMIT 1
  `;
  const discussionScore = await sql`
    SELECT * FROM discussion_scores WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId} LIMIT 1
  `;
  const attendance = await sql`
    SELECT * FROM attendance WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId} LIMIT 1
  `;

  let ranking = null;
  if (place) {
    const rankRows = await sql`
      SELECT RANK() OVER (PARTITION BY r.id ORDER BY AVG(ss.final_score) DESC) as rank_rombel,
             RANK() OVER (PARTITION BY c.level ORDER BY AVG(ss.final_score) DESC) as rank_kelas,
             COUNT(*) OVER (PARTITION BY r.id) as total_rombel,
             COUNT(*) OVER (PARTITION BY c.level) as total_kelas,
             sr2.student_id
      FROM student_rombels sr2
      JOIN rombels r ON r.id = sr2.rombel_id
      JOIN classes c ON c.id = r.class_id
      LEFT JOIN subject_scores ss ON ss.student_id = sr2.student_id AND ss.academic_year_id = ${academicYearId}
      WHERE sr2.academic_year_id = ${academicYearId} AND r.id = ${place.rombel_id}
      GROUP BY sr2.student_id, r.id, c.level
    `;
    ranking = rankRows.find((r) => r.student_id === studentId) ?? null;
  }

  res.json({
    student,
    academicYear,
    placement: place,
    subjectScores,
    speechScores,
    computerScore: computerScore[0] ?? null,
    discussionScore: discussionScore[0] ?? null,
    attendance: attendance[0] ?? null,
    ranking,
  });
}));

app.post("/api/reports/students", handleRoute(async (req, res) => {
  const { token, academicYearId, rombelId, classLevel } = req.body;
  verifyToken(token);
  const rows = await sql`
    SELECT s.id, s.full_name, s.stambuk, r.name as rombel_name, c.level as class_level
    FROM students s
    JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${academicYearId}
    JOIN rombels r ON r.id = sr.rombel_id
    JOIN classes c ON c.id = r.class_id
    WHERE (${rombelId || null}::uuid IS NULL OR r.id = ${rombelId || null})
      AND (${classLevel || null}::int IS NULL OR c.level = ${classLevel || null})
    ORDER BY c.level, r.name, s.full_name
  `;
  res.json(rows);
}));

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok", time: new Date() }));

// Start API server
app.listen(PORT, () => {
  console.log(`🚀 SIRA API Backend running on http://localhost:${PORT}`);
});
