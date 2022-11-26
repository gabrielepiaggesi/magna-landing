import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public businessId: number = 2;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  public ios() {
    window.open('https://apps.apple.com/it/app/comeback-sconti-e-carte/id6443738691', '_system');
  }

  public mail() {
    window.open('mailto:comebackwebapp@gmail.com?subject=VOGLIO%20COMEBACK%20%2F%20ASSISTENZA', 'blank');
  }

  public app() {
    window.open('https://play.google.com/store/apps/details?id=com.comeback.card&gl=IT', '_system');
  }

}
