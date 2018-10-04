const canvasChart = {
    init: function() {
        const canvas = document.getElementById('canvas');
        this.canvas = canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = canvas.getContext("2d");

        this.createGridlines();
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
        this.createGridlines()
    },
    createGridlines: function() {
        // setup context
        let ctx = this.canvas.getContext("2d")
        ctx.strokeStyle = "#454F5B";

        let gridLineUnitX = window.innerWidth / 12;
        let gridLineUnitY = window.innerHeight / 8;

        let unitIncrementX = window.innerWidth / 25;
        let unitIncrementY = window.innerHeight / 25;

        if (window.innerWidth > 766){
            this.createLegend()
        }

        let xLine = 0; 
        let yLine = 0;

        function draw(x1, y1, x2, y2) {
        
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
            console.log(x1, y1)
            console.log(x2, y2)
        }
        function animate() {
            xLine = xLine + unitIncrementX
            yLine = yLine + unitIncrementY
            for (let  horzLine = 1;  horzLine < window.innerHeight;  horzLine += gridLineUnitX) {
                draw(xLine - unitIncrementX, horzLine, xLine + unitIncrementX, horzLine)
            }
            for (let  vertLine = 1;  vertLine < window.innerWidth;  vertLine += gridLineUnitY) {
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

    },
    animateHanlder: function(ratio) {

    }

}
document.addEventListener("DOMContentLoaded", evt => {
    canvasChart.init()
  })