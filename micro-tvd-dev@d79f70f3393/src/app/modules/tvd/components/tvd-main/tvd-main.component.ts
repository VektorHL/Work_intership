import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tvd-main',
  templateUrl: './tvd-main.component.html',
  styleUrls: ['./tvd-main.component.scss'],
})
export class TvdMainComponent implements OnInit {
  public ngOnInit() {
    console.log('CandidatesMainComponent.ngOnInit');

    setTimeout(() => {
      const topic = window?.EventBus?.getTopic('header');
      topic?.emit('setTitle', 'Территории и участки');
    }, 200);
  }
}
