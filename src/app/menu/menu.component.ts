import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuId!: number;
  public businessId!: number;
  public loading = false;
  public menu: any[] = [];
  public delete = false;

  constructor(private appService: AppService,
    private route: ActivatedRoute,
    private r: Router) {
      this.route.params.subscribe(params => {
        this.menuId = this.menuId || params['menuId'];
        this.businessId = this.businessId || +params['businessId'];
      });
    }

  async ngOnInit() {
    this.loading = true;
    await this.getMenu();
    this.loading = false;
  }

  log(msg: any) {
    alert(msg);
  }

  public async getMenu() {
    this.loading = true;
    this.menu = await this.appService.getBusinessMenu(this.menuId)
      .then((response: any) => response)
      .catch((error: any) => this.generalError(error));
  }

  public generalError(error: any) {
    console.log(error);
    alert('Errore');
    this.loading = false;
  }

  newItem(cat: any, items: any[]) {
    let position = 1;
    if (items.length) {
      const lastOne = items[items.length - 1];
      if (lastOne && lastOne.item_position) {
        position = lastOne.item_position + 1;
      }
    }
    const item = {
      id: null,
      category_id: cat.id,
      edit: true,
      delete: false,
      name: null,
      bio: null,
      price: null,
      item_position: position
    };
    cat.items.push(item);
  }

  newMenu(menus: any[]) {
    let position = 1;
    if (menus.length) {
      const lastOne = menus[menus.length - 1];
      if (lastOne && lastOne.cat_position) {
        position = lastOne.cat_position + 1;
      }
    }
    const menu = {
      id: null,
      name: null,
      edit: true,
      delete: false,
      menu_id: this.menuId,
      cat_position: position,
      items: []
    };
    this.menu.push(menu);
  }

  async saveCat(plan: any, i: any) {
    plan.edit = false;
    plan.menu_id = this.menuId;
    console.log("save");
    this.loading = true;
    await this.appService.updateCategory(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.saveCatSuccess(response, i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;
  }

  async saveItem(m: any, plan: any, i: any) {
    plan.edit = false;
    console.log("save");
    this.loading = true;
    await this.appService.updateItem(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.saveItemSuccess(response, m, i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;
  }

  async disableItem(m: any, plan: any, i: any) {
    plan.edit = false;
    console.log("save");
    plan.status = 'suspended';
    this.loading = true;
    await this.appService.updateItem(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.saveItemSuccess(response, m, i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;
  }

  async enableItem(m: any, plan: any, i: any) {
    plan.edit = false;
    console.log("save");
    plan.status = 'active';
    this.loading = true;
    await this.appService.updateItem(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.saveItemSuccess(response, m, i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;
  }

  cancelCat(plan: any, i: any) {
    plan.edit = false;
    if (!plan.id) {
      this.menu.splice(i, 1);
    }
  }

  cancelItem(m: any, plan: any, i: any) {
    plan.edit = false;
    if (!plan.id) {
      m.items.splice(i, 1);
    }
  }

  async deleteCat(plan: any, i: any) {
    plan.delete = true;
    console.log("delete");
    this.loading = true;
    await this.appService.updateCategory(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.deleteCatSuccess(i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;  
  }

  async deleteItem(m: any, plan: any, i: any) {
    plan.delete = true;
    console.log("delete");
    this.loading = true;
    await this.appService.updateItem(plan, this.businessId, plan.id || 0)
      .then((response: any) => this.deleteItemSuccess(response, m, i))
      .catch((error: any) => this.savePlanError(error));
    this.loading = false;  
  }

  editCat(m: any, i: any) {
    if (this.loading) { return; }
    this.menu[i].edit = !this.menu[i].edit;
    m.edit = this.menu[i].edit;
    console.log(this.menu[i].edit);
  }

  editItem(item: any, i: any) {
    if (this.loading) { return; }
    item.edit = !item.edit;
  }

  private saveCatSuccess(response: any, i: any) {
    this.menu[i].name = response.name;
    this.menu[i].id = response.id;
    this.menu = this.menu.sort((a: any,b: any) => a.cat_position - b.cat_position);
  }

  private saveItemSuccess(response: any, m: any, i: any) {
    m.items[i] = response;
    m.items = m.items.sort((a: any,b: any) => a.item_position - b.item_position);
  }

  private deleteItemSuccess(response: any, m: any, i: any) {
    m.items.splice(i, 1);
    this.delete = false;
  }

  private deleteCatSuccess(i: any) {
    this.menu.splice(i, 1);
    this.delete = false;
  }

  private savePlanError(error: any) {
    alert(error);
  }

}
