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
        this.gridOffset = window.innerWidth / 50;
        this.createGridlines()
    },
    createGridlines: function() {
        // setup context
        let ctx = this.canvas.getContext("2d")
        ctx.strokeStyle = "#454F5B";

        // should be global for other draw line reference
        let gridLineUnitX = window.innerWidth / 12;
        let gridLineUnitY = window.innerHeight / 8;

        let unitIncrementX = window.innerWidth / 25;
        let unitIncrementY = window.innerHeight / 25;

        if (window.innerWidth > 766){
            this.createLegend()
            this.gridOffset = window.innerWidth / 50;
        }

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
            if(xLine <= window.innerWidth && yLine <= window.innerHeight){
                window.requestAnimationFrame(animate)
            }
        }
        window.requestAnimationFrame(animate)
    },
    createLegend: function(ctx) {
        let width = window.innerWidth / 50;
        this.ctx.rect(0, 0, width, window.innerHeight);
        this.ctx.rect(0, window.innerHeight - width, window.innerWidth, width);
        this.ctx.fillStyle = "#454F5B";
        this.ctx.fill();

    },
    drawLine: function() {
        let ctx = this.canvas.getContext("2d")

        ctx.moveTo(0, this.canvas.height);
        ctx.lineTo(this.canvas.width, 0);

        const gridLineUnitX = window.innerWidth / 12;
        const gridLineUnitY = window.innerHeight / 8;
        const unitIncrement = window.innerWidth / 300;
        const slope = (window.innerWidth/window.innerHeight);

        let xpos= 0
        let ypos = window.innerHeight 
        // returns the set animation iteration of coords
        function returnCoords(){
            
        }
        function draw(x1, y1, x2, y2){
            ctx.strokeStyle = "#9C6ADE";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
            console.log(x1,x2)
            console.log(y1,y2)
        }
        function animate(){

            // this needs to be dynamic
            // xpos = xpos + unitIncrement
            // ypos = ypos - unitIncrement
            

            // this needs to be inverted for positive slope
            draw(xpos - unitIncrement, ypos, xpos, ypos - unitIncrement)
            if(xpos <= window.innerWidth){
                window.requestAnimationFrame(animate)
            }
        }
        //window.requestAnimationFrame(animate)
    },
    animateHanlder: function(ratio) {

    }

}
document.addEventListener("DOMContentLoaded", evt => {
    canvasChart.init()
  })