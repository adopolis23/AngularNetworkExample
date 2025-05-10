import { Component } from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';
import { PixelCanvasComponent } from './pixel-canvas/pixel-canvas.component';

@Component({
  selector: 'app-root',
  imports: [PixelCanvasComponent],
  template: `
    <app-pixel-canvas></app-pixel-canvas>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  matrix1: Matrix2D = new Matrix2D(2, 2);
  matrix2: Matrix2D = new Matrix2D(2, 1);
  
  matrix3: Matrix2D = this.matrix1.CrossProduct(this.matrix2);

  constructor() {
    console.log(this.matrix3.Data());
  }

  title = 'default';
}
