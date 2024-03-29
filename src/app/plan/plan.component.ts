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
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public activateRouter: ActivatedRoute, private appService: AppService) {
    this.activateRouter.params.subscribe(
      (params) => {
        this.businessId = this.businessId || +params['businessId'];
      }
    );
  }

  ngOnInit(): void {
    this.data$.subscribe((data) => {
      const user = this.user$.getValue();
      const business = data;
      this.mustPay = business.should_pay || business.must_pay;
      let link = '';
      if (this.mustPay) {
        const prefilledEmail = user.email;
        const clientReferenceId = user.id + '_' + business.id;
        link = (business.stripe_payment_url || 'https://buy.stripe.com/dR618bbT3bfTbYIaEE') + `?prefilled_email=${prefilledEmail}&client_reference_id=${clientReferenceId}`;
        // window.open(stripeUrl, 'blank');
      } else {
        link = business.stripe_dashboard_url || 'https://billing.stripe.com/p/login/4gwbJvb4E6zt8Te5kk';
        // window.open(stripeDashboardUrl || 'https://billing.stripe.com/p/login/4gwbJvb4E6zt8Te5kk', 'blank');
      }

      if (business) {
        const a = document.createElement('a');
        a.href = link;
        a.click();
      }
    });
    this.getLoggedUser();
  }

  public getLoggedUser() {
    this.loading = true;
    this.appService.getLoggedUser()
    .then((response: any) => {
      this.user$.next(response);
      this.getBusinessInfo();
    })
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

  public getBusinessInfo() {
    this.loading = true;
    this.appService.getBusinessInfo(this.businessId)
    .then((response: any) => this.data$.next(response))
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }
}
