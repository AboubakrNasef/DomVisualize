import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-html-render',
  templateUrl: './html-render.component.html',
  styleUrl: './html-render.component.css',
})
export class HtmlRenderComponent {
  InnerHTML = input<string>();

  constructor() {
    effect(() => {
      console.log(this.InnerHTML());
    });
  }
}
