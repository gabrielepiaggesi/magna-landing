import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.scss']
})
export class InsightComponent implements OnInit {
  public loading = false;
  public users$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cards$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public newTodayCards$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public scannedTodayCards$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cardsByBusiness$: BehaviorSubject<{business_id: number, total: number, cards: any[], today: number, activeFrom?: number}[]> = new BehaviorSubject<{business_id: number, total: number, cards: any[], today: number, activeFrom?: number}[]>([]);
  public todayUsers$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservations$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservationsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviews$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviewsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public mpData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
    // this.getMPData();
    Promise.all([
      this.appService.getTotalUsers(),
      this.appService.getTotalFidelitiesCards(),
      this.appService.getTodayUsers(),
      this.appService.getTotalReservations(),
      this.appService.getTotalReservationsToday(),
      this.appService.getTotalReviews(),
      this.appService.getTotalReviewsToday(),
    ])
    .then((response: any) => {
      this.users$.next(response[0]);
      const cardsData = response[1];
      const today = new Date(Date.now()).toISOString().substring(0, 10);

      const totalCards = cardsData.totalCards;
      let cardsByBusiness = cardsData.cardsByBusiness;
      cardsByBusiness = cardsByBusiness.map((carB: any) => {
        let businessesCards = carB.cards.sort((a: any, b: any) => a.id-b.id);
        let activeFrom = businessesCards.length ? businessesCards[0].created_at : null;
        if (activeFrom) {
          const today = new Date(Date.now());
          const activeFromDate = new Date(activeFrom);
          const timeInMilisec = today.getTime() - activeFromDate.getTime();
          const diffInDays = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
          activeFrom = diffInDays;
        }
        let newC = {
          ...carB,
          today: 0,
          activeFrom
        };
        newC.today = carB.cards.filter((card: any) => card.created_at && card.created_at.startsWith(today)).length;
        return newC;
      });
      console.log(cardsByBusiness);
      
      let newTodayCards = [];
      let scannedTodayCards = [];
      let allCards: any[] = [];
      let events: string[] = [];
      cardsByBusiness.forEach((elem: any) => {
        allCards = allCards.concat(elem.cards);
        events.push('business_'+elem.business_id);
        events.push('download_app_'+elem.business_id);
      });
      this.getMPData(events);
      newTodayCards = allCards.filter((card: any) => card.created_at && card.created_at.startsWith(today));
      scannedTodayCards = allCards.filter((card: any) => card.last_scan && card.last_scan.startsWith(today));

      this.cards$.next(totalCards);
      this.cardsByBusiness$.next(cardsByBusiness);
      this.newTodayCards$.next(newTodayCards.length);
      this.scannedTodayCards$.next(scannedTodayCards.length);

      this.todayUsers$.next(response[2]);
      this.reservations$.next(response[3] - 16);
      this.reservationsToday$.next(response[4]);
      this.reviews$.next(response[5] - 3);
      this.reviewsToday$.next(response[6]);
    })
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public getMPData(events: string[]) {
    this.appService
        .getMixPanelData(events)
        .then((res) => this.mpData$.next(res.data?.values))
        .catch((err) =>console.log(err));
  }

  public getBusinessVisits(id: number) {
    const data = this.mpData$.getValue();
    const today = new Date(Date.now()).toISOString().substring(0, 10);
    return data['business_'+id][today];
  }

  public getDownload(id: number) {
    const data = this.mpData$.getValue();
    const today = new Date(Date.now()).toISOString().substring(0, 10);
    return data['download_app_'+id][today];
  }

  public getCR(id: number) {
    const data = this.mpData$.getValue();
    const today = new Date(Date.now()).toISOString().substring(0, 10);
    const v = data['business_'+id][today];
    const d = data['download_app_'+id][today];
    const perc = (d * 100) / v;
    return perc ? perc.toFixed(0) : 0;
  }

  public getCardsOnUsers() {
    const users = this.users$.getValue();
    const cards = this.cards$.getValue();
    const res = (cards / users);
    return isNaN(res) ? 0 : res.toFixed(2);
  }

  public getCardsAvg(total: number, days: number|undefined) {
    const res = days ? (total / days) : 0;
    return isNaN(res) ? 0 : res.toFixed(1);
  }
}
