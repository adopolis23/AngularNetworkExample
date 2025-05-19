import { Component, ElementRef, ViewChild } from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';
import { FullyConnectedNetwork } from 'src/data/FullyConnectedNetwork';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-pixel-canvas',
  imports: [],
  standalone: true,
  templateUrl: './pixel-canvas.component.html',
  styles: ``
})
export class PixelCanvasComponent {
  @ViewChild('canvas', { static: true }) pixelCanvas!: ElementRef<HTMLCanvasElement>;
  network: FullyConnectedNetwork;
  virtualHeight: number;
  virtualWidth: number;
  AnimationFrameId: number;

  constructor()
  {
    this.network = new FullyConnectedNetwork(2, 25, 1);
  
    this.virtualHeight = 10;
    this.virtualWidth = 10;

    this.AnimationFrameId = 0;
  }

  async ngOnInit(): Promise<void> {
    let x: number = 0;

    const animate = () => {
      this.drawCanvas();
      this.trainNetwork();

      if (x % 100 === 0) {
        console.log("Epoch number: " + x);
      }

      x++;
      if (x < 1000) {
        this.AnimationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation
    this.AnimationFrameId = requestAnimationFrame(animate);
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

  drawCanvas(): void 
  {
    //TODO: could probably optimize by not getting the canvas and context every frame
    const canvas = this.pixelCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const realHeight = canvas.width;
    const realWidth = canvas.height;

    const blockSize: number = this.virtualHeight;


    for (let x = 0; x <= 1.0; x += 0.1)
    {
      for (let y = 0; y <= 1.0; y += 0.1)
      {

        const inputArray: number[][] = [
          [x],
          [y]
        ];

        let input: Matrix2D = Matrix2D.FromArray(inputArray);

        let pred = this.network.Predict(input);
        let singleOutput = pred.Data()[0][0];

        const red = singleOutput * 255;
        const green = singleOutput * 255;
        const blue = singleOutput * 255;

        let color = `rgb(${red}, ${green}, ${blue})`;

        ctx.fillStyle = color;
        ctx.fillRect(x * (realWidth - blockSize), y * (realHeight - blockSize), blockSize, blockSize);

      }
    }

  }

  //delays the current thread? for ms milliseconds
  delay(ms: number): Promise<void>
  {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }

  ResetNetwork() {
    cancelAnimationFrame(this.AnimationFrameId); // Stop the existing animation
    
    this.network = new FullyConnectedNetwork(2, 25, 1);
    this.AnimationFrameId = 0;

    this.ngOnInit();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.AnimationFrameId);
  }

}
