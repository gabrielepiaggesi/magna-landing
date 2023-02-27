import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  public businessId!: number;
  public loading = false;
  public currentHourNotValid = false;
  public currentUserNotValid = false;
  public STRIPE_URL = '';
  public mustPay = false;
  public data$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public activateRouter: ActivatedRoute, private appService: AppService) {
    this.activateRouter.params.subscribe(
      (params) => {
        this.businessId = this.businessId || +params['businessId'];
      }
    );
  }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      this.mustPay = data.must_pay;
      if (this.mustPay) window.open(this.STRIPE_URL);
    });
  }

  public getBusinessInfo() {
    this.loading = true;
    this.appService.getBusinessInfo(this.businessId)
    .then((response: any) => this.data$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }
}
