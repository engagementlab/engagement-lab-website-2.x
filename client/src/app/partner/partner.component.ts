import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit {
    public content: any;
    public partners: any[];

    public submitted: boolean;
    public received: boolean;
    public inquiryForm: FormGroup;

    constructor(
        private _dataSvc: DataService,
        private _formBuilder: FormBuilder,
    ) {
        this.inquiryForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            company: ['', [Validators.required]],
            message: ['', [Validators.required]],
        });
    }

    async ngOnInit(): Promise<void> {
        const query = `
          {
              allPartnerIntroPages {
                  intro
                  summary1
                  summary2
                  image
                  {
                      public_id 
                  }
              }
          }
      `;
        const response = await this._dataSvc.getSet('partner-with-us', query);
        this.content = response['allPartnerIntroPages'];
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.inquiryForm.controls;
    }

    submitForm() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.inquiryForm.invalid) {
            return;
        }

        let data = this.inquiryForm.value;
        this._dataSvc
            .sendDataToUrl('api/post/contact', data)
            .subscribe((data: any) => {
                this.received = true;
            });
    }
}
