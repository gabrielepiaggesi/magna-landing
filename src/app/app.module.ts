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
    UserBusinessComponent
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
