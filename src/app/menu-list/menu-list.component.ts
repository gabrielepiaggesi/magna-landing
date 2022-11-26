import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  public loading = false;
  public list: any[] = [];
  public businessId!: number;
  public deleteMenu = false;

  constructor(private router: Router, private appService: AppService, public activateRouter: ActivatedRoute) {
    this.activateRouter.params.subscribe(
      (params) => {
        this.businessId = this.businessId || +params['businessId'];
      }
    );
  }

  async ngOnInit() {
    await setTimeout(async () => {
      this.loading = true;
      await this.getMenus();
      this.loading = false;
    }, 500);
  }

  open(m: any, i: any) {
    this.router.navigateByUrl(`menu/${this.businessId}/${m.id}`);
  }

  public async getMenus() {
    console.log("getMenus");
    this.loading = true;
    this.list = await this.appService.getBusinessMenuList(this.businessId)
      .then((response: any) => response)
      .catch((error: any) => this.generalError(error));
  }

  newMenu() {
    const menu = {
      menu_id: null,
      name: null,
      edit: true,
      delete: false
    };
    this.list.push(menu);
  }

  async save(plan: any, i: any) {
    plan.edit = false;
    console.log("save");
    this.loading = true;
    await this.appService.updateMenu(plan, this.businessId, plan.id || 0)
      .then((response) => this.savePlanSuccess(response))
      .catch((error) => this.savePlanError(error));
    this.loading = false;
  }

  cancel(plan: any, i: any) {
    plan.edit = false;
    if (!plan.id) {
      this.list.splice(i, 1);
    }
  }

  async delete(plan: any, i: any) {
    plan.delete = true;
    console.log("delete");
    this.loading = true;
    await this.appService.updateMenu(plan, this.businessId, plan.id || 0)
      .then((response) => this.savePlanSuccess(response))
      .catch((error) => this.savePlanError(error));
    this.loading = false;  
    this.deleteMenu = false;
  }

  private savePlanSuccess(response: any) {
    this.list = response;
  }

  private savePlanError(error: any) {
    alert(error);
  }

  public generalError(error: any) {
    console.log(error);
    alert('Errore');
    this.loading = false;
  }

}
