<template>
    <div class = 'block-canvas'>
        <div class="form">
            <div class="form-item">
                <span>Canvas</span>
                <label>
                    <span>Width</span>
                    <input type="number" v-model="newCanvas.width" placeholder="Enter canvas width">
                </label>
                <label>
                    <span>Height</span>
                    <input type="number" v-model="newCanvas.height" placeholder="Enter canvas height">
                </label>
            </div>

            <div class="form-item">
                <span>Line 1</span>
                <label>
                    <span>From x</span>
                    <input type="number" v-model="newLine.x1" placeholder="Enter line from x">
                </label>
                <label>
                    <span>From y</span>
                    <input type="number" v-model="newLine.y1" placeholder="Enter from to y">
                </label>
                <label>
                    <span>To x</span>
                    <input type="number" v-model="newLine.x2" placeholder="Enter line to x">
                </label>
                <label>
                    <span>To y</span>
                    <input type="number" v-model="newLine.y2" placeholder="Enter line to y">
                </label>
            </div>

            <div class="form-item">
                <span>Line 2</span>
                <label>
                    <span>From x</span>
                    <input type="number" v-model="newLine.x3" placeholder="Enter line from x">
                </label>
                <label>
                    <span>From y</span>
                    <input type="number" v-model="newLine.y3" placeholder="Enter from to y">
                </label>
                <label>
                    <span>To x</span>
                    <input type="number" v-model="newLine.x4" placeholder="Enter line to x">
                </label>
                <label>
                    <span>To y</span>
                    <input type="number" v-model="newLine.y4" placeholder="Enter line to y">
                </label>
            </div>

            <div class="form-item">
                <span>Rectangle</span>
                <label>
                    <span>From x</span>
                    <input type="number" v-model="newRect.x1" placeholder="Enter line from x">
                </label>
                <label>
                    <span>From y</span>
                    <input type="number" v-model="newRect.y1" placeholder="Enter from to y">
                </label>
                <label>
                    <span>To x</span>
                    <input type="number" v-model="newRect.x2" placeholder="Enter line to x">
                </label>
                <label>
                    <span>To y</span>
                    <input type="number" v-model="newRect.y2" placeholder="Enter line to y">
                </label>
            </div>

            <div class="form-item">
                <span>Bucket Fill</span>
                <label>
                    <span>x</span>
                    <input type="number" v-model="fill.x" placeholder="Enter x">
                </label>
                <label>
                    <span>y</span>
                    <input type="number" v-model="fill.y" placeholder="Enter y">
                </label>
                <label>
                    <span>To x</span>
                    <input type="text" v-model="fill.color" placeholder="Enter line to x">
                </label>
            </div>

            <button @click="run">Add</button>
        </div>

        <div class="canvas">

        </div>
    </div>
</template>

<script>
export default {
        data() {
            return {
                newCanvas: {
                    width: null,
                    height: null,
                    context: null,
                    isCanvas: false
                },
                newLine: {
                    x1: null,
                    y1: null,
                    x2: null,
                    y2: null,
                    x3: null,
                    y3: null,
                    x4: null,
                    y4: null
                },
                newRect: {
                    x1: null,
                    y1: null,
                    x2: null,
                    y2: null
                },
                fill: {
                    x: null,
                    y: null,
                    color: null
                },
                isCanvas: false
            }
        },
        methods:{
            createCanvas() {
                const canvasBlock = document.getElementsByClassName('canvas')[0];
                const canvas = document.createElement('table');
                
                for (let i = 0; i < this.newCanvas.height; i++) {
                    let tr = canvas.insertRow();
                    
                    for(let j = 0; j < this.newCanvas.width; j++) {
                        let td = tr.insertCell();
                        td.style.width = '20px';
                        td.style.height = '20px';
                    }
                }
                
                canvas.id = 'canvas';
                canvasBlock.appendChild(canvas);
                this.isCanvas = true;
            },
            drawLine(x1, y1, x2, y2, color) {
                const canvas = document.getElementById('canvas');
                const rows = canvas.rows;
                const w = (x2 - x1) + 1;
                const h = (y2 - y1) + 1;
                let isColumnLine = false;

                if (h == 1) {
                    isColumnLine = false;
                } else {
                    isColumnLine = true;
                }

                for (let i = 0; i < rows.length; i++) {
                    if (h == 1) {
                        if (y1 == i + 1) {
                            for (let j = 0; j < rows[0].cells.length; j++) {
                                if ((j + 1) >= x1 && (j + 1) <= x2) {
                                    rows[i].cells[j].innerText = 'x';
                                }
                            }
                        }
                    } else {
                        if ((i + 1) >= y1 && (i + 1) <= y2) {
                            rows[i].cells[x1 - 1].innerText = 'x';
                        }
                    }
                }
            },
            bucketFill(x , y, color) {
                const rows = document.getElementById('canvas').rows;
                const line = this.newLine;
                const rect = this.newRect;
                const canvas = this.newCanvas;

                for (let i = 0; i < rows.length; i++) {
                    let tr = rows[i].cells;

                    for (let j = 0; j < tr.length; j++) {
                        if (tr[j].innerText != 'x') {
                            if ( (line.x1 == 1 || line.x2 == canvas.width) && (line.y3 == 1 || line.y4 == canvas.height) && ((line.y3 == parseInt(line.y2) + 1) || (line.y4 == parseInt(line.y2) - 1) || (line.y3 == line.y2 || line.y4 == line.y2)) && ((line.x3 <= parseInt(line.x2) + 1 && line.y2 == line.y3) || line.x3 <= line.x2 || line.x3 == parseInt(line.x2) + 1) ) {
                                if (x > line.x3 && y > line.y1) {
                                    if (line.y3 <= i + 1 && line.y4 >= i + 1) {    
                                        if (line.x1 == 1 && j + 1 > line.x3) {
                                            tr[j].innerText = color;
                                        } else if (line.x2 == canvas.width && j + 1 < line.x3) {
                                            tr[j].innerText = color;
                                        }
                                    } else {
                                        tr[j].innerText = color;
                                    }
                                } else {
                                    if (line.y1 < i + 1 && line.x3 > j + 1) {
                                        tr[j].innerText = color;
                                    }
                                }
                            } else {
                                tr[j].innerText = color;
                            }
                        }

                        if (i + 1 > rect.y1 && i + 1 < rect.y2 && j + 1 > rect.x1 && j + 1 < rect.x2) {
                            if (x > rect.x1 && x < rect.x2 && y > rect.y1 && y < rect.y2) {
                                tr[j].innerText = color;
                            } else {
                                tr[j].innerText = '';
                            }
                        }
                    }
                }
            },
            drawRect(x1, y1, x2, y2) {
                const line1 = {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y1
                };

                const line2 = {
                    x1: x1,
                    y1: y2,
                    x2: x2,
                    y2: y2
                };

                const line3 = {
                    x1: x1,
                    y1: parseInt(y1) + 1,
                    x2: x1,
                    y2: parseInt(y2) - 1
                };
                const line4 = {
                    x1: x2,
                    y1: parseInt(y1) + 1,
                    x2: x2,
                    y2: parseInt(y2) - 1
                };

                this.drawLine(line1.x1, line1.y1, line1.x2, line1.y2);
                this.drawLine(line2.x1, line2.y1, line2.x2, line2.y2);
                this.drawLine(line3.x1, line3.y1, line3.x2, line3.y2);
                this.drawLine(line4.x1, line4.y1, line4.x2, line4.y2);
            },
            run() {
                let line = this.newLine;
                let rect = this.newRect;
                let fill = this.fill;
                this.createCanvas();
                this.drawLine(line.x1, line.y1, line.x2, line.y2);

                if (line.x3 && line.y3 && line.x4 && line.y4) {
                    this.drawLine(line.x3, line.y3, line.x4, line.y4);
                }

                if (rect.x1 && rect.y1 && rect.x2 && rect.y2) {
                    this.drawRect(rect.x1, rect.y1, rect.x2, rect.y2);
                }


                if (this.isCanvas) {
                    this.bucketFill(fill.x, fill.y, fill.color);
                }
            }
        }
    }
</script>

<style lang = 'scss'>
    * {
        box-sizing: border-box;
    }

    .block-canvas {
        text-align: center;

        .form {
            display: flex;
            flex-direction: column;
            width: 80%;
            margin: 0 auto;
            padding: 20px;

            &-item {
                margin-bottom: 20px;
            }

            button {
                padding: 10px;
                width: 50px;
                margin: 0 auto;
            }
        }
        
        .canvas {
            margin-top: 50px;
        }

        #canvas {
            position: relative;
            margin: 0 auto;
            border: 1px dashed black;
            line-height: 13px;
            letter-spacing: 12.3px;
            font-size: 16px;
        }
    }
</style>