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
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home')
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
 


// const sections = document.querySelectorAll('section')

// const callback = (entries, observer) => {
  
//   entries.forEach(entry => {
//     if (entry.intersectionRatio > 0.1) {
//       const previousSection =  document.querySelector('.navbar__menu__item.active')
//       previousSection.classList.remove('active')
//       const selectedSection = document.querySelector(`li[data-link="#${entry.target.id}"]`)
//       selectedSection.classList.add('active')
//     }
//   })
// }

// let observer = new IntersectionObserver(callback);
// sections.forEach(section => observer.observe(section))

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
]

const sections = sectionIds.map(id => document.querySelector(id))
const navItems = sectionIds.map(id => document.querySelector(`li[data-link="${id}"]`))

let selectedNavIndex
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active')
  selectedNavItem = selected
  selectedNavItem.classList.add('active')
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      // entry가 빠져나갈때
      const index = sectionIds.indexOf(`#${entry.target.id}`)

      // 스크롤링이 아래로 되어서 페이지가 올라오면
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1
      } else {
        // 스크롤링이 아래로 되어서 페이지가 내려가면
        selectedNavIndex = index - 1
      }
      
    }
  })
}

const observer = new IntersectionObserver(observerCallback)

sections.forEach(section => observer.observe(section))

// wheel은 사용자가 휠을 직접 동작 시켰을때 발생,
// scroll은 스크롤 자체가 움직이면 무조건 발생
window.addEventListener('wheel', () => {
  if(window.scrollY === 0) {
    selectedNavIndex = 0
  } else if(window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1
  }
  selectNavItem(navItems[selectedNavIndex])
})

function moveScrollToElement(event) {
  const target = event.target
  const link = target.dataset.link
  if(link == null) return
  
  scrollIntoView(link)
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector)
  scrollTo.scrollIntoView({behavior:"smooth"})
  selectNavItem(navItems[sectionIds.indexOf(selector)])
}