# ZIE Project — PWA Launcher

Launcher PWA untuk mengumpulkan alamat aplikasi PWA.

## Fitur
- Tambah, edit, hapus aplikasi
- Search dan kategori
- Favorite
- Data tersimpan di localStorage
- Installable PWA
- Offline shell via service worker
- Tema komik hitam-putih

## Jalankan
Upload semua file ke hosting HTTPS. PWA/service worker tidak bekerja penuh dari `file://`.
Untuk lokal, gunakan server sederhana, misalnya:
`python -m http.server 8080`

Buka `http://localhost:8080`.

## Catatan
Ganti data contoh `https://example.com` setelah pertama kali membuka aplikasi, atau hapus melalui menu edit.


## Icon
Icon PWA menggunakan `assets/icon.png` (512×512) yang kamu berikan.
