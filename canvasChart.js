const canvasChart = {
    init: function() {
        this.addHandlers();
        this.buildCanvas();
    },
    addHandlers: function() {
        window.addEventListener('resize', (evt) => {
            this.updateCanvas()
        });
    },
    buildCanvas: function() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createGridlines();
    },
    updateCanvas: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createGridlines()
    },
    createGridlines: function() {
        let ctx = this.canvas.getContext("2d");
        if (window.innerWidth > 766){
            this.createLegend(ctx)
        }
        let unitX = window.innerWidth / 12;
        let unitY = window.innerHeight / 8;
        ctx.strokeStyle = "#454F5B";
        for (let x = 1; x < window.innerWidth; x += unitX) {

            ctx.beginPath();
            ctx.setLineDash([5, 15]);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, window.innerHeight);
            ctx.stroke();
        }

        for (let y = 1; y < window.innerHeight; y += unitY) {
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(0, y);
            ctx.lineTo(window.innerWidth, y);
            ctx.stroke();

        }
    },
    createLegend: function(ctx) {
        let width = window.innerWidth / 50;
        ctx.rect(0, 0, width, window.innerHeight);
        ctx.rect(0, window.innerHeight - width, window.innerWidth, width);
        ctx.fillStyle = "#454F5B";
        ctx.fill();
    },
    drawLine: function() {

    },
    animateHanlder: function(ratio) {

    }

}
document.addEventListener("DOMContentLoaded", evt => {
    canvasChart.init()
  })