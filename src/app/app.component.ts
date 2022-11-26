import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Comeback APP - Carte Fedeltà, Sconti e Prenotazioni';

  constructor(public appService: AppService, public router: Router) {
    const token = localStorage.getItem('MagnaToken');
    if (!!token) this.appService.setToken(token);
    this.autoValidate(window.location.href);
    this.findToken(window.location.href);
  }

  public autoValidate(businessUrl: string) {
    try {
      var search = new URL(businessUrl).search.substring(1);
      const qrObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      console.log(qrObj);
      if (!qrObj.businessId) return;
      if (isNaN(qrObj.businessId)) return;
      
      const businessId = +qrObj.businessId;
      this.appService.businessId = businessId;
      if (businessId) this.router.navigateByUrl('business/'+businessId);
    } catch(e) {
      console.error(e);
    }
  }

  public findToken(businessUrl: string) {
    try {
      var search = new URL(businessUrl).search.substring(1);
      const qrObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      console.log(qrObj);
      if (!qrObj.token) return;
      this.appService.setToken(qrObj.token);
    } catch(e) {
      console.error(e);
    }
  }
}
