import { menuArray } from './data.js'

let orderArray = []
const orderDiv = document.querySelector('.order-div')
const totalPrice = document.querySelector('.total-price')
const orderThanks = document.querySelector('.order-thanks')
const completeOrder = document.getElementById('complete-order')
const modal = document.getElementById('checkout-modal')
const finaliseOrder = document.getElementById('finalise-order')
const modalClose = document.getElementById('modal-close')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        AddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        RemoveClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-order'){
        complete()
    }   
})

//modalClose =/= finaliseOrder
modalClose.addEventListener('click', closeModal)

function closeModal(){
    modal.style.display = 'none'
}

// controls class='display-none'//
function hideElement(element) {
    element.classList.add("display-none")
  } 
  function showElement(element) {
    element.classList.remove("display-none")
  }

  function updateUI() {
    orderRender();
    getPrice();
  }

function AddClick(itemId){
    const itemObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    
    itemObj.count++
    itemObj.sum = itemObj.price * itemObj.count
    if(!orderArray.includes(itemObj)){
        orderArray.push(itemObj)
    }
    updateUI()
}

function RemoveClick(itemId){
    let itemObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    
    if (itemObj.count > 0) {
        itemObj.count--
        itemObj.sum = itemObj.price * itemObj.count
    }
    orderArray = orderArray.filter(function(item) {
        return item.count > 0
    })
    
    updateUI()
}

function orderRender() {
    let orderRenders = ``
    showElement(orderDiv)
    orderArray.forEach(function(item){
        orderRenders += `
            <div class="order-items">
                <h1 class="item-name">${item.name}</h1>

                <!--!!create object later and move it from data.js!! -->
                <span class="item-count">qty: ${item.count}</span>

                <p class="item-remove" data-remove="${item.id}">-</p>
                    <h2 class="price order-price">${item.price}€</h2>
            </div>`
})
    
if (orderArray.length === 0) {
        hideElement(orderDiv)
    } else {
        showElement(orderDiv)
    document.querySelector('.order-details').innerHTML = orderRenders
}
}

function getPrice(){
    let price = 0
    let priceHtml = ``
    
    orderArray.forEach(function(item){
        price += item.sum
    })
    
    priceHtml += `
        <h1 class="price-h1">Total price:</h1>
        <h2 class="price-final">${price}€</h2>
    `
    totalPrice.innerHTML = priceHtml
}

completeOrder.addEventListener('click', function(){
    hideElement(orderThanks)
})

function getItemHtml() {
    let itemHtml = ``
    
    menuArray.forEach(function(items){
        itemHtml += `
            <div class="menu-item">
                    <img class="item-image" src="/images/${items.image}">
                <div class="menu-info">
                    <h1 class="item-name">${items.name}</h1>
                    <p class="item-ingredients">${items.ingredients}</p>
                    <h2 class="item-price">${items.price}€</h2>
                </div>
                <div class="add">
                    <button class="plus-button" data-add="${items.id}">+</button>
                </div>
            </div>
        `
    })
    return itemHtml
}

function complete(){
    return modal.style.display = "block"
}

function render() {
    document.getElementById('menu').innerHTML = getItemHtml()
}
finaliseOrder.addEventListener('submit', function(e){
    e.preventDefault()

    const finaliseOrderData = new FormData(finaliseOrder)
    const fullName = finaliseOrderData.get("fullName")
    const email = finaliseOrderData.get('email')
    
    hideElement(modal)
    hideElement(orderDiv)
    hideElement(finaliseOrder)
    modal.style.background = "none"
    showElement(orderThanks)
    orderThanks.innerHTML = `<div id="thanks-msg"><div id="thanks-inner"><h1>Thanks, ${fullName}!</h1> <h2>Your order will be ready soon!</h2><br><p>you will receive updates as we prepare your food at ${email}.</p></div></div>`
  
                

        setTimeout(() => {
            orderThanks.classList.add('display-none')
            window.location.reload()
        }, 5000);
})

render()
