import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-qr-menu',
  templateUrl: './qr-menu.component.html',
  styleUrls: ['./qr-menu.component.scss']
})
export class QrMenuComponent implements OnInit {
  public loading = false;
  public loadingMenu = false;
  public businessId!: number;
  public business!: any;
  public menus: any[] = [];
  public menuSelected!: any;
  public menusLoaded: {id: number, menu: any}[] = [];
  public businessEvasor = false;

  constructor(private server: AppService, private route: Router, private param: ActivatedRoute) {
    this.param.params.subscribe(params => {
      this.businessId = params['businessId'];
    });
  }

  async ngOnInit() {
    this.loading = true;
    await this.getBusinessInfo();
    if (this.business.status == 'ACTIVE') {
      await this.getMenus();
    } else {
      this.businessEvasor = true;
    }
    this.loading = false;
  }

  public share() {
    this.route.navigateByUrl('share/' + this.businessId);
  }

  public mail() {
    window.open('mailto:comebackwebapp@gmail.com?subject=VOGLIO%20COMEBACK%20%2F%20ASSISTENZA', 'blank');
  }

  public leaveComment() {
    this.route.navigateByUrl('comment/' + this.businessId);
  }

  public async getBusinessInfo() {
    console.log("getRoom");
    this.business = await this.server.getBusinessInfo(this.businessId)
      .then((response: any) => {
        if (response.name) document.title = response.name + ' - Menù';
        return response;
      })
      .catch((error: any) => this.generalError(error));
  }

  public async getMenus() {
    console.log("getRoom");
    this.menus = await this.server.getBusinessMenuList(this.businessId)
      .then((response: any) => {
        if (response && response.length == 1) {
          const menu = response[0];
          const eventTarget = { value: menu.id };
          this.getMenu(eventTarget);
        }
        return response;
      })
      .catch((error: any) => this.generalError(error));
  }

  public async getMenu(eventTarget: any) {
    const menuId = eventTarget.value;
    this.menuSelected = null;
    this.loadingMenu = true;
    console.log("getRoom");

    const menuLoaded = this.menusLoaded.find(m => m.id == menuId);
    if (menuLoaded) {
      this.menuSelected = menuLoaded.menu;
    } else {
      this.menuSelected = await this.server.getBusinessMenu(menuId)
        .then((response: any) => {
          this.menusLoaded.push({id: menuId, menu: response});
          return response;
        })
        .catch((error: any) => this.generalError(error));
    }
    this.loadingMenu = false;
  }

  public generalError(error: any) {
    console.log(error);
    alert('Riprova tra poco');
    this.loading = false;
  }
}
