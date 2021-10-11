'use strict'

const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--dark')
  } else {
    navBar.classList.remove('navbar--dark')
  }
})

function moveScrollToElement(event) {
  const target = event.target
  const link = target.dataset.link
  if(link == null) return
  const scrollTo = document.querySelector(link)
  scrollTo.scrollIntoView({behavior:"smooth"})
}

// const navbarMenu = document.querySelector('.navbar__menu')
// navbarMenu.addEventListener('click', moveScrollToElement)

const btnContact = document.querySelector('.home__contact')
btnContact.addEventListener('click', moveScrollToElement)

