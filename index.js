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
        this.spark()
    },

    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return String(Math.floor(Math.random() * (max - min)) + min);
    },

    spark: function() {
       const sparkElements = document.querySelectorAll('.spark')
       sparkElements.forEach(spark => {
        sparkCount = 10
        for( var i = 0; i <=10; i++){
            sparkDiv = sparkGenerator.generateSpark()
            spark.appendChild(sparkDiv)
        }
       })
    },
    generateSpark: function() {
        let sparkDiv = document.createElement('div')
        sparkDiv.classList = 'particle'
        sparkDiv.style.top = sparkGenerator.getRandomInt(10,50) + "px"
        sparkDiv.style.left =  sparkGenerator.getRandomInt(0,100) + "px"
        sparkDiv.style.width = sparkGenerator.getRandomInt(1,2) + "px"
        sparkDiv.style.height = sparkGenerator.getRandomInt(4,7) + "px"
        sparkDiv.style.animationDelay = sparkGenerator.getRandomInt(0,5) + "s" 
        return sparkDiv   
    }
}
document.addEventListener("DOMContentLoaded", evt => {
	sparkGenerator.init()
})

