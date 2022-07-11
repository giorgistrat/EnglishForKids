import {
  mainLinks,
  cards
} from './assets/cards.js';

function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const main = document.querySelector('main')
const menu = document.querySelector('.menu')


const mainPage = async function () {
  for (let prop in mainLinks) {
    main.innerHTML += `<div class="cardContainer" id=${prop}>
    <div class="card__inner">
          <div class="card__face card__face--front">
              <img src='${mainLinks[prop].image}' alt='cardImage' class='cardImg'>
              <div class='cardHeader'>
                  <h3 class='cardTtile'>${mainLinks[prop].word}</h3>
                  <h4 class='cardN'>${mainLinks.length} cards</h4>
                  <button class='flipBtn' style="display: none">
                      <img src="./assets/img/refresh.svg" alt="rotate button" class="rotate">
                  </button>
              </div>
          </div>
          <div class="card__face card__face--back">
            <img src='' alt='cardImage' class='cardImg1'>
            <div class='cardHeader'>
              <h3 class='cardTtile1'></h3>
            </div>
          </div>
    </div>
    </div>`
    menu.innerHTML += `
    <li class='navEl card' id='${prop}'> ${mainLinks[prop].word}</li>
    `
  }

await wait(10)
if(cardContainer[0].classList.contains('play')){
  for (let i=0; i < cardContainer.length; i++){
    cardContainer[i].classList.remove('play')
  }
}


}
let index = []

window.addEventListener('load', mainPage());

const mainPage1 = document.querySelector('.mainPage')
const cardContainer = document.querySelectorAll('.cardContainer')
const card = document.querySelectorAll('.card')
const toggle_menu = document.querySelector('.toggle-menu')
const navEl = document.querySelectorAll('.navEl')

  if (!cardContainer[0].classList.contains('play')){
    cardContainer.forEach(item => {
      item.addEventListener('click', ()=> {
        index.push(item.id)
      }, {once:true})
    })
  }

  if (!cardContainer[0].classList.contains('play')){
    navEl.forEach(item => {
      item.addEventListener('click', ()=> {
        index=[]
        index.push(item.id)
      }, {once:true})
    })
  }

mainPage1.addEventListener('click', async () => {
  if(cardContainer[0].classList.contains('play')){
    for (let i=0; i < cardContainer.length; i++){
      cardContainer[i].classList.remove('play')
    }
  }
  await wait (10)
  window.location.reload()

})

const loadPlayCards = async function (element) {
  const images = document.querySelectorAll('.cardImg')
  const name = document.querySelectorAll('.cardTtile')
  const cardN = document.querySelectorAll('.cardN')
  const flipBtn = document.querySelectorAll('.flipBtn')
  const images1 = document.querySelectorAll('.cardImg1')
  const name1 = document.querySelectorAll('.cardTtile1')


  for (let i = 0, j = 0; i < images.length, j < 8; i++, j++) {
    images[i].src = `${cards[element.currentTarget.id][j].image}`
    name[i].innerHTML = `${cards[element.currentTarget.id][j].word}`
    cardN[i].classList.add('hide')
    images1[i].src = `${cards[element.currentTarget.id][j].image}`
    name1[i].innerHTML = `${cards[element.currentTarget.id][j].translation}`
    flipBtn[i].style.display = "block";
    cardContainer[i].classList.add('play')

    cardContainer[i].removeEventListener('click', loadPlayCards);
  }

 if(cardContainer[0].classList.contains('play')){
    for (let i=0; i < cardContainer.length; i++){
      cardContainer[i].addEventListener('click', (element) => {
        let audio = new Audio (`${cards[index[0]][element.currentTarget.id].audioSrc}`)
        audio.play()
        console.log(`${cards[index[0]][element.currentTarget.id].audioSrc}`)
      })
    }
  }
  toggle_menu.checked = false

  navEl.forEach(item => {
    item.classList.remove('highlight')
  })

  if (navEl[`${parseInt(element.currentTarget.id)+1}`].classList.contains('highlight')){
    navEl[`${parseInt(element.currentTarget.id)+1}`].classList.remove('highlight')
  } else {
    navEl[`${parseInt(element.currentTarget.id)+1}`].classList.add("highlight")
  }

}

for (let i=0; i < cardContainer.length; i++){
  cardContainer[i].addEventListener('click', loadPlayCards, {once:true});
}


card.forEach(item => {
  item.addEventListener('click', loadPlayCards)
})

const flipBtn = document.querySelectorAll('.flipBtn')

flipBtn.forEach(item => {
  item.addEventListener('click', (e)=>{
    e.currentTarget.parentElement.parentElement.parentElement.classList.add('is-flipped')
    cardContainer.forEach(items =>{
      items.addEventListener('mouseleave', (e)=>{
        e.currentTarget.children[0].classList.remove('is-flipped')
      }, {once: true})})
  })
})

window.onclick = element => {
  if (!element.target.classList.contains("check")){
    toggle_menu.checked = false
  }
} 