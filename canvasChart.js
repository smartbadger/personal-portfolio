const canvasChart = {


    init: function() {
        const canvas = document.getElementById('canvas')
        this.canvas = canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = canvas.getContext("2d")

        // should be global for other draw line reference
        this.gridLineUnitX = this.getRoundedNumber(this.canvas.width, 12, 5)
        this.gridLineUnitY = this.getRoundedNumber(this.canvas.width, 12, 5)
        this.legendOffSet = this.getRoundedNumber(this.canvas.width, 50, 5)
        this.slope = this.gridLineUnitX / this.gridLineUnitY

        this.createGridlinesAndLegend()
        this.drawLine('#9C6ADE', [2, -1, 3, -1, 5, -2], 1)
        this.drawLine('#47C1BF', [1, -1, 2, -1, 3, 1], 0)
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
        this.gridLineUnitY = this.getRoundedNumber(this.canvas.width, 12, 5)
        this.legendOffSet = this.getRoundedNumber(this.canvas.width, 4, 5)
        console.log(this.legendOffSet)
        this.slope = this.gridLineUnitX / this.gridLineUnitY

        this.createGridlinesAndLegend()
    },
    getRoundedNumber: function(n, d, c) {
       return Math.ceil(Math.floor(n /d)/c)*c
    },
    createGridlinesAndLegend: function() {
        // setup context
        let ctx = this.canvas.getContext("2d")
        ctx.strokeStyle = "#454F5B"

        this.createLegend()
        const offSetHeight = (() => {
            const yPosWithLegend = this.getRoundedNumber(this.canvas.height, 1, 5)
            const baseY = yPosWithLegend - this.legendOffSet
            return baseY
        })()
        console.log(offSetHeight)
        // setup initial x and y
        let xLine = 0 
        let yLine = 0

        // determines draw speed
        let unitIncrementX = (this.canvas.width / 25)
        let unitIncrementY = (this.canvas.height / 25)
        const draw = (x1, y1, x2, y2) => {
            ctx.strokeStyle = "#454F5B"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.closePath()
            ctx.stroke()
        }
        // builds the grid lines 
        const animate = () => {
            xLine = xLine + unitIncrementX
            yLine = yLine + unitIncrementY

            // apply the offest and create grid lines
            for (let  horzLine = offSetHeight;  horzLine >= 0; horzLine -= this.gridLineUnitY) {
                draw(xLine - unitIncrementX, horzLine, xLine + unitIncrementX, horzLine)
            }
            for (let vertLine = this.legendOffSet;  vertLine < this.canvas.width;  vertLine += this.gridLineUnitX) {
                let y1 = this.canvas.height - (yLine - unitIncrementY)
                let y2 = this.canvas.height - (yLine + unitIncrementY)
                draw(vertLine, y1, vertLine, y2)
            }
            // recursive animation until req met
            if(xLine <= this.canvas.width || yLine <= this.canvas.height){
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
        
        // grid lines and draw speed
        const unitIncrementX = this.getRoundedNumber(this.gridLineUnitX, 5, 5)
        let unitIncrementY = this.getRoundedNumber(this.gridLineUnitY, 5, 5) * this.slope
        // starting locations
        let index = 0
        // round the start of the xpos so it aligns with the set increment
        let xpos = this.getRoundedNumber(this.legendOffSet, 1, unitIncrementX)
        let ypos = (() => {
            const yPosWithLegend = this.getRoundedNumber(this.canvas.height, 1, 5)
            const baseY = yPosWithLegend - this.legendOffSet

            // adjust for y offeset by adding 1 increment otherwise the lines are 1 unit away from the y axis gridline
            const offsetY = (baseY - (this.gridLineUnitY * offset)) + unitIncrementY
            return offsetY
        })()


        //need to start with a next planed set of coordinates to be updated with randoms..
        let targetX = xpos + this.gridLineUnitX
        console.log(targetX, xpos, unitIncrementX, this.gridLineUnitX)
        // create a pattern
        const draw = (x1, y1, x2, y2) => {
            ctx.strokeStyle = color
            ctx.lineWidth = 5
            ctx.beginPath()
            ctx.lineJoin = 'round'
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.closePath()
            ctx.stroke()
        }
        
        const animate = () => {
            // always start with the last value to avoid line breaks
            ypos = ypos - unitIncrementY
            if(xpos >= targetX){
                index < coords.length - 1 ? ++index : index = 0
                targetX = xpos + this.gridLineUnitY
                //console.log(coords.length, index)
                unitIncrementY = coords[index] * this.slope * unitIncrementX
                //console.log(unitIncrementY)
            }
            xpos = xpos + unitIncrementX
            // this needs to be inverted for positive slope
            draw(xpos - unitIncrementX, ypos, xpos, ypos - unitIncrementY)
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