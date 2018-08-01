
const animationManager = {

    init: function() {
        this.buildElements()
        this.startIntervalCounter()
    },
    getRandomInt: function(min, max, string = true) {
      min = Math.ceil(min)
      max = Math.floor(max)
      if(string){
        return String(Math.floor(Math.random() * (max - min)) + min)
      }
      return Math.floor(Math.random() * (max - min)) + min
    },

    buildElements: function() {
       const sparkElements = document.querySelectorAll('.spark__item')
       const weldElements = document.querySelectorAll('.weld__container')

       sparkElements.forEach((spark, index) => {

        // create weld item first
        let sibling = weldElements[index]
        let baseAnimationDelay = animationManager.getRandomInt(1,15)
        let weld = document.createElement('div')
        weld.classList = "weld__item"
        weld.style.animationDelay = String(baseAnimationDelay) + "s"
        sibling.appendChild(weld)

        // sparks start here
        sparkCount = 25
        for( var i = 0; i <=sparkCount; i++){
            sparkDiv = animationManager.generateSpark(baseAnimationDelay)
            spark.appendChild(sparkDiv)
        }
       })
    },
    generateSpark: function(delay) {
        let sparkDiv = document.createElement('div')
        // set standard properties
        sparkDiv.classList = 'particle'
        sparkDiv.style.top = animationManager.getRandomInt(25,35) + "px"
        sparkDiv.style.left =  animationManager.getRandomInt(0,5) + "px"
        sparkDiv.style.width = animationManager.getRandomInt(1,2) + "px"
        sparkDiv.style.height = animationManager.getRandomInt(4,7) + "px"
        // make some uniqness
        if(animationManager.getRandomInt(1,3) == 2){
          sparkDiv.classList = sparkDiv.classList + " particle__negative--X"
        } else {
          sparkDiv.classList = sparkDiv.classList + " particle__positive--X"
        }
        //create a base delay
        let combinedDelay = (animationManager.getRandomInt(0,9)/10) + parseFloat(delay)
        sparkDiv.style.animationDelay = String(combinedDelay) + "s" 
        return sparkDiv   
    },
    startIntervalCounter: function() {
      setInterval( () => {
        materialSVG = document.getElementById('material-group')
        materialSVG.classList.toggle('hidden')
      }, 45000)
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
document.addEventListener("DOMContentLoaded", evt => {
  animationManager.init()
  slideManager.init()
})

