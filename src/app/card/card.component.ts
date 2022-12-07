import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public _fidelity!: any;
  @Input() discountPresent: boolean = false;
  @Input() showBio: boolean = true;
  @Input() lang!: string;
  @Input() set fidelity(fid: any) {
    this._fidelity = fid;
    this._fidelity['expenses_array'] = new Array(this._fidelity.business_expenses_amount);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
