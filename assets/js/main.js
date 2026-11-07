/* ==========================================================================
   SISTEM PEMESANAN RUANG DISKUSI MAHASISWA
   JavaScript Utama (Simulasi AJAX & UI Interactions)
   ========================================================================== */

// Mock Data Ruangan Diskusi
const DATA_RUANGAN = [
  {
    id: 1,
    nama: "Ruang Diskusi Alpha 101",
    gedung: "Gedung Tokong Nanas (TUA) - Lt. 2",
    kapasitas: 8,
    fasilitas: ["AC", "Proyektor", "Whiteboard", "WiFi 100Mbps", "Stopkontak"],
    status: "Tersedia",
    deskripsi: "Cocok untuk diskusi kelompok sedang, dilengkapi Smart TV dan AC dingin."
  },
  {
    id: 2,
    nama: "Ruang Diskusi Beta 202",
    gedung: "Gedung Telkom University Jakarta - Lt. 3",
    kapasitas: 12,
    fasilitas: ["AC", "Smart TV 55 inch", "Whiteboard Glass", "WiFi"],
    status: "Tersedia",
    deskripsi: "Ruangan luas dengan fasilitas presentasi modern untuk kelompok besar."
  },
  {
    id: 3,
    nama: "Ruang Diskusi Gamma 303",
    gedung: "Gedung Perpustakaan - Lt. 1",
    kapasitas: 6,
    fasilitas: ["AC", "Whiteboard", "WiFi", "Stopkontak Desk"],
    status: "Dipakai",
    deskripsi: "Suasana tenang di area perpustakaan, ideal untuk kerja fokus."
  },
  {
    id: 4,
    nama: "Ruang Diskusi Delta 404",
    gedung: "Gedung Tokong Nanas - Lt. 4",
    kapasitas: 15,
    fasilitas: ["AC", "Proyektor HD", "Sound System", "Whiteboard", "WiFi"],
    status: "Tersedia",
    deskripsi: "Ruang diskusi besar untuk rapat organisasi atau workshop kelompok."
  }
];

// Mock Data Pemesanan
let DATA_PEMESANAN = [
  {
    id: "BK-20261107-001",
    nim: "103062430002",
    namaMahasiswa: "Faisa Abhinaya",
    ruangan: "Ruang Diskusi Alpha 101",
    tanggal: "2026-11-09",
    jamMulai: "09:00",
    jamSelesai: "11:00",
    status: "Disetujui",
    tglPengajuan: "2026-11-07"
  },
  {
    id: "BK-20261107-002",
    nim: "103062400054",
    namaMahasiswa: "Ilham Fawwaz Hairasikh",
    ruangan: "Ruang Diskusi Beta 202",
    tanggal: "2026-11-10",
    jamMulai: "13:00",
    jamSelesai: "15:00",
    status: "Pending",
    tglPengajuan: "2026-11-07"
  },
  {
    id: "BK-20261106-003",
    nim: "103062400126",
    namaMahasiswa: "Ilham Kurniawan",
    ruangan: "Ruang Diskusi Gamma 303",
    tanggal: "2026-11-08",
    jamMulai: "10:00",
    jamSelesai: "12:00",
    status: "Ditolak",
    alasanTolak: "Ruangan sedang digunakan untuk perbaikan AC",
    tglPengajuan: "2026-11-06"
  }
];

// Mock Data Laporan Fasilitas
let DATA_LAPORAN = [
  {
    id: "RPT-001",
    ruangan: "Ruang Diskusi Alpha 101",
    fasilitas: "Proyektor",
    deskripsi: "Kabel HDMI proyektor agak longgar dan tampilan berkedip.",
    pelapor: "Faisa Abhinaya",
    tanggal: "2026-11-05",
    status: "Proses"
  },
  {
    id: "RPT-002",
    ruangan: "Ruang Diskusi Gamma 303",
    fasilitas: "AC",
    deskripsi: "AC kurang dingin dan mengeluarkan suara bising.",
    pelapor: "Ilham Kurniawan",
    tanggal: "2026-11-06",
    status: "Selesai"
  }
];

// Helper Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
}

// Fitur Simulasi AJAX Pengecekan Ketersediaan Ruangan (Diperuntukkan Bagian Pemesanan)
function checkAvailability(ruanganId, tanggal, jamMulai, jamSelesai) {
  return new Promise((resolve) => {
    // Simulasi delay network AJAX (500ms)
    setTimeout(() => {
      // Cek apakah ada jadwal pemesanan yang bentrok
      const bentrok = DATA_PEMESANAN.some(booking => {
        if (booking.status === 'Disetujui' && booking.ruangan.includes(ruanganId)) {
          if (booking.tanggal === tanggal) {
            // Cek overlap waktu
            if (jamMulai < booking.jamSelesai && jamSelesai > booking.jamMulai) {
              return true;
            }
          }
        }
        return false;
      });

      if (bentrok) {
        resolve({ available: false, message: 'Maaf! Ruangan sudah dipesan pada tanggal dan jam tersebut.' });
      } else {
        resolve({ available: true, message: 'Ruangan TERSEDIA! Silakan lanjutkan pemesanan.' });
      }
    }, 400);
  });
}

// Notification Toast Alert Sederhana
function showNotification(message, type = 'success') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  const toastClass = `toast-${type}`;
  toast.className = `toast ${toastClass}`;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 3000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;
  document.body.appendChild(container);
  return container;
}

// Alias untuk kompatibilitas dengan admin pages
function showToast(message, type = 'success') {
  showNotification(message, type);
}
