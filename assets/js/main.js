// Category change group
let catalogGroups = document.getElementsByClassName('catalog__group')
let catalogContainer = document.getElementsByClassName('catalog__wrapper')

for (let i = 0; i < catalogGroups.length; i++) {
    catalogContainer[i].style.opacity = 1
    catalogContainer[1].style.display = 'none'
    document.getElementsByClassName('catalog__group')[i].onclick = (e) => {
        makeCatalogTabActive(e.target)
        for (let j = 0; j < catalogGroups.length; j++) {
            if (catalogGroups[j] == e.target) {
                catalogContainer[j].style.display = 'flex'
            } else {
                catalogContainer[j].style.display = 'none'
            }
        }
    
    }
}

function makeCatalogTabActive(clickedTab) {
    for (let i = 0; i < catalogGroups.length; i++) {
        document.getElementsByClassName('catalog__group')[i].classList.remove('catalog__group--active');
    }
    clickedTab.classList.add('catalog__group--active');
}
// Pop up
let orderButtons = document.getElementsByClassName('product__button')
let popupContainer = document.getElementsByClassName("popup-container")[0]
let cancelBtn = document.getElementsByClassName("order__cancel")[0]
let orderBtn = document.getElementsByClassName("order__btn")[0]
let popupInnerContainer = document.getElementsByClassName('inner-container')[0]

for (let i = 0; i < orderButtons.length; i++) {
    document.getElementsByClassName('product__button')[i].onclick = (e) => {
        let product = e.target.parentElement.children
        orderPopUp(product)
        cancelBtn = document.getElementsByClassName("order__cancel")[0]
        console.log(cancelBtn);
        orderBtn = document.getElementsByClassName("order__btn")[0]
        console.log(cancelBtn);
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hidePopup();
        },false)
        
        
        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Заказ выполнен, ждите звонка менеджера для уточнения!");
        },false)
    }
}

function showPopup() {
    popupContainer.style.visibility = "visible";
    popupContainer.style.opacity = "1";
}

function hidePopup() {
    popupContainer.style.visibility = "hidden";
    popupContainer.style.opacity = "0";
}

popupContainer.onclick = (e) => {
    if(e.target.attributes.getNamedItem("data-js") && e.target.attributes.getNamedItem("data-js").value == "popup") {
        hidePopup();
    }
};

function orderPopUp(product) {
    let img = window.getComputedStyle(product[1]).getPropertyValue('background-image');
    let imgUrl = img.slice(img.indexOf('img'), img.length - 2)
    let name = product[2].innerHTML
    let priceDiv = product[5].cloneNode(true)
    let Sizes = product[3].children
    let availableSizes = [];
    availableSizes.push('Выберите размер')
    for (let i = 0 ; i < Sizes.length;i++) {
        if(!Sizes[i].classList.contains('product__size__item--notavailable')) availableSizes.push(Sizes[i].innerHTML);
    } 
    // .filter(el=> el.classList.contains('product__size__item--notavailable'))
    popupInnerContainer.innerHTML = 
    `   <div style="background-image: url(../assets/${imgUrl})" class="popup__img"></div>
     
            <form action="" method="post" class="popup__details">
                <div class="popup__name">${name}</div>
                <div class="popup__priceplaceholder"></div>
                <div class="popup__select">    
                    <select id="size" name="size"></select>
                    <span class="focus"></span>
                </div>
                <input class="input" id="name" type="text" placeholder="Введите ваше имя" />
                <input class="input" id="phone" type="text"  placeholder="Введите ваш телефон"/>
                <button class="order__btn" type="submit">Оформить заказ</button>
                <button class="order__cancel x__mark" type="button">
                </button>
            </form>
       `
    document.getElementsByClassName('popup__priceplaceholder')[0].appendChild(priceDiv)
    for (let i = 0; i < availableSizes.length; i++) {
        
        let opt = document.createElement('option')
        opt.value = availableSizes[i]
        opt.innerHTML = availableSizes[i]
        if (i ==0 ) {
            opt.disabled = true
            opt.selected = true
        }
        document.getElementById('size').appendChild(opt)
    }
     
    showPopup()
}


// scroll Up
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 1500,
    delay: 200,
    // reset: true
})

sr.reveal(`.product__reveal, .about__description, .home__button, .order__item`)

