const english = {
  'Manajemen Stok': 'Inventory', 'Total produk': 'Total products', 'Stok menipis': 'Low stock', 'Opname bulan ini': 'Stocktaking this month',
  Produk: 'Products', Kategori: 'Category', Deskripsi: 'Description', Nominal: 'Amount', Referensi: 'Reference', Stok: 'Stock', Status: 'Status', Aksi: 'Actions',
  'Stok Masuk': 'Stock In', 'Stok Keluar': 'Stock Out', Penyesuaian: 'Adjustment', 'Stok Opname': 'Stocktaking', Pemasok: 'Suppliers', Terhapus: 'Deleted',
  'Semua kategori': 'All categories', Refresh: 'Refresh', Export: 'Export', Tambah: 'Add', 'Tambah Produk': 'Add product', Aman: 'Safe', Menipis: 'Low',
  Dashboard: 'Dashboard', 'Selamat siang, Admin': 'Good afternoon, Admin', 'Berikut ringkasan performa seluruh outlet hari ini.': 'Here is today’s performance summary across all outlets.', 'Transaksi baru': 'New transaction',
  Transaksi: 'Transactions', Membership: 'Membership', 'Akuntansi & Pembukuan': 'Accounting & Bookkeeping', 'Kategori Menu': 'Menu Categories', 'Hak Akses': 'Access Control', 'Log Aktivitas': 'Activity Log', Setting: 'Settings',
  'Total Member': 'Total Members', 'Member Aktif': 'Active Members', 'Total Points': 'Total Points', Nama: 'Name', Level: 'Level', Point: 'Points', 'Member ID': 'Member ID',
  Invoice: 'Invoice', Customer: 'Customer', Method: 'Method', Total: 'Total', Username: 'Username', Role: 'Role', 'Hari ini': 'Today',
  Pendapatan: 'Revenue', Pengeluaran: 'Expenses', 'Laba Bersih': 'Net Profit', 'Piutang / Hutang': 'Receivables / Payables', Operasional: 'Operations', Gaji: 'Payroll',
  'Penjualan outlet': 'Outlet sales', 'Listrik & internet': 'Electricity & internet', Tanggal: 'Date', Outlet: 'Outlet', Filter: 'Filter', 'Tambah data': 'Add data',
  'Semua tanggal': 'All dates', '7 hari terakhir': 'Last 7 days', '30 hari terakhir': 'Last 30 days', 'Semua outlet': 'All outlets', 'Semua status': 'All statuses',
  Aktif: 'Active', Nonaktif: 'Inactive', Tercatat: 'Posted', Menunggu: 'Pending', Lunas: 'Paid', Gagal: 'Failed',
}

export const t = (language, value) => (
  language === 'en' && typeof value === 'string' ? (english[value] || value) : value
)
