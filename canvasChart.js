const canvasChart = {
    init: function() {
        const canvas = document.getElementById('canvas');
        this.canvas = canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = canvas.getContext("2d");

        this.createGridlines();
        this.drawLine();
        this.addHandlers();
    },
    addHandlers: function() {
        window.addEventListener('resize', (evt) => {
            this.updateCanvas()
        });
    },
    updateCanvas: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gridOffset = this.canvas.width / 50;
        this.createGridlines()
    },
    createGridlines: function() {
        // setup context
        let ctx = this.canvas.getContext("2d")
        ctx.strokeStyle = "#454F5B";

        // should be global for other draw line reference
        let gridLineUnitX = this.canvas.width / 12;
        let gridLineUnitY = this.canvas.height / 8;

        let unitIncrementX = this.canvas.width / 25;
        let unitIncrementY = this.canvas.height / 25;

       
        this.createLegend()
        this.gridOffset = this.canvas.width / 50;
        

        let xLine = 0; 
        let yLine = 0;
        let offSetHeight = this.canvas.height - this.gridOffset

        let offSetWidth = this.gridOffset || 0
        function draw(x1, y1, x2, y2) {
            ctx.strokeStyle = "#454F5B";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        }
        function animate() {
            xLine = xLine + unitIncrementX
            yLine = yLine + unitIncrementY
            // apply the offest and create grid lines
            for (let  horzLine = offSetHeight;  horzLine >= 0;  horzLine -= gridLineUnitX) {
                draw(xLine - unitIncrementX, horzLine, xLine + unitIncrementX, horzLine)
            }
            for (let vertLine = offSetWidth;  vertLine < this.canvas.width;  vertLine += gridLineUnitY) {
                draw(vertLine, yLine - unitIncrementY, vertLine, yLine + unitIncrementY)
            }
            // recursive animation until req met
            if(xLine <= this.canvas.width && yLine <= this.canvas.height){
                window.requestAnimationFrame(animate)
            }
        }
        window.requestAnimationFrame(animate)
    },
    createLegend: function(ctx) {
        let width = this.canvas.width / 50;
        this.ctx.rect(0, 0, width, this.canvas.height);
        this.ctx.rect(0, this.canvas.height - width, this.canvas.width, width);
        this.ctx.fillStyle = "#454F5B";
        this.ctx.fill();

    },
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    drawLine: function() {
        let ctx = this.canvas.getContext("2d")

        ctx.moveTo(0, this.canvas.height);
        ctx.lineTo(this.canvas.width, 0);

        // grid lines and increments
        const gridLineUnitX = Math.ceil(Math.floor(this.canvas.width / 12)/5)*5;
        const gridLineUnitY = Math.ceil(Math.floor(this.canvas.height / 8)/5)*5;
        const slope = gridLineUnitX / gridLineUnitY

        const unitIncrement = 5
        let unitIncrementY = 5 * slope

        let index = 0
        let xpos = 0 + Math.ceil(Math.floor(this.canvas.width / 50)/5)*5
        let ypos = this.canvas.height -  Math.floor(this.canvas.width / 50);

        //need to start with a next planed set of coordinates to be updated with randoms..
        let targetX = xpos + gridLineUnitY
        // create a pattern
        let lineYCoords = [2, -1, 3, -1, 4, -2]
        function draw(x1, y1, x2, y2){
            ctx.strokeStyle = "#9C6ADE";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        }
        function animate(){
            // always start with the last value to avoid line breaks
            ypos = ypos - unitIncrementY
            if(xpos == targetX){
                
                index < lineYCoords.length - 1 ? ++index : index = 0
                targetX = xpos + gridLineUnitY
                console.log(lineYCoords.length, index)
                unitIncrementY = lineYCoords[index] * slope * unitIncrement
                console.log(unitIncrementY)
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