
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
console.log('Starting');
document.addEventListener("DOMContentLoaded", evt => {
  console.log('loadedDOM')
  // animationManager.init()
})