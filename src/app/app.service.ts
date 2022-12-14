import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public businessId!: number;
  // public BASE_URL = 'http://localhost:8000'; 
  public BASE_URL = 'https://magnaapp.herokuapp.com';
  public TOKEN: string | undefined = undefined;
  public COMPANY_ID!: number;
  public currentCompany: any;
  public business!: any;

  public getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  public getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.TOKEN,
    };
  }

  public setToken(token: string|undefined) {
    this.TOKEN = token;
    token && localStorage.setItem('MagnaToken', token);
  }
  public logOut() {
    localStorage.removeItem('MagnaToken');
    localStorage.clear();
    this.TOKEN = undefined;
  }

  constructor() { }

  public async getBusinessInfo(businessId: number) {
    const response = await fetch(
      `${this.BASE_URL}/public/getBusinessInfo/${businessId}`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getBusinessMenuList(businessId: number) {
    const response = await fetch(
      `${this.BASE_URL}/menuInfo/getMenus/${businessId}`,
      { headers: this.getAuthHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async updateMenu(dto: any, businessId: number, menuId: number = 0) {
    const opts = {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: this.getAuthHeaders(),
    };
    const response = await fetch(
      `${this.BASE_URL}/menuInfo/updateMenu/${businessId}/${menuId}`,
      opts
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Could not updateMenu');
    }
    return jsonRes;
  }

  public async addUserToBusiness(businessId: number, userId: number) {
    const opts = {
      method: 'POST',
      headers: this.getAuthHeaders(),
    };
    const response = await fetch(
      `${this.BASE_URL}/business/addUserBusiness/${businessId}/${userId}`,
      opts
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Could not addUserToBusiness');
    }
    return jsonRes;
  }

  public async getBusinessMenu(menuId: number) {
    const response = await fetch(
      `${this.BASE_URL}/menuInfo/getMenu/${menuId}`,
      { headers: this.getAuthHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async updateCategory(dto: any, businessId: number, categoryId: number = 0) {
    const opts = {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: this.getAuthHeaders(),
    };
    const response = await fetch(
      `${this.BASE_URL}/menuInfo/updateMenuCategory/${businessId}/${categoryId}`,
      opts
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Could not updateCategory');
    }
    return jsonRes;
  }

  public async updateItem(dto: any, businessId: number, itemId: number = 0) {
    const opts = {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: this.getAuthHeaders(),
    };
    const response = await fetch(
      `${this.BASE_URL}/menuInfo/updateMenuItem/${businessId}/${itemId}`,
      opts
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Could not updateMenuItem');
    }
    return jsonRes;
  }

  public async getTotalUsers() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalUsers`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTodayUsers() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTodayUsers`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalFidelitiesCards() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalFidelitiesCards`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalBusinesses() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalBusinesses`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalReservations() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalReservations`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalReservationsToday() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalReservationsToday`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalReviews() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalReviews`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getTotalReviewsToday() {
    const response = await fetch(
      `${this.BASE_URL}/public/getTotalReviewsToday`,
      { headers: this.getHeaders() }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }

  public async getMixPanelData(events: string[]) {
    const today = new Date(Date.now()).toISOString().substring(0, 10);
    const params = {
      'project_id': '2852752',
      'type': 'unique',
      'interval': '1',
      'from_date': today,
      'to_date': today,
      'event': JSON.stringify(events)
    };
    const response = await fetch(
      `https://eu.mixpanel.com/api/2.0/events?` + new URLSearchParams(params),
      { headers: { 'authorization': 'Basic Y29tZWJhY2suNDQ1YmI4Lm1wLXNlcnZpY2UtYWNjb3VudDpDamxNMHF5ODB4bHB0WVVDVHJyN2dmaVA2dEVaNEFLcA==' } }
    );
    const jsonRes = await response.json();
    if (!response.ok || (response.status >= 400 && response.status <= 500)) {
      throw new Error(jsonRes?.message || 'Error');
    }
    return jsonRes;
  }
}
