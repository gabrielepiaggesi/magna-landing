import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {
  public loading = false;
  public card$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public businessId!: number;
  public lang = 'it';
  public tr!: any;
  public cardClicked = 0;
  public show2Buttons = false;
  public downloading = false;

  public ch = {
    menu: '阅读菜单',
    discount: '获得折扣',
    withCard: '使用数字会员卡',
    wantCard: '...迅速的!',
    downloadApp: '完成并领取',
    downloadApp2: '下载 COMEBACK 应用程序并使用本地代码添加卡',
    enter: '仅剩7个',
    end: '菜单、折扣、预订和评论, 一切尽在会员卡!',
    ios: '拿纸',
    android: '从',
    iosApp: '为 iPhone 下载',
    androidApp: '下载安卓版',
    nDownloadApp: '下载 COMEBACK 应用程序',
    nEnter: '回车, 点击“+”, 输入店铺代码',
    cta: '下载应用程序'
  };

  public it = {
    menu: 'leggi il menù',
    discount: 'uno SCONTO di ',
    withCard: 'Hai vinto la Carta Fedeltà ',
    wantCard: '...veloce!',
    downloadApp: "Completala e ricevi ",
    downloadApp2: `Scarica l'app COMEBACK e prendi la carta con il codice locale `,
    enter: 'Solo 7 rimaste',
    end: 'Menù, Sconti, Prenotazioni e Recensioni, tutto con la carta fedeltà!',
    ios: "Prendi Carta",
    android: 'di',
    iosApp: 'Scarica per iPhone',
    androidApp: 'Scarica per Android',
    nDownloadApp: "Scarica l'app COMEBACK",
    nEnter: 'Entra, clicca sul "+", e scrivi il codice locale ',
    cta: 'Scarica ora'
  };

  constructor(public appService: AppService, public activateRouter: ActivatedRoute, public router: Router) {
    this.businessId = appService.businessId;
    this.lang = navigator.language || 'it';
    // this.lang = 'zh';
    if (this.lang.includes('zh') || this.lang.includes('ch')) {
      this.tr = this.ch;
      this.lang = 'ch';
    } else {
      this.tr = this.it;
      this.lang = 'it';
    }
    this.activateRouter.params.subscribe(
      (params) => {
        this.businessId = this.businessId || +params['businessId'];
        this.init();
      }
    );
  }

  ngOnInit(): void {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('QR Page Win');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('business_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).gtag('event', 'start_page');
    } catch(e) {
      console.log(e);
    }
  }

  init() {
    this.loading = true;
      this.appService
        .getBusinessInfo(this.businessId)
        .then((card: any) => {
          card.card_description = null;
          card.discount_countdown = card.business_expenses_amount - 3;
          card.user_expenses_amount = card.business_expenses_amount;
          if (card?.discount_type == 'PERC' && this.lang == 'it') {
            this.tr.discount = 'uno SCONTO del ';
          }
          this.card$.next(card);
          if (card.business_name) document.title = card.business_name + ' - QR';
          this.appService.business = card;
          try {
            !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).gtag('event', card.business_name.trim());
          } catch(e) {
            console.log(e);
          }
        })
        .catch((e: any) => alert('Nessuna Carta Fedeltà trovata.'))
        .finally(() => (this.loading = false));
  }

  public clickCard() {
    // this.cardClicked = this.cardClicked + 1;
    // let cta = !!this.downloading ? this.tr.cta : this.tr.ios;

    // let message = `Clicca su '${cta}', scarica l'app, entra e aggiungi la carta!`;
    // if (this.lang == 'ch') message = '点击“获取卡”, 下载应用程序, 输入并添加卡!';
    // alert(message);
    // try {
    //   !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Click Card Win');
    // } catch(e) {
    //   console.log(e);
    // }
    this.download();
  }

  public ios() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Download App Win');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('download_app_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).hj('event', 'download_app');
    } catch(e) {
      console.log(e);
    }
    this.downloading = true;
    window.open('https://apps.apple.com/it/app/comeback-sconti-e-carte/id6443738691', '_system');
  }

  public mail() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Click Mail Win');
    } catch(e) {
      console.log(e);
    }
    window.open('mailto:comebackwebapp@gmail.com?subject=VOGLIO%20COMEBACK%20%2F%20ASSISTENZA', 'blank');
  }

  public app() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Download App Win');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('download_app_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).hj('event', 'download_app');
    } catch(e) {
      console.log(e);
    }
    try {
      this.downloading = true;
      window.open('market://details?id=com.comeback.card', '_system');
    } catch(e) {
      this.downloading = true;
      window.open('https://play.google.com/store/apps/details?id=com.comeback.card&gl=IT', '_system');
    }
  }
  
  public open(link: string) {
    window.open(link, 'blank');
  }

  public changeLang(lang: string) {
    if (lang == 'ch') {
      this.lang = 'it';
      this.tr = this.it;
    }
  }

  public menu(link: string) {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Menu Win');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).gtag('event', 'menu');
    } catch(e) {
      console.log(e);
    }
    const a = document.createElement('a') as HTMLAnchorElement;
    a.href = link;
    a.target = '_blank';
    a.click();
  }

  public fidelityCard() {
    this.router.navigateByUrl('fidelity-card/'+this.businessId);
  }

  public huaweiXiaomi() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Download App');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('download_app_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).hj('event', 'download_app');
    } catch(e) {
      console.log(e);
    }
    window.open('https://play.google.com/store/apps/details?id=com.comeback.card&gl=IT', '_system');
  }

  download() {

    const itMsg = "La nostra Carta funziona con l'app Comeback, cosi è sempre con te. Aggiungi la carta con l'app, ci vuole un secondo.";
    const chMsg = "我们的卡片可与 Comeback 应用程序配合使用，因此它始终与您同在。使用应用程序添加卡片，只需一秒钟。";
    if (this.businessId == 11) {
      alert(this.lang == 'ch' ? chMsg : itMsg);
    }

    let userAgent = navigator.userAgent || navigator.vendor || (window as any)['opera'];
    console.log(userAgent);
    // Windows Phone must come first because its UA also contains "Android"
    if (/huawei/i.test(userAgent) || /HUAWEI/i.test(userAgent) || /xiaomi/i.test(userAgent) || /XIAOMI/i.test(userAgent) || userAgent.indexOf(" Mi ") != -1) {
      this.huaweiXiaomi();
    } else if (/android/i.test(userAgent)) {
        this.app();
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
        this.ios();
    } else {
      this.show2Buttons = true;
    }
  }
}
