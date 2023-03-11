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
    window.location.href.includes('?') && this.autoValidate(window.location.href);
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

      if (window.location.href.includes('.web.app')) {
        window.open('https://comebackapp.it/?businessId=' + businessId)
        // window.location.href = 'https://comebackapp.it/?businessId=' + businessId;
      }

      this.appService.businessId = businessId;
      if (qrObj.go && qrObj.go == 'landing' && businessId) {
        console.log('redirect landing');
        // this.router.navigateByUrl('business/'+businessId, {replaceUrl: true});

        if ([11, 4].includes(businessId)) {
          this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});
        } else {
          if (businessId != 7) {
            this.router.navigateByUrl('qr/'+businessId, {replaceUrl: true});
          } else {
            this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
          }
        }

        // if (businessId == 7) {
        //   this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        // } else if (businessId == 11 || businessId == 10 || businessId == 4 || businessId == 9 || businessId == 8 || businessId == 6 || businessId == 3) {
        //   this.router.navigateByUrl('qr/'+businessId, {replaceUrl: true});
        // } else {
        //   this.router.navigateByUrl('business/'+businessId, {replaceUrl: true});
        // }
      } else if (businessId) {
        console.log('redirect business');
        // this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        // if (businessId == 7) {
        //   this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});
        // } else if (businessId == 11 || businessId == 10 || businessId == 4 || businessId == 9 || businessId == 8 || businessId == 6 || businessId == 3) {
        //   this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});
        // } else {
        //   this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        // }

        this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});

      } else {
        console.log('no redirect');
      }
    } catch(e) {
      console.log(e);
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
      console.log(e);
    }
  }
}
