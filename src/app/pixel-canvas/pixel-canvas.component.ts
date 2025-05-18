import { Component, ElementRef, ViewChild } from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';
import { FullyConnectedNetwork } from 'src/data/FullyConnectedNetwork';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-pixel-canvas',
  imports: [],
  template: `
    <canvas #canvas width="100" height="100" style="border: 1px solid black;"></canvas>
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

  async ngOnInit(): Promise<void> {
    //this.network.PrintToConsole();
    let x: number = 0;
    while (x < 1000)
    {
      this.drawCanvas();
      this.trainNetwork();
      //await this.delay(500);
      
      //this is a test prediction to see in the console if all is working
      let x_0: Matrix2D = Matrix2D.FromArray([[1], [1]]);
      let output: Matrix2D = this.network.Predict(x_0);
      
      if (x % 100 == 0)
      console.log(output.Data()[0][0]);

      x = x + 1;
    }
  }

  trainNetwork(): void
  {
    //set up training data
    let x_0: number[][] = [
      [0],
      [0]
    ];
    let x_0_matrix: Matrix2D = Matrix2D.FromArray(x_0);


    let x_1: number[][] = [
      [0],
      [1]
    ];
    let x_1_matrix: Matrix2D = Matrix2D.FromArray(x_1);

    let x_2: number[][] = [
      [1],
      [0]
    ];
    let x_2_matrix: Matrix2D = Matrix2D.FromArray(x_2);

    let x_3: number[][] = [
      [1],
      [1]
    ];
    let x_3_matrix: Matrix2D = Matrix2D.FromArray(x_3);

    let y_0_matrix: Matrix2D = Matrix2D.FromArray([[0]]);
    let y_1_matrix: Matrix2D = Matrix2D.FromArray([[0]]);
    let y_2_matrix: Matrix2D = Matrix2D.FromArray([[0]]);
    let y_3_matrix: Matrix2D = Matrix2D.FromArray([[1]]);

    this.network.Train(x_0_matrix, y_0_matrix);
    this.network.Train(x_1_matrix, y_1_matrix);
    this.network.Train(x_2_matrix, y_2_matrix);
    this.network.Train(x_3_matrix, y_3_matrix);
  }

  drawCanvas(): void {
    const canvas = this.pixelCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const realHeight = canvas.width;
    const realWidth = canvas.height;

    const blockSize: number = realHeight / this.virtualHeight;

    for (let x = 0; x <= realWidth-blockSize; x += blockSize) {
      for (let y = 0; y <= realHeight-blockSize; y += blockSize) {
        
        const inputArray: number[][] = [
          [x / blockSize], // First row with one column
          [y / blockSize]  // Second row with one column
        ];

        let input: Matrix2D = Matrix2D.FromArray(inputArray);

        let pred = this.network.Predict(input);
        let singleOutput = pred.Data()[0][0];

        const red = singleOutput * 255;
        const green = singleOutput * 255;
        const blue = singleOutput * 255;

        let color = `rgb(${red}, ${green}, ${blue})`;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }

  }

  //delays the current thread? for ms milliseconds
  delay(ms: number): Promise<void>
  {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }

}
