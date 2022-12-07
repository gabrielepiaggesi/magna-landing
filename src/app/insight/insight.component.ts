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
  public cardsByBusiness$: BehaviorSubject<{business_id: number, total: number, cards: any[], today: number}[]> = new BehaviorSubject<{business_id: number, total: number, cards: any[], today: number}[]>([]);
  public todayUsers$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservations$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reservationsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviews$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public reviewsToday$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.loading = true;
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
        let newC = {
          ...carB,
          today: 0
        };
        newC.today = carB.cards.filter((card: any) => card.created_at && card.created_at.startsWith(today)).length;
        return newC;
      });
      let newTodayCards = [];
      let scannedTodayCards = [];
      let allCards: any[] = [];
      cardsByBusiness.forEach((elem: any) => {
        allCards = allCards.concat(elem.cards);
      });
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

  public getCardsOnUsers() {
    const users = this.users$.getValue();
    const cards = this.cards$.getValue();
    const res = (cards / users);
    return isNaN(res) ? 0 : res.toFixed(2);
  }
}
