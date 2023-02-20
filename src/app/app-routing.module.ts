import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business/business.component';
import { CardPageComponent } from './card-page/card-page.component';
import { FidelityCardComponent } from './fidelity-card/fidelity-card.component';
import { HomeComponent } from './home/home.component';
import { InsightComponent } from './insight/insight.component';
import { LandingComponent } from './landing/landing.component';
import { LocaleComponent } from './locale/locale.component';
import { MComponent } from './m/m.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuComponent } from './menu/menu.component';
import { QrMenuComponent } from './qr-menu/qr-menu.component';
import { QrComponent } from './qr/qr.component';
import { ReferralComponent } from './referral/referral.component';
import { UserBusinessComponent } from './user-business/user-business.component';
import { WinnerComponent } from './winner/winner.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'business/:businessId',
    component: BusinessComponent
  },
  {
    path: 'locale/:businessId',
    component: LocaleComponent
  },
  {
    path: 'qr/:businessId',
    component: QrComponent
  },
  {
    path: 'm/:businessId/:tableNumber',
    component: MComponent
  },
  {
    path: 'card/:businessId',
    component: CardPageComponent
  },
  {
    path: 'landing/:businessId',
    component: LandingComponent
  },
  {
    path: 'winner/:businessId',
    component: WinnerComponent
  },
  {
    path: 'fidelity-card/:businessId',
    component: FidelityCardComponent
  },
  {
    path: 'referral',
    component: ReferralComponent
  },
  {
    path: 'insight',
    component: InsightComponent
  },
  {
    path: 'menu-list/:businessId',
    component: MenuListComponent
  },
  {
    path: 'menu/:businessId/:menuId',
    component: MenuComponent
  },
  {
    path: 'qr-menu/:businessId',
    component: QrMenuComponent
  },
  {
    path: 'user-business',
    component: UserBusinessComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
