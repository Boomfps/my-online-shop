let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} ถูกเพิ่มลงตะกร้าแล้ว!`);
}

function updateCartCount() {
    const count = cart.length;
    const cartCountElem = document.getElementById('cart-count');
    if(cartCountElem) cartCountElem.textContent = count;
}

function displayCart() {
    const cartItemsElem = document.getElementById('cart-items');
    if (!cartItemsElem) return;

    cartItemsElem.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - ${item.price} บาท</span>
            <button onclick="removeItem(${index})">ลบ</button>
        `;
        cartItemsElem.appendChild(div);
    });

    document.getElementById('total-price').textContent = `รวมทั้งหมด: ${total} บาท`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function checkout() {
    if(cart.length === 0){
        alert('ตะกร้าว่าง!');
        return;
    }
    alert('สั่งซื้อเรียบร้อย! ขอบคุณที่ใช้บริการ');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

updateCartCount();
displayCart();