# 📋 Sistem Laporan Pelanggaran

Sistem pelaporan pelanggaran internal berbasis web dengan dashboard admin untuk melihat laporan, terhubung dengan Google Sheets.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=flat&logo=google-sheets&logoColor=white)

---

## ✨ Fitur

### 👥 Form Laporan (Public)
| Fitur | Status |
|-------|--------|
| Dropdown Nama Pelapor (dari Daftar_Petugas) | ✅ |
| Dropdown Nama Pelanggar (dari Daftar_Petugas) | ✅ |
| Validasi input (pelapor ≠ pelanggar) | ✅ |
| Input Area/Lantai dengan contoh | ✅ |
| Textarea Detail Pelanggaran | ✅ |
| Timestamp otomatis (Zona Jakarta) | ✅ |
| Notifikasi sukses/error | ✅ |
| **Connection Popup** (auto-hide saat terhubung) | ✅ |
| Design modern & responsive | ✅ |

### 🔐 Dashboard Admin (Protected)
| Fitur | Status |
|-------|--------|
| Password protection | ✅ |
| Total laporan | ✅ |
| Daftar semua laporan | ✅ |
| Search laporan | ✅ |
| Detail modal | ✅ |
| Responsive design | ✅ |

---

## 🔌 Connection Popup

Website memiliki popup status koneksi yang:
- 🟡 **Loading** - "Menghubungkan ke Google Sheet..." (kuning)
- 🟢 **Success** - "Terhubung ke Google Sheet" (hijau) → **otomatis hilang setelah 2 detik**
- 🔴 **Error** - "Gagal terhubung ke Google Sheet" (merah) → **tetap tampil**

---

## 📱 Responsive Design

| Mode | Layar | Tampilan |
|------|-------|----------|
| 📱 Mobile | < 768px | Single column, full-width, card-based |
| 📱 Tablet | 768px - 1023px | Centered container, single column |
| 💻 Laptop | 1024px - 1279px | Two-column form, card dengan shadow, background gradient |
| 🖥️ Desktop | ≥ 1280px | Larger spacing, premium look |

### Perbedaan Mode:

#### 📱 Mode Mobile
- Form full-width tanpa margin
- Single column layout
- Header rounded bottom
- Connection popup full-width di atas
- Toast notification full-width di bawah

#### 💻 Mode Laptop/Desktop
- Container centered dengan max-width
- Background gradient biru muda full screen
- Card putih dengan shadow elegan
- Form 2 kolom (Nama Pelapor | Nama Pelanggar)
- Connection popup floating di tengah atas dengan rounded corners
- Spacing lebih lega dan premium

---

## 📊 Struktur Google Sheets

```
Google Sheets (1 File)
├── 📋 Sheet: Daftar_Petugas      ← Daftar nama karyawan
├── 📋 Sheet: Data_Pengajuan      ← Data Tukar Piket (sistem lama)
└── 📋 Sheet: Laporan_Pelanggaran ← Data Laporan Pelanggaran
```

### Sheet: Daftar_Petugas
| A |
|---|
| Nama Karyawan 1 |
| Nama Karyawan 2 |
| ... |

### Sheet: Laporan_Pelanggaran
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Nama Pengadu | Nama Pelanggar | Area/Lantai | Laporan/Keluhan | **Foto** |

> ⚠️ **Kolom F (Foto)** berisi data base64 image yang di-compress otomatis

---

## 🔐 Akses Admin

1. Klik tombol **Admin** di pojok kanan atas
2. Masukkan password: **`admin123`**
3. Lihat semua laporan di dashboard

### Ganti Password Admin
Edit file `index.html`, cari baris:
```javascript
const ADMIN_PASSWORD = 'admin123';
```

---

# 🚀 PANDUAN SETUP LENGKAP (100% Browser)

## 📋 BAGIAN 1: Setup Google Sheets

### Langkah 1: Buat/Buka Google Sheet
Pastikan memiliki sheet dengan nama:
- **Daftar_Petugas** (kolom A berisi daftar nama)
- **Laporan_Pelanggaran** (akan dibuat otomatis jika belum ada)

### Langkah 2: Google Apps Script
Script Anda sudah siap! Tidak perlu perubahan apapun.

---

## 📂 BAGIAN 2: Upload ke GitHub

### Langkah 1: Buka GitHub
1. Buka **[github.com](https://github.com)**
2. Login ke akun Anda

### Langkah 2: Buka Repository
```
https://github.com/mitrakpubctanjungpriok/Laporan-Pelanggaran
```

### Langkah 3: Update index.html
1. Klik file `index.html`
2. Klik ikon **pensil** ✏️ (Edit this file)
3. **Hapus semua** kode lama
4. **Paste** kode baru dari file index.html
5. Scroll ke bawah
6. Klik **Commit changes**

### Langkah 4: Update README.md
1. Klik file `README.md`
2. Klik ikon **pensil** ✏️
3. **Hapus semua** isi lama
4. **Paste** isi README baru
5. Klik **Commit changes**

---

## ☁️ BAGIAN 3: Deploy ke Cloudflare Pages

### Langkah 1: Buka Cloudflare
1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)**
2. Login atau buat akun baru

### Langkah 2: Buat Project Pages
1. Klik **Workers & Pages** di sidebar kiri
2. Klik tab **Pages**
3. Klik **Connect to Git**

### Langkah 3: Connect GitHub
1. Klik **Connect GitHub**
2. Login ke GitHub jika diminta
3. Klik **Authorize Cloudflare**
4. Pilih repository **Laporan-Pelanggaran**
5. Klik **Install & Authorize**

### Langkah 4: Configure Build
1. Isi pengaturan:

| Setting | Value |
|---------|-------|
| Project name | `laporan-pelanggaran` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | *(kosongkan)* |
| Build output directory | `/` |

2. Klik **Save and Deploy**

### Langkah 5: Tunggu Deploy
1. Tunggu 1-2 menit
2. Status berubah menjadi ✅ **Success**
3. Klik link yang diberikan

---

## 🎉 Website Live!

Website Anda akan tersedia di:
```
https://laporan-pelanggaran.pages.dev
```

---

## 🔄 Cara Update Website

Setiap kali Anda edit file di GitHub:
1. Cloudflare akan **otomatis deploy ulang**
2. Tunggu 1-2 menit
3. Website terupdate!

---

## 📸 Screenshot

### 📱 Form Laporan (Mobile)
```
┌─────────────────────────┐
│              [Admin] 🔧 │
│  📋 Laporan Pelanggaran │
│  Sistem Pelaporan...    │
├─────────────────────────┤
│ ● Terhubung ke database │
│                         │
│ Nama Pelapor            │
│ ┌─────────────────────┐ │
│ │ -- Pilih Nama --  ▼ │ │
│ └─────────────────────┘ │
│                         │
│ Nama Pelanggar          │
│ ┌─────────────────────┐ │
│ │ -- Pilih Nama --  ▼ │ │
│ └─────────────────────┘ │
│                         │
│ Area / Lantai           │
│ ┌─────────────────────┐ │
│ │ Contoh: Ground...   │ │
│ └─────────────────────┘ │
│                         │
│ Detail Pelanggaran      │
│ ┌─────────────────────┐ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │  🚀 Kirim Laporan   │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### 💻 Dashboard Admin
```
┌──────────────────────────────────────────┐
│  📊 Dashboard Admin          [Logout]    │
│  Lihat semua laporan pelanggaran         │
├──────────────────────────────────────────┤
│         📋 25 Total Laporan              │
├──────────────────────────────────────────┤
│  🔍 [Cari nama atau detail...]           │
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │ 📅 01/01/2024              #25      │ │
│ │ Budi → Ahmad                         │ │
│ │ 📍 Ground, area Lorong              │ │
│ │ Tidak memakai APD saat bekerja...   │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ 📅 31/12/2023              #24      │ │
│ │ Citra → Diana                        │ │
│ │ 📍 Lantai 2                          │ │
│ │ Terlambat masuk kerja...            │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Dropdown tidak muncul | Pastikan sheet `Daftar_Petugas` ada dan berisi data di kolom A |
| Laporan tidak terkirim | Pastikan Apps Script sudah di-deploy dengan akses "Anyone" |
| Admin tidak bisa login | Cek password di kode, default: `admin123` |
| Website tidak update | Tunggu 1-2 menit setelah commit di GitHub |

---

## 📋 Checklist Deploy

- [ ] Google Sheet sudah ada sheet `Daftar_Petugas`
- [ ] Google Sheet sudah ada/terbuat sheet `Laporan_Pelanggaran`
- [ ] Apps Script sudah di-deploy
- [ ] File `index.html` sudah di-upload ke GitHub
- [ ] File `README.md` sudah di-upload ke GitHub
- [ ] Cloudflare Pages sudah terhubung ke GitHub
- [ ] Website sudah bisa diakses
- [ ] Test kirim laporan ✓
- [ ] Test login admin ✓
- [ ] Test lihat detail laporan ✓

---

## 📝 Lisensi

MIT License - Bebas digunakan dan dimodifikasi.

---

<p align="center">
  Made with ❤️ for better discipline management
</p>
