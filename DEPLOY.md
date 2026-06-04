# Panduan Deploy SIRA

## Deployment ke Vercel

### Frontend (TanStack Start / Vite)
1. Push repo ke GitHub
2. Buka https://vercel.com, hubungkan repo
3. Build command: `npm run build`
4. Output dir: `dist/`
5. Set environment variables:
   ```
   VITE_BACKEND_URL=https://your-backend.example.com
   ```

### Backend (sebagai Node.js server terpisah - Railway/Render/VPS)
1. Upload folder `backend/` ke Railway/Render/DigitalOcean
2. Set environment variables:
   ```
   DATABASE_URL=postgres://...
   JWT_SECRET=your-secret-key
   BACKEND_PORT=3001
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
3. Start command: `node app.js`

---

## Deployment ke cPanel (Shared Hosting)

### Yang perlu di-upload ke cPanel:
```
/public_html/api/       <- folder backend
  app.js                <- hasil build (npm run build:backend)
  package.json          <- hanya dependencies
  .env                  <- environment variables
```

### Langkah-langkah:
1. **Build backend** di komputer lokal:
   ```bash
   npm run build:backend
   ```
   Ini akan menghasilkan `backend/app.js` yang berisi semua kode backend

2. **Upload ke cPanel** via File Manager:
   - Upload `backend/app.js` ke `/home/username/nodeapp/`
   - Buat file `.env` berisi:
     ```
     DATABASE_URL=postgres://...
     JWT_SECRET=your-secret-key-here
     PORT=3001
     FRONTEND_URL=https://yoursite.com
     ```

3. **Setup Node.js app di cPanel**:
   - Pergi ke cPanel → Software → Setup Node.js App
   - Application root: `nodeapp`
   - Application startup file: `app.js`
   - Node.js version: 20.x
   - Klik "Create"

4. **Upload frontend** (hasil `npm run build`):
   - Upload isi folder `dist/` ke `/public_html/`

5. **Konfigurasi reverse proxy** di `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteRule ^api/(.*) http://localhost:3001/api/$1 [P,L]
   ```

---

## Environment Variables

### File `.env` (root project - untuk development & Vite):
```env
VITE_BACKEND_URL=http://localhost:3001
```

### File `.env` (backend/ - untuk server):
```env
DATABASE_URL=postgresql://username:password@host/dbname?sslmode=require
JWT_SECRET=your-super-secret-key-minimum-32-chars
BACKEND_PORT=3001
FRONTEND_URL=*
```

---

## Build Commands

| Command | Deskripsi |
|---|---|
| `npm run dev:all` | Start development (auto-kill port 8080 & 3001) |
| `npm run build` | Build frontend untuk production |
| `npm run build:backend` | Compile TypeScript backend → `backend/app.js` |

---

## Cara Update di Production

1. Ubah kode di lokal
2. Jalankan `npm run build:backend` → upload `backend/app.js` baru
3. Restart Node.js app di cPanel atau `git push` ke Vercel/Railway
