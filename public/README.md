# ☕ Vigilance Coffee - POS & Cafe Management System

Vigilance Coffee adalah purwarupa (prototype) aplikasi *Point of Sale* (POS) modern berbasis web yang dirancang khusus untuk operasional kafe. Sistem ini mengintegrasikan portal pemesanan mandiri untuk pelanggan dan *dashboard* analitik lengkap untuk admin/kasir, dilengkapi dengan simulasi pemantauan lingkungan kafe via sensor IoT.

Saat ini, aplikasi berjalan sepenuhnya di sisi klien (*Client-Side*) menggunakan `localStorage` browser sebagai pengganti sementara *database server* (Node.js/API), sehingga semua fitur bisa dites secara *real-time* tanpa perlu menjalankan *backend*.

---

## ✨ Fitur Utama

### 🛒 Portal Pelanggan
*   **Pilihan Metode Pesanan:** Mendukung opsi *Dine-In* (Makan di Tempat) dan *Take Away* (Bawa Pulang).
*   **Sinkronisasi Meja Cerdas:** Pelanggan dapat memilih nomor meja. Meja yang sedang digunakan akan terkunci dan berwarna merah (*Real-time* sinkron dengan data Admin).
*   **Katalog Menu Dinamis:** Menampilkan menu yang ditarik langsung dari sistem Admin berdasarkan kategori (Brew & Bites).
*   **Keranjang Belanja Interaktif:** Pelanggan dapat menambah menu, mengurangi kuantitas (+/-), dan melihat *subtotal* secara langsung.
*   **Checkout & Pembayaran:** Mendukung pemilihan metode pembayaran (Cash/QRIS) dan penyimpanan data pesanan secara lokal.

### 🛡️ Dashboard Admin
*   **Ringkasan Analitik (Dashboard):** Memantau Omzet Hari Ini, Jumlah Meja Terisi, Orderan Baru, dan Status Sensor IoT secara *real-time*.
*   **Grafik Penjualan:** Visualisasi data porsi terjual berdasarkan kategori menu menggunakan **Chart.js**.
*   **Manajemen Orderan:** Menerima pesanan masuk dari pelanggan dan memprosesnya menggunakan tombol "Tandai Selesai".
*   **Simulasi Sensor IoT:** Memantau Suhu (°C) dan Kebisingan (dB) kafe dengan indikator warna dinamis (Hijau = Aman, Kuning = Waspada, Merah = Kritis) yang di- *update* setiap 3 detik.
*   **Manajemen Menu (CRUD):** 
    *   **Create:** Tambah menu baru.
    *   **Read:** Lihat daftar menu aktif.
    *   **Update:** Edit harga, nama, kategori, atau ubah ketersediaan (Tersedia/Habis).
    *   **Delete:** Hapus menu dari katalog.
    *   *Perubahan menu akan langsung diterapkan di layar Pelanggan.*

---

## 💻 Teknologi yang Digunakan

*   **HTML5 & CSS3:** Tata letak modern, animasi *fade-in*, dan desain responsif.
*   **JavaScript (Vanilla):** Logika antarmuka, *state management*, dan DOM Manipulation.
*   **Chart.js:** Pembuatan grafik batang untuk analitik penjualan.
*   **Web Storage API (`localStorage`):** Penyimpanan data pesanan dan katalog menu sementara (*Fallback Database*).

---

## 🚀 Cara Menjalankan Proyek (Lokal)

Karena sistem *backend* telah dialihkan menggunakan penyimpanan lokal browser, Anda tidak perlu menginstal server khusus untuk mencoba fiturnya.

1.  *Clone* atau unduh *repository* ini ke komputer Anda.
2.  Pastikan Anda memiliki file `index.html` dan `style.css` dalam satu folder yang sama.
3.  Klik kanan pada file `index.html` dan pilih **"Open with"** -> pilih browser web Anda (Chrome, Edge, Firefox, Safari, dll).
4.  **Selesai!** Aplikasi sudah bisa digunakan. 

*(Tips: Buka dua tab browser secara bersamaan, satu untuk Portal Pelanggan dan satu untuk Dashboard Admin, untuk melihat bagaimana data tersinkronisasi secara real-time).*

---

## 📂 Struktur Direktori

```text
vigilance-coffee/
│
├── index.html     # Halaman utama (berisi UI Pelanggan, Admin, dan Script JS)
├── style.css      # File stylesheet untuk desain dan layout
└── README.md      # Dokumentasi proyek ini