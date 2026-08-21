import { BookOpen, CreditCard, FileText, ReceiptText, UserRound, Users } from 'lucide-react'

const entityConfigs = {
  '/app/payment': { name:'Payment', icon:CreditCard, stats:[['Total Payment','Rp 48,6 jt'],['Successful','1.248'],['Pending','24'],['Failed / Refund','12']], columns:['Invoice','Customer','Method','Total','Status'], rows:[['INV-20260820-001','Andi Wijaya','QRIS','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cash','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Debit','Rp 126.000','Pending']] },
  '/app/membership': { name:'Membership', icon:Users, image:true, stats:[['Total Member','1.284'],['Member Aktif','864'],['Member Baru','48'],['Total Points','284.600']], columns:['Member ID','Nama','Level','Point','Status'], rows:[['MBR-001','Andi Wijaya','Gold','1.240','Aktif'],['MBR-002','Sarah Putri','Platinum','2.860','Aktif'],['MBR-003','Kevin Lim','Silver','640','Aktif']] },
  '/app/users': { name:'User', icon:UserRound, image:true, stats:[['Total User','18'],['Active','16'],['Inactive','2'],['Online','8']], columns:['Username','Nama','Role','Outlet','Status'], rows:[['rina.kasir','Rina Maharani','Kasir','Kemang','Aktif'],['doni.manager','Doni Saputra','Manager','Cilandak','Aktif'],['siti.stock','Siti Aminah','Staff Gudang','Kemang','Aktif']] },
  '/app/accounting': { name:'Akuntansi & Pembukuan', icon:BookOpen, stats:[['Pendapatan','Rp 48,6 jt'],['Pengeluaran','Rp 11,4 jt'],['Laba Bersih','Rp 18,4 jt'],['Piutang / Hutang','Rp 4,8 jt']], columns:['Reference','Kategori','Deskripsi','Nominal','Status'], rows:[['FIN-001','Pendapatan','Penjualan outlet','Rp 48.600.000','Posted'],['FIN-002','Operasional','Listrik & internet','Rp 2.400.000','Posted'],['FIN-003','Gaji','Payroll Agustus','Rp 8.200.000','Pending']] },
  '/app/transactions': { name:'Transaksi', icon:ReceiptText, stats:[['Hari ini','128'],['Paid','116'],['Pending','8'],['Refund','4']], columns:['Invoice','Customer','Outlet','Total','Status'], rows:[['INV-20260820-001','Andi Wijaya','Kemang','Rp 162.000','Paid'],['INV-20260820-002','Sarah Putri','Cilandak','Rp 84.000','Paid'],['INV-20260820-003','Kevin Lim','Kemang','Rp 126.000','Pending']] },
  '/app/orders': { name:'Taking Order', icon:FileText, stats:[['Order aktif','24'],['Dapur','12'],['Siap diantar','8'],['Selesai','186']], columns:['Order','Customer','Tipe','Total','Status'], rows:[['ORD-042','Meja 08','Dine in','Rp 162.000','Diproses'],['ORD-041','Sarah Putri','Takeaway','Rp 84.000','Siap'],['ORD-040','Meja 03','QR Order','Rp 126.000','Baru']] },
}


export default entityConfigs
