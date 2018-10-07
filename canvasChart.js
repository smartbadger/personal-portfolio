const canvasChart = {


    init: function() {
        const canvas = document.getElementById('canvas')
        this.canvas = canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = canvas.getContext("2d")

        // should be global for other draw line reference
        this.gridLineUnitX = this.getRoundedNumber(this.canvas.width, 12, 5)
        this.gridLineUnitY = this.getRoundedNumber(this.canvas.width, 8, 5)
        this.legendOffSet = this.getRoundedNumber(this.canvas.width, 50, 5)

        this.createGridlinesAndLegend()
        //this.drawLine('#9C6ADE', [2, -1, 3, -1, 5, -2], 1)
        //this.drawLine('#47C1BF', [1, -1, 2, -1, 3, 1], 0)
        this.addHandlers()
    },
    addHandlers: function() {
        window.addEventListener('resize', (evt) => {
            //this.updateCanvas()
            console.log('resize')
        })
    },
    updateCanvas: function() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.gridLineUnitX = this.getRoundedNumber(this.canvas.width, 12, 5)
        this.gridLineUnitY = this.getRoundedNumber(this.canvas.width, 8, 5)
        this.legendOffSet = this.getRoundedNumber(this.canvas.width, 50, 5)

        this.createGridlinesAndLegend()
    },
    getRoundedNumber: function(n, d, c) {
       return Math.ceil(Math.floor(n /d)/c)*c
    },
    createGridlinesAndLegend: function() {
        // setup context
        let ctx = this.canvas.getContext("2d")
        ctx.strokeStyle = "#454F5B"

        //this.createLegend()
        let offSetHeight = this.canvas.height - this.legendOffSet
        // setup initial x and y
        let xLine = 0 
        let yLine = 0

        let unitIncrementX = this.getRoundedNumber(this.gridLineUnitX, 25, 5)
        let unitIncrementY = this.getRoundedNumber(this.gridLineUnitY, 25, 5)

        function draw(x1, y1, x2, y2) {
            ctx.strokeStyle = "#454F5B"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.closePath()
            ctx.stroke()

            console.log( x1, y1)
        }
        // builds the grid lines 
        function animate() {
            xLine = xLine + unitIncrementX
            yLine = yLine + unitIncrementY

            // apply the offest and create grid lines
            for (let  horzLine = offSetHeight;  horzLine >= 0;  horzLine -= this.gridLineUnitX) {
                draw(xLine - unitIncrementX, horzLine, xLine + unitIncrementX, horzLine)
            }
            for (let vertLine = 0;  vertLine < this.canvas.width;  vertLine += this.gridLineUnitY) {
                draw(vertLine, yLine - unitIncrementY, vertLine, yLine + unitIncrementY)
            }
            // recursive animation until req met
            if(xLine <= this.canvas.width && yLine <= this.canvas.height){
                window.requestAnimationFrame(animate)
            }
        }
        window.requestAnimationFrame(animate)
    },
    createLegend: function() {
        this.ctx.rect(0, 0, this.legendOffSet, this.canvas.height)
        this.ctx.rect(0, this.canvas.height - this.legendOffSet, this.canvas.width, this.legendOffSet)
        this.ctx.fillStyle = "#454F5B"
        this.ctx.fill()
    },
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min
    },
    drawLine: function(color, coords, offset) {
        let ctx = this.canvas.getContext("2d")
        ctx.moveTo(0, this.canvas.height)
        ctx.lineTo(this.canvas.width, 0)

        // grid lines and increments
        const gridLineUnitX = Math.ceil(Math.floor(this.canvas.width / 12)/5)*5
        const gridLineUnitY = Math.ceil(Math.floor(this.canvas.height / 8)/5)*5
        const slope = gridLineUnitX / gridLineUnitY

        const unitIncrement = 5
        let unitIncrementY = 5 * slope

        let index = 0
        let xpos = 0 + Math.ceil(Math.floor(this.canvas.width / 50)/5)*5 
        let ypos = this.canvas.height -  Math.floor(this.canvas.width / 50) - (offset * gridLineUnitY)

        //need to start with a next planed set of coordinates to be updated with randoms..
        let targetX = xpos + gridLineUnitY
        // create a pattern
        function draw(x1, y1, x2, y2){
            ctx.strokeStyle = color
            ctx.lineWidth = 5
            ctx.beginPath()
            ctx.lineJoin = 'round'
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.closePath()
            ctx.stroke()
        }
        function animate(){
            // always start with the last value to avoid line breaks
            ypos = ypos - unitIncrementY
            if(xpos == targetX){
                
                index < coords.length - 1 ? ++index : index = 0
                targetX = xpos + gridLineUnitY
                //console.log(coords.length, index)
                unitIncrementY = coords[index] * slope * unitIncrement
                //console.log(unitIncrementY)
            }
            xpos = xpos + unitIncrement
            // this needs to be inverted for positive slope
            draw(xpos - unitIncrement, ypos, xpos, ypos - unitIncrementY)
            if(xpos <= this.canvas.width){
                window.requestAnimationFrame(animate)
            }
        }
        window.requestAnimationFrame(animate)
    }

}
document.addEventListener("DOMContentLoaded", evt => {
    canvasChart.init()
  })