import { Component, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public title = 'micro tvd application';

  public constructor(private renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    const loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
