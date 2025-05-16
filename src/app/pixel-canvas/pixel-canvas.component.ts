import { Component, ElementRef, ViewChild } from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';
import { FullyConnectedNetwork } from 'src/data/FullyConnectedNetwork';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-pixel-canvas',
  imports: [],
  template: `
    <canvas #canvas width="100" height="100"></canvas>
  `,
  styles: ``
})
export class PixelCanvasComponent {
  @ViewChild('canvas', { static: true }) pixelCanvas!: ElementRef<HTMLCanvasElement>;
  network: FullyConnectedNetwork;
  virtualHeight: number;
  virtualWidth: number;

  constructor()
  {
    this.network = new FullyConnectedNetwork(2, 1, 1);
  
    this.virtualHeight = 10;
    this.virtualWidth = 10;
  }

  ngOnInit(): void {
    //this.network.PrintToConsole();
    this.drawCanvas();
  }

  drawCanvas(): void {
    const canvas = this.pixelCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const realHeight = canvas.width;
    const realWidth = canvas.height;

    const blockSize: number = realHeight / this.virtualHeight;

    if (!ctx) return;

    for (let x = 0; x < realWidth-blockSize; x += blockSize) {
      for (let y = 0; y < realHeight-blockSize; y += blockSize) {
        
        const inputArray: number[][] = [
          [x], // First row with one column
          [y]  // Second row with one column
        ];

        let input: Matrix2D = Matrix2D.FromArray(inputArray);

        let pred = this.network.Predict(input);
        let singleOutput = pred.Data()[0][0];

        const red = singleOutput * 255;
        const green = singleOutput * 255;
        const blue = singleOutput * 255;

        let color = `rgb(${red}, ${green}, ${blue})`;

        //console.log("For Coords: " + x + "," + y + " pred: " + singleOutput + " Color: " + color);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }

  }

}
