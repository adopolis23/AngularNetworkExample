import { Component } from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';
import { PixelCanvasComponent } from './pixel-canvas/pixel-canvas.component';
import { FullyConnectedNetwork } from 'src/data/FullyConnectedNetwork';

@Component({
  selector: 'app-root',
  imports: [PixelCanvasComponent],
  template: `
    <app-pixel-canvas></app-pixel-canvas>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  fcn: FullyConnectedNetwork;

  constructor() {
    this.fcn = new FullyConnectedNetwork(2, 1, 1);

    let input: Matrix2D = new Matrix2D(2, 1);

    let output = this.fcn.Predict(input);

    console.log(output.Data());
  }

  title = 'default';
}
