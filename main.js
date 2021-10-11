'use strict'

const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--dark')
    arrowUp.classList.add('visible')
  } else {
    navBar.classList.remove('navbar--dark')
    arrowUp.classList.remove('visible')
  }
})

// const navbarMenu = document.querySelector('.navbar__menu')
// navbarMenu.addEventListener('click', moveScrollToElement)

const btnContact = document.querySelector('.home__contact')
btnContact.addEventListener('click', moveScrollToElement)

// make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight
})

function moveScrollToElement(event) {
  const target = event.target
  const link = target.dataset.link
  if(link == null) return
  const scrollTo = document.querySelector(link)
  scrollTo.scrollIntoView({behavior:"smooth"})
}