import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  public loading = false;
  public card$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public businessId!: number;
  public lang = 'it';
  public tr!: any;
  public cardClicked = 0;
  public show2Buttons = false;

  public ch = {
    menu: '阅读菜单',
    discount: '获得折扣',
    withCard: '使用数字会员卡',
    wantCard: '你想要这张会员卡吗?',
    downloadApp: '下载 COMEBACK 应用程序',
    downloadApp2: '下载COMEBACK app, 进入, 点击“+”, 输入本地代码',
    enter: '回车, 点击“+”, 输入店铺代码',
    end: '菜单、折扣、预订和评论, 一切尽在会员卡!',
    ios: '下载应用程序',
    android: '下载安卓版',
    iphone: '为 iPhone 下载',
    info: '使用 COMEBACK 应用程序获取客户的会员卡。不再丢失纸质徽章。',
    youToo: '您想将 COMEBACK 用于您的业务吗? 写信给我们',
    onlyWithCard: '仅使用我们的数字会员卡。'
  };

  public it = {
    menu: 'SCOPRI IL NOSTRO MENU',
    discount: 'Ricevi uno SCONTO di ',
    withCard: 'Con la carta fedeltà digitale di ',
    wantCard: 'Vuoi la nostra Carta Fedeltà ?',
    downloadApp: "Scarica l'app COMEBACK",
    downloadApp2: `Scarica l'app COMEBACK, entra, clicca sul "+" e scrivi il codice locale `,
    enter: 'Entra, clicca sul "+", e scrivi il codice locale ',
    end: 'Menù, Sconti e Prenotazioni, tutto con la nostra carta fedeltà.',
    ios: "Prendi Carta",
    android: 'Scarica per Android',
    iphone: 'Scarica per iPhone',
    info: "usa l'app COMEBACK per le carte fedeltà dei suoi clienti. Basta tesserine di carta che ti perdi.",
    youToo: 'Vuoi usare comeback per la tua attività? Scrivici',
    onlyWithCard: 'Solo con la nostra carta fedeltà digitale.'
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
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('QR Page');
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
          card.discount_countdown = card.business_expenses_amount - 3;
          card.user_expenses_amount = card.business_expenses_amount;
          if (card?.discount_type == 'PERC' && this.lang == 'it') {
            this.tr.discount = 'Ricevi uno SCONTO del ';
          }
          if (this.businessId == 11) {
            card.image_url = '../../assets/laBonoraCocktail.jpg';
            card.discount_amount = 0;
            card.slogan = "Nuova Carta Cliente:";
            this.tr.wantCard = 'La Vuoi?';
            this.tr.end = 'Menù, Sconti e Prenotazioni, tutto con la nostra carta soci.';
          }
          if (this.businessId == 10) {
            card.discount_amount = 0;
            card.slogan = "Nuova Carta Cliente:";
            this.tr.wantCard = 'La Vuoi?';
            this.tr.end = 'Menù, Sconti e Prenotazioni, tutto con la nostra carta soci.';
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
    // if (this.cardClicked >= 0) {
    //   let message = "Per avere la Carta Fedeltà, segui le istruzioni scritte sotto. Questo locale usa l'app Comeback per gestire le carte.";
    //   if (this.lang == 'ch') message = '要获得会员卡, 请按照下面的说明进行操作。该场地使用 Comeback 应用程序来管理他们的卡片。';
    //   alert(message);
    // }
    // window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
    // try {
    //   !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Click Card');
    // } catch(e) {
    //   console.log(e);
    // }
    this.download();
  }

  public ios() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Download App');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('download_app_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).hj('event', 'download_app');
    } catch(e) {
      console.log(e);
    }
    window.open('https://apps.apple.com/it/app/comeback-sconti-e-carte/id6443738691', '_system');
  }

  public mail() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Click Mail');
    } catch(e) {
      console.log(e);
    }
    window.open('mailto:comebackwebapp@gmail.com?subject=VOGLIO%20COMEBACK%20%2F%20ASSISTENZA', 'blank');
  }

  public app() {
    try {
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Download App');
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('download_app_'+this.businessId);
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).hj('event', 'download_app');
    } catch(e) {
      console.log(e);
    }
    // window.open('https://play.google.com/store/apps/details?id=com.comeback.card&gl=IT', '_system');
    window.open('market://details?id=com.comeback.card', '_system');
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
      !window.location.href.includes('web') && !window.location.href.includes('4200') && (window as any).mixpanel.track('Menu');
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
