const $ = document
let btnsAdd = $.querySelectorAll('.btn-add-shop-card')
let btnsRemove = $.querySelectorAll('.btn-remove-shop-card ')
let cards = $.querySelectorAll('.menu-item')
let note = $.querySelector('.note')
let productContainer = $.querySelector('.product-container')
let productsSum = $.querySelector('.product-sum')
let shopBbasket = $.querySelector('.card-shop-basket')
let sumFunc = ()=>{
    let sum = 0
    let products = productContainer.children
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let productNumber = product.children[2].children[2].innerHTML
        productNumber = Number(productNumber)
        let productCost = product.children[3].innerHTML
        productCost = productCost.split("")
        productCost.pop()
        productCost = productCost.join('')
        let productSum = productCost * productNumber
        sum += productSum
        productsSum.innerHTML = sum + "₺"
    }
}

let checkProducts = ()=>{
    let products = productContainer.children
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let productId = product.id
        let trashThis = product.children[2].children[0]
        trashThis.addEventListener('click',()=>{
            let thisProduct = trashThis.parentElement.parentElement
            thisProduct.remove()
            cards.forEach((card)=>{
                if(card.id == thisProduct.id){
                    card.classList.remove('active')
                    let products = productContainer
                    let basketProducts = products.children
                    for (let i = 0; i < basketProducts.length; i++) {
                        const product = basketProducts[i];
                        if(product.id == card.id){
                            product.remove()
                            card.classList.remove('active')
                            card.removeAttribute('id')
                        }
                    }
                } else{
                }
            })
        })
        let btnsAddNumber = $.querySelectorAll('.product-add')
        btnsAddNumber.forEach((btnAdd)=>{
            let count = 1
            btnAdd.addEventListener('click', ()=>{
                let productCount = btnAdd.parentElement.children[2].innerHTML
                productCount = Number(productCount)
                count += 1
                btnAdd.parentElement.children[2].innerHTML = count
                console.log("ok");
            })
        })

        // let addNumber = product.children[2].children[1]
        // let sum = 0
        // addNumber.addEventListener('click',()=>{
        //     let thisProduct = addNumber.parentElement
        //     let thisproductNumber = thisProduct.children[2].innerHTML
        //     thisproductNumber = Number(thisproductNumber)
        //     sum = thisproductNumber
        //     sum +=1
        //     thisProduct.children[2].innerHTML = sum
        //     sumFunc()
        // })
        cards.forEach((card)=>{
            if (card.id) {
                let productTrash = card.children[4]
                productTrash.addEventListener('click', ()=>{
                    if (productId == card.id){
                        card.classList.remove('active')
                        card.removeAttribute('id')
                        product.remove()
                        sumFunc()
                    }
                })
            } else{
                // console.log("OK");
                sumFunc()
            }
        })
    }
}
let addToShopCard = (card)=>{
    let id = Math.floor(Math.random() * 10000)
    let productNumber = $.querySelector('.product-number')
    if (card.id) {
        let number = Number(productNumber.innerHTML);
        let productCost = $.querySelector('.product-cost')
        number += 1;
        productNumber.innerHTML = number
        checkProducts()
        sumFunc()
    } else{
        card.id = id
        let btnClose = $.querySelector('.btn-close')
        let img = card.children[1].src
        let name = card.children[2].textContent
        let cost = card.children[3].textContent
        let newProduct = 
        `<div class="product" id="${id}">
        <img class="product-img" src="${img}">
        <h4 class="product-title">${name}</h4>
        <div class="product-control">
            <img class="trash-this" src="./assets/img/logo/trash-solid-24.png">
            <img class="product-add" src="./assets/img/logo/plus-circle-solid-24.png">
            <span class="product-number">1</span>
        </div>
        <div class="product-cost">${cost}</div>
    </div>`
        productContainer.insertAdjacentHTML('afterbegin', newProduct)
        // note.classList.add('active')
        btnClose.addEventListener('click',()=>{
            note.classList.remove('active')
        })
        checkProducts()
        sumFunc()
    }
}

let menusClick = $.querySelectorAll('.menu-click')

menusClick.forEach((menuClick)=>{
    menuClick.addEventListener('click', ()=>{
        // let card = card.parentElement
        menuClick.parentElement.classList.add('active')
        let card = menuClick.parentElement
        addToShopCard(card)
        sumFunc()
    })
})
btnsRemove.forEach((remove)=>{
    remove.addEventListener('click', ()=>{
        let card = remove.parentElement
        card.classList.remove('active')
        let products = productContainer
        let basketProducts = products.children
        for (let i = 0; i < basketProducts.length; i++) {
            const product = basketProducts[i];
            if(product.id == card.id){
                product.remove()
            }
            card.removeAttribute('id')
        }
        sumFunc()
    })
})

let trashAll = $.querySelector('.trash-all')
trashAll.addEventListener('click', ()=>{
    let products = productContainer
    let basketProducts = products.children
    cards.forEach((card)=>{
        for (let i = 0; i < basketProducts.length; i++) {
            const product = basketProducts[i];
            if(product.id == card.id){
                product.remove()
            }
            card.classList.remove('active')
            card.removeAttribute('id')
            productsSum.innerHTML = ""
        }
    })
    productContainer.innerHTML = ""
})

shopBbasket.addEventListener('click', ()=>{
    let btnClose = $.querySelector('.btn-close')
    note.classList.add('active')
    btnClose.addEventListener('click',()=>{
        note.classList.remove('active')
    })
    checkProducts()
    sumFunc()
})

window.addEventListener('click',()=>{
    sumFunc()
})