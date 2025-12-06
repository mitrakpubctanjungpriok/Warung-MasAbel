# 🚨 Sistem Laporan Pelanggaran

Sistem pelaporan pelanggaran yang terintegrasi dengan Google Sheets, dengan navigasi yang mudah antara Form Laporan dan Dashboard Admin.

## 🎯 Konsep Sistem

**1 Website dengan 2 Halaman:**

```
🌐 Website: laporan-pelanggaran.pages.dev
│
├── 📝 index.html (Form Laporan)
│   └── Akses: PUBLIC - Semua orang bisa akses
│
└── 🔒 dashboard.html (Dashboard Admin)
    └── Akses: PROTECTED - Perlu password admin
```

**Navigasi:**
- Di navbar ada 2 menu: **Form Laporan** dan **Dashboard Admin**
- Klik **Dashboard Admin** → diminta password
- Setelah login → bisa lihat semua laporan
- Klik **Form Laporan** → kembali ke form (tidak perlu login)

## 📋 Fitur

- ✅ Form laporan pelanggaran dengan validasi
- ✅ Integrasi dengan Google Sheets
- ✅ **Dashboard protected dengan password** 🔒
- ✅ Dashboard real-time untuk monitoring
- ✅ Export data (CSV, Excel)
- ✅ Search & Filter
- ✅ Responsive design (mobile-friendly)
- ✅ Auto-refresh data
- ✅ Session management (24 jam)
- ✅ Logout otomatis setelah 24 jam

## 🗂️ Struktur File

```
laporan-pelanggaran/
├── index.html          # Form Laporan (Homepage)
├── dashboard.html      # Dashboard Admin (Protected)
└── README.md          # Dokumentasi
```

**Kedua file punya navbar yang sama untuk navigasi mudah!**

---

## 🚀 PANDUAN SETUP LENGKAP (Via Browser Saja)

### BAGIAN 1: Setup Google Sheets & Apps Script

#### Langkah 1: Buat Google Sheets

1. Buka https://sheets.google.com
2. Klik **Blank** untuk buat sheet baru
3. Beri nama: `Sistem Laporan Pelanggaran`

#### Langkah 2: Buat 3 Sheet/Tab

Buat 3 sheet dengan nama persis seperti ini:

1. **Daftar_Petugas** - Untuk menyimpan daftar nama petugas
2. **Data_Pengajuan** - Untuk sistem tukar piket (jika ada)
3. **Laporan_Pelanggaran** - Akan dibuat otomatis oleh script

#### Langkah 3: Isi Sheet "Daftar_Petugas"

Di sheet **Daftar_Petugas**, buat tabel seperti ini:

| Nama Petugas |
|--------------|
| Budi Santoso |
| Ahmad Yani   |
| Siti Nurhaliza |
| Andi Wijaya  |
| (tambahkan nama lainnya) |

**Penting:** Nama harus di kolom A, mulai dari A1 (header) dan A2 dst (data)

#### Langkah 4: Setup Google Apps Script

1. Di Google Sheets, klik menu **Extensions** → **Apps Script**
2. Hapus semua code yang ada (code default `function myFunction()`)
3. Copy SEMUA code dari artifact **"Google Apps Script - Gabungan"** yang saya buat
4. Paste ke Apps Script editor
5. Klik **Save** (ikon disket atau Ctrl+S)
6. Beri nama project: `Sistem Laporan`

#### Langkah 5: Deploy Web App

1. Klik **Deploy** → **New deployment**
2. Klik ⚙️ (icon settings) di sebelah "Select type"
3. Pilih **Web app**
4. Isi seperti ini:
   - **Description**: `Sistem Laporan Pelanggaran v1`
   - **Execute as**: `Me (email Anda)`
   - **Who has access**: `Anyone` ⚠️ **PENTING!**
5. Klik **Deploy**
6. Klik **Authorize access**
7. Pilih akun Google Anda
8. Klik **Advanced** → **Go to [Project Name] (unsafe)**
9. Klik **Allow**
10. **COPY URL Web App** yang muncul (sangat penting!)
    - Contoh: `https://script.google.com/macros/s/AKfycbx.../exec`

---

### BAGIAN 2: Setup GitHub Repository (Via Browser)

#### Langkah 1: Buat GitHub Account

1. Buka https://github.com
2. Klik **Sign up** (jika belum punya account)
3. Atau **Sign in** (jika sudah punya)

#### Langkah 2: Buat Repository Baru

1. Klik tombol **+** di kanan atas → **New repository**
2. Isi form:
   - **Repository name**: `laporan-pelanggaran`
   - **Description**: `Sistem Laporan Pelanggaran`
   - **Public** (centang ini)
   - ✅ **Add a README file** (centang ini)
3. Klik **Create repository**

#### Langkah 3: Upload File index.html

1. Di halaman repository, klik **Add file** → **Create new file**
2. Nama file: `index.html`
3. Copy SEMUA code dari artifact **"Form Laporan Pelanggaran (Terintegrasi)"**
4. Paste ke editor GitHub
5. **PENTING:** Cari baris ini:
   ```javascript
   const SCRIPT_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA';
   ```
6. Ganti dengan URL yang Anda copy dari Apps Script (Bagian 1, Langkah 5)
7. Scroll ke bawah, klik **Commit new file**

#### Langkah 4: Upload File dashboard.html

1. Klik **Add file** → **Create new file**
2. Nama file: `dashboard.html`
3. Copy SEMUA code dari artifact **"Dashboard Laporan Pelanggaran (Protected)"**
4. Paste ke editor GitHub
5. **PENTING:** Ada 2 hal yang harus diganti:

   **A. Ganti SCRIPT_URL:**
   ```javascript
   const SCRIPT_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA';
   ```
   Ganti dengan URL yang sama dari Apps Script

   **B. Ganti Password (WAJIB!):**
   ```javascript
   const ADMIN_PASSWORD = 'admin123';
   ```
   Ganti `admin123` dengan password yang **KUAT** dan **RAHASIA**!
   
   **Contoh password yang bagus:**
   - `Admin@2024Secure!`
   - `LaporanPelanggaran#2024`
   - `Mitrakp@Admin123!`
   
   ⚠️ **JANGAN gunakan password lemah seperti:**
   - `123456`
   - `password`
   - `admin`
   
6. Scroll ke bawah, klik **Commit new file**

#### Langkah 5: Update README.md

1. Klik file **README.md** yang sudah ada
2. Klik icon pensil (Edit)
3. Copy isi dari artifact **"README - Panduan Setup Complete"** ini
4. Paste (replace semua isi)
5. Klik **Commit changes**

---

### BAGIAN 3: Deploy ke Cloudflare Pages

#### Langkah 1: Buat Cloudflare Account

1. Buka https://dash.cloudflare.com/sign-up
2. Daftar dengan email Anda
3. Verifikasi email
4. Login ke dashboard

#### Langkah 2: Buat Cloudflare Pages

1. Di dashboard Cloudflare, klik **Workers & Pages** di sidebar kiri
2. Klik tab **Pages**
3. Klik **Create application**
4. Pilih **Connect to Git**

#### Langkah 3: Connect GitHub

1. Klik **Connect GitHub**
2. Login ke GitHub (jika diminta)
3. Klik **Install & Authorize** untuk Cloudflare
4. Pilih repository `laporan-pelanggaran`
5. Klik **Install**

#### Langkah 4: Configure Build

1. **Project name**: `laporan-pelanggaran` (atau nama lain yang Anda mau)
2. **Production branch**: `main`
3. **Build settings**: Kosongkan semua (tidak perlu build command)
4. Klik **Save and Deploy**

#### Langkah 5: Tunggu Deploy Selesai

1. Tunggu 1-2 menit
2. Setelah selesai, akan muncul **URL website Anda**
3. Contoh: `https://laporan-pelanggaran.pages.dev`
4. **COPY URL INI!**

---

### BAGIAN 4: Testing

#### Test 1: Cek Dashboard Login

1. Buka: `https://[URL-ANDA].pages.dev/dashboard.html`
2. Harus muncul halaman login dengan icon gembok 🔒
3. Masukkan password yang Anda set di code
4. Klik **Login**
5. Jika password benar → masuk ke dashboard
6. Jika password salah → muncul error "Password salah!"

#### Test 2: Cek Form Laporan

1. Buka: `https://[URL-ANDA].pages.dev/index.html`
2. Dropdown "Nama Pengadu" harus terisi dengan nama dari sheet
3. Dropdown "Nama Pelanggar" juga harus terisi
4. Jika tidak muncul, cek:
   - Apakah SCRIPT_URL sudah diganti?
   - Apakah sheet "Daftar_Petugas" sudah terisi?
   - Apakah Apps Script sudah di-deploy?

#### Test 3: Submit Laporan

1. Isi form lengkap:
   - Pilih nama pengadu
   - Pilih nama pelanggar (harus berbeda!)
   - Isi area: `Lantai 2`
   - Isi laporan: `Test laporan pelanggaran`
2. Klik **Kirim Laporan**
3. Harus muncul pesan sukses
4. Buka Google Sheets → cek sheet "Laporan_Pelanggaran"
5. Data harus masuk!

#### Test 4: Cek Dashboard Setelah Ada Data

1. Login ke dashboard dengan password
2. Refresh dashboard (tombol 🔄)
3. Data test harus muncul di tabel
4. Counter "Total Laporan" harus bertambah
5. Test tombol Logout - harus kembali ke halaman login
6. Coba login lagi - password harus berfungsi

---

## 🎯 URL Penting

Setelah setup, Anda cukup share **1 URL saja**:

```
🌐 Website: https://laporan-pelanggaran.pages.dev
```

### Untuk Semua Petugas:
```
Share URL: https://laporan-pelanggaran.pages.dev/index.html
atau: https://laporan-pelanggaran.pages.dev/

Pesan:
"Silakan buka link ini untuk membuat laporan pelanggaran.
Klik menu 'Form Laporan' untuk isi form."
```

### Untuk Admin Saja:
```
Share URL: https://laporan-pelanggaran.pages.dev/dashboard.html
Password: [share via telpon/bertemu langsung]

Pesan:
"Untuk monitoring laporan, buka link ini dan klik 'Dashboard Admin'.
Login dengan password yang sudah saya berikan.
JANGAN share password ke orang lain!"
```

**Atau bisa share 1 URL untuk semua:**
```
https://laporan-pelanggaran.pages.dev/

- Petugas: Klik "Form Laporan"
- Admin: Klik "Dashboard Admin" (perlu password)
```

---

## 🔧 Troubleshooting

### Problem: Dropdown nama tidak muncul

**Solusi:**
- Pastikan sheet "Daftar_Petugas" ada dan terisi
- Pastikan SCRIPT_URL sudah diganti dengan benar
- Buka console browser (F12) untuk lihat error
- Test function `testGetNames()` di Apps Script

### Problem: Data tidak masuk ke Google Sheets

**Solusi:**
- Pastikan Apps Script sudah di-deploy dengan "Who has access: Anyone"
- Pastikan SCRIPT_URL benar (harus ada `/exec` di akhir)
- Cek Execution log di Apps Script (View → Executions)

### Problem: Lupa password dashboard

**Solusi:**
- Buka repository GitHub
- Edit file `dashboard.html`
- Cari baris: `const ADMIN_PASSWORD = '...';`
- Ganti dengan password baru
- Commit changes
- Tunggu Cloudflare deploy ulang (1-2 menit)
- Login dengan password baru

### Problem: Dashboard tidak minta password

**Solusi:**
- Clear browser cache (Ctrl+Shift+Delete)
- Atau buka dalam Incognito/Private mode
- Atau logout manual: tambahkan `?logout=true` di URL
  - Contoh: `dashboard.html?logout=true`

### Problem: Error "Script URL not found"

**Solusi:**
- URL Apps Script harus yang dari **deployment**, bukan dari editor
- Format: `https://script.google.com/macros/s/AKfycbx.../exec`
- BUKAN: `https://script.google.com/home/projects/...`

---

## 📱 Fitur Dashboard

### 1. Statistik Real-time
- Total Laporan
- Total Pengadu Unik

### 2. Search & Filter
- Cari berdasarkan nama, area, atau isi laporan
- Real-time filtering

### 3. Export Data
- Export to CSV
- Export to Excel
- Print

### 4. Auto Refresh
- Data di-refresh otomatis setiap 5 menit
- Atau klik tombol Refresh manual

---

## 🔐 Keamanan

### Dashboard Protection
- ✅ Protected dengan password
- ✅ Session management (login bertahan 24 jam)
- ✅ Auto-logout setelah 24 jam
- ✅ Password disimpan di code (client-side)
- ✅ Tombol logout manual

### Catatan Keamanan:
- **Password disimpan di client-side** (dalam file HTML)
- Orang teknis bisa lihat password di source code
- Ini cocok untuk **internal use** (bukan public)
- Untuk security lebih tinggi, gunakan backend server

### Tips Keamanan:
1. **Ganti password secara berkala**
2. **Jangan share URL dashboard sembarangan**
3. **Gunakan password yang kuat**
4. **Logout setelah selesai menggunakan**
5. **Jangan screenshoot password**

### Level Keamanan:
- 🟢 **Form Laporan**: Public access (semua petugas)
- 🟡 **Dashboard**: Password protected (admin only)
- 🔴 **Google Sheets**: Owner only (Anda saja)

---

## 📧 Email Notification (Optional)

Jika ingin dapat email setiap ada laporan baru:

1. Buka Apps Script
2. Cari function `sendLaporanEmailNotification`
3. Hapus `/*` dan `*/` (uncomment)
4. Ganti email: `mitrakpubctanjungpriok@gmail.com` dengan email Anda
5. Di function `handleLaporanPelanggaran`, uncomment baris:
   ```javascript
   // sendLaporanEmailNotification(data);
   ```
6. Save dan deploy ulang (New version)

---

## 🆕 Update Code (Jika Ada Perubahan)

### Update Password Dashboard:

1. Buka repository di GitHub
2. Klik file `dashboard.html`
3. Klik icon pensil (Edit)
4. Cari baris:
   ```javascript
   const ADMIN_PASSWORD = 'password_lama';
   ```
5. Ganti dengan password baru
6. Scroll ke bawah → **Commit changes**
7. Cloudflare otomatis deploy ulang (tunggu 1-2 menit)
8. Password baru langsung aktif!

### Update URL atau Code Lain:

1. Buka repository di GitHub
2. Klik file yang mau di-edit (misal: `index.html`)
3. Klik icon pensil (Edit)
4. Edit code
5. Scroll ke bawah → **Commit changes**
6. Cloudflare otomatis deploy ulang (tunggu 1-2 menit)

---

## 💡 Tips

1. **Bookmark URL Dashboard** untuk akses cepat
2. **Share URL Form** lewat WhatsApp/Email ke petugas
3. **Check dashboard** secara berkala untuk monitoring
4. **Export data** secara berkala untuk backup
5. **Tambah nama petugas** di sheet "Daftar_Petugas" kapan saja

---

## 📞 Support

Jika ada masalah:
1. Cek console browser (F12 → Console tab)
2. Cek Execution log di Apps Script
3. Pastikan semua langkah setup sudah diikuti dengan benar

---

## 📝 Changelog

### Version 1.0
- ✅ Form laporan pelanggaran
- ✅ Dashboard monitoring
- ✅ Integrasi Google Sheets
- ✅ Export CSV/Excel
- ✅ Search & Filter
- ✅ Mobile responsive

---

**Dibuat dengan ❤️ untuk kemudahan pelaporan pelanggaran**
