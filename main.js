'use strict'

const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;
const arrowUp = document.querySelector('.arrow-up')
const navbarMenu = document.querySelector('.navbar__menu')

document.addEventListener('scroll', () => {
  navbarMenu.classList.remove('open')
  if(window.scrollY > navBarHeight) {
    navBar.classList.add('navbar--dark')
    arrowUp.classList.add('visible')
  } else {
    navBar.classList.remove('navbar--dark')
    arrowUp.classList.remove('visible')
  }
})

//Navbar toggle button for mobile

const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open')
})

navbarMenu.addEventListener('click', moveScrollToElement)

const btnContact = document.querySelector('.home__contact')
btnContact.addEventListener('click', moveScrollToElement)

// make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('#home')
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight
})

const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const proejcts = document.querySelectorAll('.project')

workBtnContainer.addEventListener('click', (e) => {
  let filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(!filter) return

  // remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.active')
  active.classList.remove('active')
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode
  target.classList.add('active')
  projectContainer.classList.add('anim-out')
  setTimeout(() => {
    proejcts.forEach(project => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible')
      } else {
        project.classList.add('invisible')
      }
    })
    projectContainer.classList.remove('anim-out')
  }, 300)
})

function moveScrollToElement(event) {
  const target = event.target
  const link = target.dataset.link
  if(link == null) return
  const scrollTo = document.querySelector(link)
  scrollTo.scrollIntoView({behavior:"smooth"})
}