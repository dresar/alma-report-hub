import * as XLSX from "xlsx";

export async function exportNilaiToExcel(data: any, classLevel: number, isTemplate: boolean = false) {
  const wb = XLSX.utils.book_new();

  const getScore = (scores: any[], matchFn: (s: any) => boolean, key: string) => {
    if (isTemplate) return "";
    const s = scores.find(matchFn);
    return s && s[key] != null ? s[key] : "";
  };

  // 1. Akademik
  const akRows: any[] = [];
  for (const student of data.students) {
    data.subjects.forEach((subj: any, index: number) => {
      akRows.push({
        "Student ID": student.stambuk,
        "Nama Santri": student.full_name,
        "Subject ID": index + 1,
        "Mata Pelajaran": subj.name,
        "Tugas": getScore(data.akademik, s => s.student_id === student.id && s.subject_id === subj.id, "tugas"),
        "Ujian": getScore(data.akademik, s => s.student_id === student.id && s.subject_id === subj.id, "uts"),
      });
    });
  }
  const wsAk = XLSX.utils.json_to_sheet(akRows);
  XLSX.utils.book_append_sheet(wb, wsAk, "Akademik");

  // 2. Pidato
  const pidRows: any[] = [];
  const LANGUAGES = ["Indonesia", "Arab", "Inggris"];
  for (const student of data.students) {
    for (const lang of LANGUAGES) {
      pidRows.push({
        "Student ID": student.stambuk,
        "Nama Santri": student.full_name,
        "Bahasa": lang,
        "Penguasaan": getScore(data.pidato, s => s.student_id === student.id && s.language === lang, "penguasaan"),
        "Kelancaran": getScore(data.pidato, s => s.student_id === student.id && s.language === lang, "kelancaran"),
        "Intonasi": getScore(data.pidato, s => s.student_id === student.id && s.language === lang, "intonasi"),
        "Kepercayaan": getScore(data.pidato, s => s.student_id === student.id && s.language === lang, "kepercayaan"),
        "Penampilan": getScore(data.pidato, s => s.student_id === student.id && s.language === lang, "penampilan"),
      });
    }
  }
  const wsPid = XLSX.utils.json_to_sheet(pidRows);
  XLSX.utils.book_append_sheet(wb, wsPid, "Pidato");

  // 3. Komputer
  if (classLevel >= 4) {
    const compRows = data.students.map((student: any) => ({
      "Student ID": student.stambuk,
      "Nama Santri": student.full_name,
      "Pengoperasian": getScore(data.komputer, s => s.student_id === student.id, "pengoperasian"),
      "MsWord": getScore(data.komputer, s => s.student_id === student.id, "ms_word"),
      "MsExcel": getScore(data.komputer, s => s.student_id === student.id, "ms_excel"),
      "Internet": getScore(data.komputer, s => s.student_id === student.id, "internet"),
      "Presentasi": getScore(data.komputer, s => s.student_id === student.id, "presentasi"),
    }));
    const wsComp = XLSX.utils.json_to_sheet(compRows);
    XLSX.utils.book_append_sheet(wb, wsComp, "Komputer");
  }

  // 4. Diskusi
  if (classLevel >= 5) {
    const discRows = data.students.map((student: any) => ({
      "Student ID": student.stambuk,
      "Nama Santri": student.full_name,
      "Keaktifan": getScore(data.diskusi, s => s.student_id === student.id, "keaktifan"),
      "Argumentasi": getScore(data.diskusi, s => s.student_id === student.id, "argumentasi"),
      "Kerjasama": getScore(data.diskusi, s => s.student_id === student.id, "kerjasama"),
      "Penguasaan": getScore(data.diskusi, s => s.student_id === student.id, "penguasaan"),
      "Etika": getScore(data.diskusi, s => s.student_id === student.id, "etika"),
    }));
    const wsDisc = XLSX.utils.json_to_sheet(discRows);
    XLSX.utils.book_append_sheet(wb, wsDisc, "Diskusi");
  }

  // 5. Kehadiran
  const attRows = data.students.map((student: any) => ({
    "Student ID": student.stambuk,
    "Nama Santri": student.full_name,
    "Hari Sekolah": getScore(data.kehadiran, s => s.student_id === student.id, "school_days"),
    "Hadir": getScore(data.kehadiran, s => s.student_id === student.id, "present"),
    "Izin": getScore(data.kehadiran, s => s.student_id === student.id, "permission"),
    "Alpha": getScore(data.kehadiran, s => s.student_id === student.id, "absent"),
  }));
  const wsAtt = XLSX.utils.json_to_sheet(attRows);
  XLSX.utils.book_append_sheet(wb, wsAtt, "Kehadiran");

  const fileName = isTemplate ? `Template_Nilai_Kelas_${classLevel}.xlsx` : `Export_Nilai_Kelas_${classLevel}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

export async function importNilaiFromExcel(file: File, classLevel: number, students: any[], subjects: any[]) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const wb = XLSX.read(data, { type: "binary" });

        const parseSheet = (sheetName: string) => {
          const ws = wb.Sheets[sheetName];
          return ws ? XLSX.utils.sheet_to_json<any>(ws) : [];
        };

        const numOrNull = (val: any) => (val !== "" && val != null && !isNaN(Number(val)) ? Number(val) : null);

        // Build student map stambuk -> student_id (UUID)
        const studentMap = new Map<string, string>();
        students.forEach((s) => {
          if (s.stambuk) {
            studentMap.set(String(s.stambuk).trim(), s.id);
          }
        });

        // Parse Akademik
        const akRaw = parseSheet("Akademik");
        const akademik = akRaw
          .filter(r => r["Student ID"] && r["Subject ID"])
          .map(r => {
            const stambukStr = String(r["Student ID"]).trim();
            const studentId = studentMap.get(stambukStr);
            
            const subjectIdx = Number(r["Subject ID"]) - 1;
            const subjectId = subjects[subjectIdx]?.id;

            return {
              studentId,
              subjectId,
              tugas: numOrNull(r["Tugas"]),
              ujian: numOrNull(r["Ujian"]) ?? numOrNull(r["UTS"]),
            };
          })
          .filter(r => r.studentId && r.subjectId);

        // Parse Pidato
        const pidRaw = parseSheet("Pidato");
        const pidato = pidRaw
          .filter(r => r["Student ID"] && r["Bahasa"])
          .map(r => {
            const studentId = studentMap.get(String(r["Student ID"]).trim());
            return {
              studentId,
              language: r["Bahasa"],
              penguasaan: numOrNull(r["Penguasaan"]),
              kelancaran: numOrNull(r["Kelancaran"]),
              intonasi: numOrNull(r["Intonasi"]),
              kepercayaan: numOrNull(r["Kepercayaan"]),
              penampilan: numOrNull(r["Penampilan"]),
            };
          })
          .filter(r => r.studentId);

        // Parse Komputer
        const compRaw = parseSheet("Komputer");
        const komputer = compRaw
          .filter(r => r["Student ID"])
          .map(r => {
            const studentId = studentMap.get(String(r["Student ID"]).trim());
            return {
              studentId,
              pengoperasian: numOrNull(r["Pengoperasian"]),
              msWord: numOrNull(r["MsWord"]),
              msExcel: numOrNull(r["MsExcel"]),
              internet: numOrNull(r["Internet"]),
              presentasi: numOrNull(r["Presentasi"]),
            };
          })
          .filter(r => r.studentId);

        // Parse Diskusi
        const discRaw = parseSheet("Diskusi");
        const diskusi = discRaw
          .filter(r => r["Student ID"])
          .map(r => {
            const studentId = studentMap.get(String(r["Student ID"]).trim());
            return {
              studentId,
              keaktifan: numOrNull(r["Keaktifan"]),
              argumentasi: numOrNull(r["Argumentasi"]),
              kerjasama: numOrNull(r["Kerjasama"]),
              penguasaan: numOrNull(r["Penguasaan"]),
              etika: numOrNull(r["Etika"]),
            };
          })
          .filter(r => r.studentId);

        // Parse Kehadiran
        const attRaw = parseSheet("Kehadiran");
        const kehadiran = attRaw
          .filter(r => r["Student ID"])
          .map(r => {
            const studentId = studentMap.get(String(r["Student ID"]).trim());
            return {
              studentId,
              schoolDays: numOrNull(r["Hari Sekolah"]) || 0,
              present: numOrNull(r["Hadir"]) || 0,
              permission: numOrNull(r["Izin"]) || 0,
              absent: numOrNull(r["Alpha"]) || 0,
            };
          })
          .filter(r => r.studentId);

        resolve({ akademik, pidato, komputer, diskusi, kehadiran });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
}

