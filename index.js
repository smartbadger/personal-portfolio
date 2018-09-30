
const animationManager = {
    elements: [],
    windowHeight: 0,
    
    init: function() {
        this.buildElements()
        this.startIntervalCounter()
        this.elements = document.getElementsByClassName('js-animation-unit');
        this.windowHeight = window.innerHeight;
        this.addEventHandlers();
    },
    getRandomInt: function(min, max, string = true) {
      min = Math.ceil(min)
      max = Math.floor(max)
      if(string){
        return String(Math.floor(Math.random() * (max - min)) + min)
      }
      return Math.floor(Math.random() * (max - min)) + min
    },
    startIntervalCounter: function() {
      setInterval( () => {
        materialSVG = document.getElementById('material-group')
        materialSVG.classList.toggle('hidden')
      }, 45000)
    },

    addEventHandlers: function() {
        window.addEventListener("scroll", this.checkPos);
        window.addEventListener("resize", this.init)
        document.querySelector("[href='#gold']").addEventListener('click', (e) => {
            e.preventDefault()
            animationManager.scrollTo(document.getElementById("gold"));
        });
      
        
    },
    checkPos: function() {
        console.log(posFromTop - animationManager.windowHeight)
        for( var i = 0; i < animationManager.elements.length; i ++){
            var posFromTop = animationManager.elements[i].getBoundingClientRect().top;
            if(i == 4){
                console.log(posFromTop - animationManager.windowHeight)
            }
            if ( posFromTop - animationManager.windowHeight <= (0 - animationManager.windowHeight/3)) { 
                animationManager.elements[i].classList.add('show')
            }                 
        }
    },
    scrollTo: function (element){
        console.log('scroll')
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop
        });
    },
    makeTimeoutCall(param){
        return function() {
            animationManager.scrollTo(param);
        }
    }
}

const slideManager = {

  currentSlide: document.getElementById('intro'),
  list: [],
  nextSlide: false,

  init: function() {
    this.buildSlider()
    this.startAnimation('animation__fade-in')
  },
  buildSlider: function() {
    document.querySelectorAll('.page-widget__section-wrapper').forEach((element)=> {
      const bindingElement = document.querySelector(`li[data-bind="${element.id}"]`)
      if(bindingElement) { 
        bindingElement.addEventListener('click', this.slideHandler(element, bindingElement))
        element.addEventListener('animationend', this.progresSlide())
        this.list.push(bindingElement)
      }
    })
    
  },
  clearList: function(array){
    for (let i = 0; i < array.length; i++){
      array[i].classList.remove('active')
    }
  },
  slideHandler: function(element, bindingElement) {
    return ( function () {
      slideManager.startAnimation('animation__slide-out')
      slideManager.currentSlide = element
      slideManager.clearList(slideManager.list)
      slideManager.nextSlide = true
      bindingElement.classList.add('active')
    })
  },
  startAnimation: function(animation){
    this.currentSlide.classList.remove('animation__fade-in')
    this.currentSlide.classList.remove('animation__slide-in')
    this.currentSlide.classList.remove('animation__slide-out')
    this.currentSlide.classList.add(animation)
  },
  progresSlide: function() {
    return( function() {
      if(slideManager.nextSlide){
        slideManager.startAnimation('animation__slide-in')
        slideManager.nextSlide = false;
      }
    })
  }
}
console.log('Starting');
document.addEventListener("DOMContentLoaded", evt => {
  console.log('loadedDOM')
  // animationManager.init()
  // slideManager.init()
})