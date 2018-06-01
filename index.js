//require('core-js')

// function sparks() {
//    $.each($(".spark"), function(){
//       var confetticount = ($(this).width()/10)*3;
//       for(var i = 0; i <= confetticount; i++) {
//         console.log('append')
//          $(this).append('<span class="particle c1" style="top:' + $.rnd(10,50) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(1,2) + 'px; height:' + $.rnd(4,7) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
//       }
//    });
// }

const sparkGenerator = {

    init: function() {
        this.buildElements()
    },
    getRandomInt: function(min, max, string = true) {
      min = Math.ceil(min);
      max = Math.floor(max);
      if(string){
        return String(Math.floor(Math.random() * (max - min)) + min)
      }
      return Math.floor(Math.random() * (max - min)) + min
    },

    buildElements: function() {
       const sparkElements = document.querySelectorAll('.spark')
       const weldElements = document.querySelectorAll('.weld-container')

       sparkElements.forEach((spark, index) => {

        // create weld item first
        let sibling = weldElements[index]
        console.log(sibling)
        let baseAnimationDelay = sparkGenerator.getRandomInt(1,15)
        let weld = document.createElement('div')
        weld.classList = "weld"
        weld.style.animationDelay = String(baseAnimationDelay) + "s"
        sibling.appendChild(weld)

        // sparks start here
        sparkCount = 25
        for( var i = 0; i <=sparkCount; i++){
            sparkDiv = sparkGenerator.generateSpark(baseAnimationDelay)
            spark.appendChild(sparkDiv)
        }
       })
    },
    generateSpark: function(delay) {
        let sparkDiv = document.createElement('div')
        // set standard properties
        sparkDiv.classList = 'particle'
        sparkDiv.style.top = sparkGenerator.getRandomInt(25,35) + "px"
        sparkDiv.style.left =  sparkGenerator.getRandomInt(0,5) + "px"
        sparkDiv.style.width = sparkGenerator.getRandomInt(1,2) + "px"
        sparkDiv.style.height = sparkGenerator.getRandomInt(4,7) + "px"
        // make some uniqness
        if(sparkGenerator.getRandomInt(1,3) == 2){
          sparkDiv.classList = sparkDiv.classList + " negative-X"
        } else {
          sparkDiv.classList = sparkDiv.classList + " positive-X"
        }
        //create a base delay
        let combinedDelay = (sparkGenerator.getRandomInt(0,9)/10) + parseFloat(delay)
        sparkDiv.style.animationDelay = String(combinedDelay) + "s" 
        return sparkDiv   
    },
    generateWeld: function() {

    }
}
document.addEventListener("DOMContentLoaded", evt => {
	sparkGenerator.init()
})

