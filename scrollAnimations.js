const animationManager = {
    elements: [],
    windowHeight: 0,

    init: function() {
        this.elements = document.getElementsByClassName('animation');
        this.windowHeight = window.innerHeight;
        this.addEventHandlers();
    },
    addEventHandlers: function() {
        // clear first 
        window.removeEventListener("scroll", this.checkPos)
        window.removeEventListener("resize", this.init)
        // reapply
        window.addEventListener("scroll", this.checkPos)
        window.addEventListener("resize", this.init)
    },
    checkPos: function() {
        console.log(posFromTop - animationManager.windowHeight)
        for( var i = 0; i < animationManager.elements.length; i ++){
            var posFromTop = animationManager.elements[i].getBoundingClientRect().top;
            if ( posFromTop - animationManager.windowHeight <= (0 - animationManager.windowHeight/3)) { 
                animationManager.elements[i].classList.add('active')
            } else {
                animationManager.elements[i].classList.remove('active')
            }        
        }
    }
}
document.addEventListener("DOMContentLoaded", evt => {
  animationManager.init()
})