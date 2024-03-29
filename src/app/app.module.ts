import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReferralComponent } from './referral/referral.component';
import { LandingComponent } from './landing/landing.component';
import { CardComponent } from './card/card.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrMenuComponent } from './qr-menu/qr-menu.component';
import { InsightComponent } from './insight/insight.component';
import { UserBusinessComponent } from './user-business/user-business.component';
import { BusinessComponent } from './business/business.component';
import { FidelityCardComponent } from './fidelity-card/fidelity-card.component';
import { WinnerComponent } from './winner/winner.component';
import { LocaleComponent } from './locale/locale.component';
import { QrComponent } from './qr/qr.component';
import { CardPageComponent } from './card-page/card-page.component';
import { MComponent } from './m/m.component';
import { BusinessInsightComponent } from './business-insight/business-insight.component';
import { PlanComponent } from './plan/plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReferralComponent,
    LandingComponent,
    CardComponent,
    MenuListComponent,
    EditMenuComponent,
    MenuComponent,
    QrMenuComponent,
    InsightComponent,
    UserBusinessComponent,
    BusinessComponent,
    FidelityCardComponent,
    WinnerComponent,
    LocaleComponent,
    QrComponent,
    CardPageComponent,
    MComponent,
    BusinessInsightComponent,
    PlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
