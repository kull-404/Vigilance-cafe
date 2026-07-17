const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// MOCK DATABASE
// ==========================================
let Meja = [
    { no_meja: 1, status_meja: false },
    { no_meja: 2, status_meja: false },
    { no_meja: 3, status_meja: false },
    { no_meja: 4, status_meja: false },
    { no_meja: 5, status_meja: false },
    { no_meja: 6, status_meja: false }
];

let Menu = [
    { id_menu: "M01", nama_menu: "Espresso", harga: 20000, kategori: "Brew", status_tersedia: true },
    { id_menu: "M02", nama_menu: "Cappuccino", harga: 32000, kategori: "Brew", status_tersedia: true },
    { id_menu: "M03", nama_menu: "Cold Brew", harga: 38000, kategori: "Brew", status_tersedia: true },
    { id_menu: "M04", nama_menu: "Croissant", harga: 25000, kategori: "Bites", status_tersedia: true }
];

let PesananDb = []; 

// ==========================================
// ROUTES PELANGGAN
// ==========================================
app.get('/api/meja', (req, res) => res.json(Meja));
app.get('/api/menu', (req, res) => res.json(Menu));

app.post('/api/pesanan', (req, res) => {
    const { tipe_pesanan, no_meja, keranjang } = req.body;
    let total_harga = 0;
    
    keranjang.forEach(item => total_harga += (item.harga * item.jumlah));

    const pesananBaru = {
        id_pesanan: "ORD-" + (2000 + PesananDb.length + 1),
        tanggal: new Date(),
        total_harga: total_harga,
        tipe_pesanan: tipe_pesanan,
        no_meja: no_meja || null,
        status_pesanan: "Baru", 
        detail: keranjang
    };

    PesananDb.push(pesananBaru);
    
    if (no_meja) {
        let mejaIdx = Meja.findIndex(m => m.no_meja == no_meja);
        if(mejaIdx !== -1) Meja[mejaIdx].status_meja = true;
    }

    res.json({ message: "Pesanan berhasil disimpan", data: pesananBaru });
});

// ==========================================
// ROUTES ADMIN
// ==========================================
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if(username === 'admin' && password === 'vigilance') res.json({ success: true });
    else res.status(401).json({ success: false });
});

app.get('/api/admin/pesanan', (req, res) => res.json(PesananDb));

app.put('/api/admin/pesanan/:id/status', (req, res) => {
    const pesanan = PesananDb.find(p => p.id_pesanan === req.params.id);
    if(pesanan) {
        pesanan.status_pesanan = req.body.status;
        if(req.body.status === 'Selesai' && pesanan.no_meja) {
            let mejaIdx = Meja.findIndex(m => m.no_meja == pesanan.no_meja);
            if(mejaIdx !== -1) Meja[mejaIdx].status_meja = false;
        }
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

// CRUD MENU
app.post('/api/admin/menu', (req, res) => {
    const { nama_menu, harga, kategori } = req.body;
    const newMenu = { id_menu: "M0" + (Menu.length + 1), nama_menu, harga: parseInt(harga), kategori, status_tersedia: true };
    Menu.push(newMenu);
    res.json({ success: true });
});

app.put('/api/admin/menu/:id', (req, res) => {
    const idx = Menu.findIndex(m => m.id_menu === req.params.id);
    if(idx !== -1) {
        Menu[idx] = { ...Menu[idx], ...req.body, harga: parseInt(req.body.harga), status_tersedia: (req.body.status_tersedia === 'true' || req.body.status_tersedia === true) };
        res.json({ success: true });
    } else res.status(404).json({ error: "Not found" });
});

app.delete('/api/admin/menu/:id', (req, res) => {
    Menu = Menu.filter(m => m.id_menu !== req.params.id);
    res.json({ success: true });
});

// DASHBOARD STATS
app.get('/api/admin/dashboard-stats', (req, res) => {
    const omzetHariIni = PesananDb.reduce((acc, p) => acc + p.total_harga, 0);
    const mejaTerisi = Meja.filter(m => m.status_meja === true).length;
    res.json({
        omzetHariIni,
        mejaTerisi: `${mejaTerisi}/${Meja.length}`,
        orderanBaru: PesananDb.filter(p => p.status_pesanan === 'Baru').length,
        sensorStatus: `4/4`,
        grafikOmzet: [1.2, 1.0, 1.4, 1.8, 2.1, 2.4, 2.0] 
    });
});

// IOT SENSOR SIMULATION (Data di-generate secara acak untuk simulasi real-time)
app.get('/api/admin/iot-sensors', (req, res) => {
    const sensors = [
        { id: 1, lokasi: 'Sudut Kiri Depan (Pintu Masuk)', suhu: (22 + Math.random() * 2).toFixed(1), kebisingan: Math.floor(45 + Math.random() * 15) },
        { id: 2, lokasi: 'Sudut Kanan Depan (Jendela)', suhu: (24 + Math.random() * 3).toFixed(1), kebisingan: Math.floor(50 + Math.random() * 20) },
        { id: 3, lokasi: 'Sudut Kiri Belakang (Toilet)', suhu: (23 + Math.random() * 1.5).toFixed(1), kebisingan: Math.floor(40 + Math.random() * 10) },
        { id: 4, lokasi: 'Sudut Kanan Belakang (Bar/Mesin)', suhu: (26 + Math.random() * 3).toFixed(1), kebisingan: Math.floor(65 + Math.random() * 15) } // Cenderung lebih panas & bising
    ];
    res.json(sensors);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
