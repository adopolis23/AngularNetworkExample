import {Component} from '@angular/core';
import { Matrix2D } from 'src/data/Matrix';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <h1>Default</h1>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  matrix: Matrix2D = new Matrix2D(2, 2);
  
  constructor() {
    console.log(this.matrix.Data());
  }

  title = 'default';
}
