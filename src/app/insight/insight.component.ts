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
  public cardsByBusiness$: BehaviorSubject<{business_id: number, total: number, cards: any[], cardsActive: number, today: number, activeFrom?: number}[]> = new BehaviorSubject<{business_id: number, total: number, cards: any[], cardsActive: number, today: number, activeFrom?: number}[]>([]);
  public todayUsers$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservations$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservationsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviews$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviewsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public mpData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  public periodData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public monthData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public weekData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public dayData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public yesterdayData$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    // this.generalData();
    this.getDayData();
    this.getDayData(1);
    this.getWeekData();
    this.getMonthData();
    this.getPeriodData();
    this.generalData();
  }

  public getPeriodData() {
    this.loading = true;
    this.appService.getPeriodData()
    .then((response: any) => this.periodData$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public getMonthData(amountToSubstract = 0) {
    this.loading = true;
    this.appService.getMonthData({amountToSubstract})
    .then((response: any) => this.monthData$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public getWeekData(amountToSubstract = 0) {
    this.loading = true;
    this.appService.getWeekData({amountToSubstract})
    .then((response: any) => this.weekData$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public getDayData(amountToSubstract = 0) {
    this.loading = true;
    this.appService.getDayData({amountToSubstract})
    .then((response: any) => !amountToSubstract ? this.dayData$.next(response) : this.yesterdayData$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public generalData() {
    this.loading = true;
    this.appService.getGeneralData()
    .then((response: any) => {
      this.users$.next(response.totalUsers);
      const cardsData = response.totalFidelitiesCards;
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

      this.todayUsers$.next(response.todayUsers);
      this.reservations$.next(response.totalReservations - 16);
      this.reservationsToday$.next(response.totalReservationsToday);
      this.reviews$.next(response.totalReviews - 3);
      this.reviewsToday$.next(response.totalReviewsToday);
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
    return this.getPerc(d, v);
  }

  getPerc(d: number, v: number): number {
    const perc = (d * 100) / v;
    return perc ? +perc.toFixed(0) : 0;
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
