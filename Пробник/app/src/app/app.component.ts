import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { WSService } from '@cikrf/gas-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public title = 'shell';

  public constructor(private renderer: Renderer2, private wsService: WSService) {
    this.wsService.init();
  }

  public ngAfterViewInit(): void {
    const loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
