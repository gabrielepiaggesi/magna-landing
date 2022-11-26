import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public loading = false;
  public card$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public businessId!: number;
  public lang = 'it';
  public tr!: any;
  public cardClicked = 0;

  public ch = {
    menu: '阅读菜单',
    discount: '获得折扣',
    withCard: '使用数字会员卡',
    wantCard: '你想要这张会员卡吗?',
    downloadApp: '下载 COMEBACK 应用程序',
    enter: '回车, 点击“+”, 输入店铺代码',
    end: '折扣、预订、评论和菜单, 全凭卡! 结尾。',
    ios: '为 iPhone 下载',
    android: '下载安卓版',
    info: '使用 COMEBACK 应用程序获取客户的会员卡。不再丢失纸质徽章。',
    youToo: '您想将 COMEBACK 用于您的业务吗? 写信给我们'
  };

  public it = {
    menu: 'leggi il menù',
    discount: 'Ricevi uno SCONTO di ',
    withCard: 'Con la carta fedeltà digitale di ',
    wantCard: 'Vuoi questa Carta Fedeltà ?',
    downloadApp: "Scarica l'app COMEBACK",
    enter: 'Entra, clicca sul "+", e scrivi il codice locale ',
    end: 'Sconti, Prenotazioni, Recensioni e Menù, tutto con la carta! FINE.',
    ios: 'Scarica per iPhone',
    android: 'Scarica per Android',
    info: "usa l'app COMEBACK per le carte fedeltà dei suoi clienti. Basta tesserine di carta che ti perdi.",
    youToo: 'Vuoi usare comeback per la tua attività? Scrivici'
  };

  constructor(public appService: AppService, public activateRouter: ActivatedRoute) {
    this.businessId = appService.businessId;
    this.lang = navigator.language || 'it';
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
          this.card$.next(card);
          if (card.business_name) document.title = card.business_name + ' - QR';
        })
        .catch((e: any) => alert('Nessuna Carta Fedeltà trovata.'))
        .finally(() => (this.loading = false));
  }

  public clickCard() {
    this.cardClicked = this.cardClicked + 1;
    // window.scrollTo(0, document.body.scrollHeight);
    if (this.cardClicked > 1) {
      let message = "Per avere la Carta Fedeltà, segui le istruzioni scritte sotto. Questo locale usa l'app Comeback per gestire le carte.";
      if (this.lang == 'ch') message = '要获得会员卡, 请按照下面的说明进行操作。该场地使用 Comeback 应用程序来管理他们的卡片。';
      alert(message);
    }
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
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
  
  public open(link: string) {
    window.open(link, 'blank');
  }

  public changeLang(lang: string) {
    if (lang == 'ch') {
      this.lang = 'it';
      this.tr = this.it;
    }
  }

}
