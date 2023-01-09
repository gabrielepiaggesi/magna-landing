import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public businessId: number = 2;
  public redirect = false;

  constructor(public appService: AppService, public router: Router) {
    this.redirect = true;
    window.location.href.includes('?') && this.autoValidate(window.location.href);
  }

  ngOnInit(): void {
  }

  public autoValidate(businessUrl: string) {
    try {
      var search = new URL(businessUrl).search.substring(1);
      const qrObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      console.log(qrObj);
      if (!qrObj.businessId) return;
      if (isNaN(qrObj.businessId)) return;
      
      console.log(this.appService.businessId, +qrObj.businessId);
      
      const businessId = this.appService.businessId || +qrObj.businessId;
      this.appService.businessId = businessId;
      if (qrObj.go && qrObj.go == 'landing' && businessId) {
        this.redirect = true;
        console.log('redirect landing');
        // this.router.navigateByUrl('business/'+businessId, {replaceUrl: true});
        if (businessId == 7) {
          this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        } else if (businessId == 11 || businessId == 10 || businessId == 4) {
          this.router.navigateByUrl('qr/'+businessId, {replaceUrl: true});
        } else {
          this.router.navigateByUrl('business/'+businessId, {replaceUrl: true});
        }
      } else if (businessId) {
        this.redirect = true;
        console.log('redirect business');
        // this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        if (businessId == 7) {
          this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});
        } else if (businessId == 11 || businessId == 10 || businessId == 4) {
          this.router.navigateByUrl('winner/'+businessId, {replaceUrl: true});
        } else {
          this.router.navigateByUrl('landing/'+businessId, {replaceUrl: true});
        }
      } else {
        this.redirect = false;
        console.log('no redirect');
      }
    } catch(e) {
      this.redirect = false;
      console.log(e);
    }
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
