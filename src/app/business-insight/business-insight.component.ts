import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-business-insight',
  templateUrl: './business-insight.component.html',
  styleUrls: ['./business-insight.component.scss']
})
export class BusinessInsightComponent implements OnInit {
  public businessId!: number;
  public loading = false;
  public currentHourNotValid = false;
  public currentUserNotValid = false;
  public data$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(public activateRouter: ActivatedRoute, private appService: AppService) {
    this.activateRouter.params.subscribe(
      (params) => {
        this.businessId = this.businessId || +params['businessId'];
      }
    );
  }

  ngOnInit(): void {
    this.businessId && this.getInsight();
  }

  private getInsight() {
    this.loading = true;
    this.appService.getInsightForBusiness(this.businessId)
    .then((response: any) => {
      this.currentHourNotValid = response.currentHourNotValid;
      this.currentUserNotValid = response.currentUserNotValid;
      this.data$.next(response);
    })
    .catch((e: any) => console.error(e))
    .finally(() => this.loading = false);
  }

}
