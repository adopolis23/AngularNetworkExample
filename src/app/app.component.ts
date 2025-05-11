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
  title = 'XOR Problem';
}
