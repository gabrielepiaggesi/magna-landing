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
  public businesses$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
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
      this.appService.getTotalBusinesses(),
      this.appService.getTotalReservations(),
      this.appService.getTotalReservationsToday(),
      this.appService.getTotalReviews(),
      this.appService.getTotalReviewsToday(),
    ])
    .then((response: any) => {
      this.users$.next(response[0] - 24);
      this.cards$.next(response[1] - 12);
      this.businesses$.next(response[2] - 1);
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
