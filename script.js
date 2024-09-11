const cartOpen = document.querySelector('#cart-open');
const cart = document.querySelector('.cart');
const cartClose = document.getElementById('cart-close');

cartOpen.addEventListener('click', () => {
    cart.classList.add('cart-active');
    console.log("çart-active")
})

cartClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
})

let cartAdd = document.querySelectorAll('#but')
let x = 1;
cartAdd.forEach(button => {
    button.addEventListener('click', () => {
        let count = document.querySelector('.count')
        count.textContent = x;
        x++;
    })
})

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
    // Removing foods from cart
    let btnRemove = document.querySelectorAll('#cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    })

    // Product item inputBox
    let cartQty = document.querySelectorAll('.cart-qty')
    cartQty.forEach((input) => {
        input.addEventListener('change', changeQty)
    })

    // Product cart items
    let cartBtn = document.querySelectorAll('#but');
    cartBtn.forEach((btn) => {
        btn.addEventListener('click', addCart)
    })

    updateTotal();
}

// Remove Items
function removeItem() {
    let title = this.parentElement.querySelector('.cart-prd-title').innerHTML;
    itemList = itemList.filter(e=>e.title!=title);
    this.parentElement.remove();
    loadContent();
}

// change quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1
    }
    loadContent();
}

let itemList =  [];

// Add Cart
function addCart() {
    let food = this.parentElement;

    let imgSrc = food.querySelector('img').src;
    
    let title = food.querySelector('h5').innerHTML;

    let price = food.querySelector('h6').innerHTML;

    let newProduct = {title,imgSrc,price}   
    //check product already exist in cart 
    if(itemList.find((e)=> e.title==newProduct.title))
    {
        alert("Product already added");
    }else{
        itemList.push(newProduct);
    }
    
    let newProductElement = createCartProduct(title,price,imgSrc);
    
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element); 
    
    loadContent() ;
}

function createCartProduct(h5,h6,img){
    return `
    <div class="cart-box">
                        <img src="${img}"  class="cart-img" alt="">
                        <div class="detail-box">
                            <div class="cart-prd-title">${h5}</div>
                            <div class="price-box">
                                <div class="cart-price">${h6}</div>
                                <div class="cart-amt">${h6}</div>
                            </div>
                            <input type="number" value="1" class="cart-qty">
                        </div>
                        <i class="fa-solid fa-trash" id="cart-remove"></i>
                    </div>
    `;
}

function updateTotal(){ 
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;
    cartItems.forEach(product =>{
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",''));
        let qty = product.querySelector('.cart-qty').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText = "$"+price*qty
    })

    totalValue.innerHTML = "$"+total;
}
