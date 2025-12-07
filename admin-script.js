// ============================================
// KONFIGURASI
// ============================================
const CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxSqaANveC567cMCuXUdjffLm_p1Q1ilmsXNTXayJZfHg85sS2EkY-YS3R8OHyC52tu/exec',
    ADMIN_PASSWORD: 'admin123', // GANTI PASSWORD INI!
    SESSION_KEY: 'admin_logged_in'
};

// ============================================
// STATE MANAGEMENT
// ============================================
let allData = [];
let filteredData = [];
let currentRowIndex = null;

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Check if user is logged in
 */
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem(CONFIG.SESSION_KEY);
    if (isLoggedIn === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

/**
 * Show login screen
 */
function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('dashboardScreen').style.display = 'none';
}

/**
 * Show dashboard
 */
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboardScreen').style.display = 'block';
    loadData();
}

/**
 * Handle login
 */
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (password === CONFIG.ADMIN_PASSWORD) {
        sessionStorage.setItem(CONFIG.SESSION_KEY, 'true');
        showDashboard();
    } else {
        errorDiv.textContent = '❌ Password salah!';
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
});

/**
 * Handle logout
 */
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem(CONFIG.SESSION_KEY);
    showLogin();
    document.getElementById('password').value = '';
});

// ============================================
// DATA LOADING
// ============================================

/**
 * Load data from Google Sheets
 */
async function loadData() {
    try {
        showLoading();
        
        const response = await fetch(`${CONFIG.SCRIPT_URL}?action=getLaporan`, {
            method: 'GET',
        });

        const data = await response.json();

        if (data.success && data.laporan) {
            allData = data.laporan;
            filteredData = [...allData];
            
            updateStats();
            renderTable();
            updateLastUpdate();
            hideLoading();
        } else {
            throw new Error(data.error || 'Gagal memuat data');
        }

    } catch (error) {
        console.error('Error loading data:', error);
        showError();
    }
}

/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('laporanTable').style.display = 'none';
    document.getElementById('noDataContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
}

/**
 * Hide loading state
 */
function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
    
    if (filteredData.length > 0) {
        document.getElementById('laporanTable').style.display = 'table';
    } else {
        document.getElementById('noDataContainer').style.display = 'block';
    }
}

/**
 * Show error state
 */
function showError() {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('laporanTable').style.display = 'none';
    document.getElementById('noDataContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'block';
}

/**
 * Update last update time
 */
function updateLastUpdate() {
    const now = new Date();
    const timeStr = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = `Terakhir diperbarui: ${timeStr}`;
}

// ============================================
// STATS CALCULATION
// ============================================

/**
 * Update statistics cards
 */
function updateStats() {
    const total = allData.length;
    const baru = allData.filter(item => item[6] === 'Baru').length;
    const proses = allData.filter(item => item[6] === 'Sedang Ditangani').length;
    const selesai = allData.filter(item => item[6] === 'Selesai').length;
    
    document.getElementById('totalLaporan').textContent = total;
    document.getElementById('totalBaru').textContent = baru;
    document.getElementById('totalProses').textContent = proses;
    document.getElementById('totalSelesai').textContent = selesai;
}

// ============================================
// TABLE RENDERING
// ============================================

/**
 * Render table with data
 */
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    if (filteredData.length === 0) {
        document.getElementById('laporanTable').style.display = 'none';
        document.getElementById('noDataContainer').style.display = 'block';
        return;
    }
    
    document.getElementById('laporanTable').style.display = 'table';
    document.getElementById('noDataContainer').style.display = 'none';
    
    filteredData.forEach((row, index) => {
        const tr = document.createElement('tr');
        
        const no = row[0] || '-';
        const timestamp = row[1] || '-';
        const pengadu = row[2] || '-';
        const pelanggar = row[3] || '-';
        const area = row[4] || '-';
        const laporan = row[5] || '-';
        const status = row[6] || 'Baru';
        
        // Truncate laporan if too long
        const laporanShort = laporan.length > 50 
            ? laporan.substring(0, 50) + '...' 
            : laporan;
        
        tr.innerHTML = `
            <td><strong>#${no}</strong></td>
            <td>${timestamp}</td>
            <td>${pengadu}</td>
            <td>${pelanggar}</td>
            <td>${area}</td>
            <td>${laporanShort}</td>
            <td><span class="status-badge ${getStatusClass(status)}">${status}</span></td>
            <td>
                <button class="btn-detail" onclick="showDetail(${index})">Detail</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

/**
 * Get status badge class
 */
function getStatusClass(status) {
    switch(status) {
        case 'Baru': return 'status-baru';
        case 'Sedang Ditangani': return 'status-proses';
        case 'Selesai': return 'status-selesai';
        case 'Ditolak': return 'status-ditolak';
        default: return 'status-baru';
    }
}

// ============================================
// FILTERING & SEARCHING
// ============================================

/**
 * Apply filters
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // Filter by search term
    filteredData = allData.filter(row => {
        const searchText = [
            row[0], // no
            row[1], // timestamp
            row[2], // pengadu
            row[3], // pelanggar
            row[4], // area
            row[5], // laporan
        ].join(' ').toLowerCase();
        
        return searchText.includes(searchTerm);
    });
    
    // Filter by status
    if (statusFilter) {
        filteredData = filteredData.filter(row => row[6] === statusFilter);
    }
    
    // Sort
    if (sortBy === 'terbaru') {
        filteredData.reverse();
    }
    
    renderTable();
}

// Event listeners for filters
document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('filterStatus')?.addEventListener('change', applyFilters);
document.getElementById('sortBy')?.addEventListener('change', applyFilters);

// ============================================
// MODAL DETAIL
// ============================================

/**
 * Show detail modal
 */
function showDetail(index) {
    const row = filteredData[index];
    currentRowIndex = allData.findIndex(item => 
        item[0] === row[0] && item[1] === row[1]
    );
    
    document.getElementById('modalNo').textContent = row[0];
    document.getElementById('modalTimestamp').textContent = row[1];
    document.getElementById('modalPengadu').textContent = row[2];
    document.getElementById('modalPelanggar').textContent = row[3];
    document.getElementById('modalArea').textContent = row[4];
    document.getElementById('modalLaporan').textContent = row[5];
    
    document.getElementById('detailModal').style.display = 'block';
}

/**
 * Close modal
 */
function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
    currentRowIndex = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        closeModal();
    }
}

/**
 * Update status
 */
async function updateStatus() {
    if (currentRowIndex === null) return;
    
    const newStatus = document.getElementById('modalStatus').value;
    const rowNumber = currentRowIndex + 2; // +2 because header row + 0-indexed
    
    try {
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'update-status',
                rowNumber: rowNumber,
                status: newStatus
            })
        });
        
        // Update local data
        allData[currentRowIndex][6] = newStatus;
        
        // Update filtered data
        const filteredIndex = filteredData.findIndex(item => 
            item[0] === allData[currentRowIndex][0]
        );
        if (filteredIndex !== -1) {
            filteredData[filteredIndex][6] = newStatus;
        }
        
        // Re-render
        updateStats();
        renderTable();
        closeModal();
        
        alert('✅ Status berhasil diupdate!');
        
    } catch (error) {
        console.error('Error updating status:', error);
        alert('❌ Gagal update status. Silakan coba lagi.');
    }
}

// ============================================
// REFRESH BUTTON
// ============================================

document.getElementById('refreshBtn')?.addEventListener('click', () => {
    loadData();
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
