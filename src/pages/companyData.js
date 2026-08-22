export const COMPANIES = [
  { slug:'bukanota-coffee', name:'BukaNota Coffee', tag:'Kopi & Pastry', address:'Jl. Kemang Raya No. 18, Jakarta Selatan', hours:'08.00–22.00', tone:'tone-a', open:true, tables:['A1','A2','A3','B1','B2'] },
  { slug:'warung-nusantara', name:'Warung Nusantara', tag:'Masakan Indonesia', address:'Jl. Melawai Raya No. 7, Jakarta Selatan', hours:'10.00–21.00', tone:'tone-c', open:true, tables:['M1','M2','M3'] },
  { slug:'sushi-kaido', name:'Sushi Kaido', tag:'Jepang & Ramen', address:'Jl. Senopati No. 92, Jakarta Selatan', hours:'11.00–23.00', tone:'tone-d', open:true, tables:['Z1','Z2','Z3','Z4'] },
  { slug:'roti-legit', name:'Roti Legit Bakery', tag:'Bakery & Kue', address:'Jl. Cipete Raya No. 3, Jakarta Selatan', hours:'07.00–20.00', tone:'tone-b', open:false, tables:['R1','R2'] },
]

export const MENUS = {
  'bukanota-coffee': [
    { id:'ks1', name:'Kopi Susu Aren', desc:'Espresso, susu segar, gula aren asli', price:22000, cat:'Kopi' },
    { id:'am2', name:'Americano', desc:'Double shot espresso, air panas', price:18000, cat:'Kopi' },
    { id:'cc3', name:'Cappuccino', desc:'Espresso, steamed milk, foam tebal', price:25000, cat:'Kopi' },
    { id:'mt4', name:'Matcha Latte', desc:'Matcha premium, susu pilihan', price:26000, cat:'Non-Kopi' },
    { id:'ck5', name:'Chocolate Keju', desc:'Dark chocolate, cream cheese', price:27000, cat:'Non-Kopi' },
    { id:'cr6', name:'Butter Croissant', desc:'Croissant renyah butter premium', price:18000, cat:'Pastry' },
    { id:'cs7', name:'Cinnamon Roll', desc:'Roll kayu manis dengan glaze', price:20000, cat:'Pastry' },
    { id:'cp8', name:'Chicken Puff', desc:'Pastry isi ayam suwir pedas', price:19000, cat:'Pastry' },
    { id:'rf9', name:'Nasi Goreng Kampung', desc:'Nasi goreng, telur mata sapi, kerupuk', price:35000, cat:'Makanan' },
    { id:'ag10', name:'Aglio Olio Chicken', desc:'Spaghetti, bawang putih, ayam, cabai', price:38000, cat:'Makanan' },
  ],
  'warung-nusantara': [
    { id:'rg1', name:'Rendang Daging', desc:'Daging sapi empuk bumbu rendang padang', price:42000, cat:'Makanan' },
    { id:'ay2', name:'Ayam Bakar Madu', desc:'Ayam kampung bakar bumbu madu', price:36000, cat:'Makanan' },
    { id:'sg3', name:'Sayur Asem', desc:'Sayur segar kuah asem Jawa Barat', price:15000, cat:'Makanan' },
    { id:'tg4', name:'Tempe & Tahu Bacem', desc:'Tempe tahu bacem manis gurih', price:12000, cat:'Makanan' },
    { id:'es5', name:'Es Teh Manis', desc:'Teh tubruk manis dingin', price:8000, cat:'Non-Kopi' },
    { id:'jt6', name:'Es Jeruk Peras', desc:'Jeruk peras murni tanpa pengawet', price:12000, cat:'Non-Kopi' },
    { id:'km7', name:'Kopi Tubruk', desc:'Kopi robusta disedot langsung', price:10000, cat:'Kopi' },
    { id:'gd8', name:'Gudeg Telur', desc:'Gudeg yogya, telur, krecek', price:28000, cat:'Makanan' },
  ],
  'sushi-kaido': [
    { id:'sr1', name:'Salmon Roll', desc:'Salmon segar, avocado, rum nori', price:45000, cat:'Makanan' },
    { id:'kr2', name:'Kani Mentai Roll', desc:'Roll kani dengan saus mentai', price:48000, cat:'Makanan' },
    { id:'tm3', name:'Tekka Maki', desc:'Roll tuna klasik 8 pcs', price:38000, cat:'Makanan' },
    { id:'rm4', name:'Ramen Tonkotsu', desc:'Kuah kaldu tulang babi 12 jam', price:52000, cat:'Makanan' },
    { id:'gy5', name:'Gyoza Ayam', desc:'Pangsit kukus panggang 5 pcs', price:28000, cat:'Makanan' },
    { id:'gr6', name:'Green Tea Ocha', desc:'Teh hijau panas pot', price:15000, cat:'Non-Kopi' },
    { id:'ms7', name:'Misoshiru', desc:'Sup miso tahu dan wakame', price:16000, cat:'Makanan' },
    { id:'mt8', name:'Matcha Ice Cream', desc:'Es krim matcha dua scoop', price:24000, cat:'Non-Kopi' },
  ],
  'roti-legit': [
    { id:'rb1', name:'Roti Bakar Cokelat', desc:'Roti gandum, lelehan cokelat', price:17000, cat:'Makanan' },
    { id:'pt2', name:'Pain au Chocolat', desc:'Pastry lapis isi batang cokelat', price:22000, cat:'Pastry' },
    { id:'dt3', name:'Donut Glaze', desc:'Donat lembut glaze pilihan rasa', price:12000, cat:'Pastry' },
    { id:'ch4', name:'Cheesecake Slice', desc:'New York cheesecake classic', price:32000, cat:'Pastry' },
    { id:'lt5', name:'Latte', desc:'Espresso dan steamed milk', price:23000, cat:'Kopi' },
    { id:'vb6', name:'Vanilla Bean Latte', desc:'Latte sirup vanilla madu', price:26000, cat:'Kopi' },
    { id:'lm7', name:'Lemon Tea', desc:'Teh hitam lemon dingin', price:14000, cat:'Non-Kopi' },
    { id:'bg8', name:'Bagel Cream Cheese', desc:'Bagel panggang cream cheese', price:25000, cat:'Makanan' },
  ],
}

export const CATS = ['Semua', 'Kopi', 'Non-Kopi', 'Pastry', 'Makanan']

export const rupiah = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`

export const initials = (name) => name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
