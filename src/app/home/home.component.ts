import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>Hello world</p>
  `,
  styles: ``
})
export default  class HomeComponent {

}
