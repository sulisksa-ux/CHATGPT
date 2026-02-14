let products=[
  {id:1,name:'أرز بسمتي فاخر',price:120,minQty:500,currentQty:325,pickup:'مستودع السلي – الرياض',image:'images/rice.jpg'},
  {id:2,name:'زيت طبخ',price:75,minQty:500,currentQty:200,pickup:'حي العزيزية – الرياض',image:'images/oil.jpg'}
];
let orders=[];

let productList=document.getElementById('product-list');
products.forEach(p=>{
  let card=document.createElement('div');
  card.className='product-card';
  card.innerHTML=`
    <img src='${p.image}'>
    <h3>${p.name}</h3>
    <div class='price'>${p.price} ريال / وحدة</div>
    <div class='progress'><span style='width:${(p.currentQty/p.minQty)*100}%'></span></div>
    <small>تم شراء ${p.currentQty} من ${p.minQty}</small>
    <input type='number' min='1' placeholder='أدخل الكمية' id='qty-${p.id}'>
    <button class='btn' onclick='placeOrder(${p.id})'>تأكيد الطلب</button>
    <br><br>
    <button class='btn' onclick='sendWhatsApp(${p.id})'>مشاركة واتساب</button>
  `;
  productList.appendChild(card);
});

function placeOrder(id){
  let qty=document.getElementById(`qty-${id}`).value;
  if(!qty||qty<=0){alert('ادخل كمية صحيحة');return;}
  let order={id:orders.length+1,productId:id,qty:parseInt(qty),status:'بانتظار الدفع'};
  orders.push(order);
  localStorage.setItem('orders',JSON.stringify(orders));
  alert('تم تسجيل طلبك! اذهب للدفع.');
  generateInvoice();
  renderAdminOrders();
}

function generateInvoice(){
window.onload=()=>{orders=JSON.parse(localStorage.getItem('orders'))||[];generateInvoice();renderAdminOrders();};
