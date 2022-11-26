import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  styleUrls: ['./user-business.component.scss']
})
export class UserBusinessComponent implements OnInit {
  public loading = false;
  public addUserBusinessForm = this.fb.group({
    userId: [null, Validators.required],
    businessId: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
  }


  public addUser() {
    const form = this.addUserBusinessForm.getRawValue();
    this.loading = true;
      this.appService
        .addUserToBusiness(form.businessId, form.userId)
        .then((card: any) => {
          this.addUserBusinessForm.reset();
          alert('Fatto');
        })
        .catch((e: any) => alert('Errore'))
        .finally(() => (this.loading = false));
  }

}
