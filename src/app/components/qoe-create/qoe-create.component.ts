import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-qoe-create',
  templateUrl: './qoe-create.component.html',
  styleUrls: ['./qoe-create.component.css']
})
export class QoeCreateComponent implements OnInit {
  qoeForm: FormGroup;
  
  constructor(

    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
    ) {

    	this.mainForm();
	}

  	ngOnInit() {}

	mainForm() {
	    this.qoeForm = this.fb.group({
	      /*name: ['', [Validators.required]],
	      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
	      designation: ['', [Validators.required]],
	      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]*/

	      messageType: ['', [Validators.required]],
		  contentId: ['', [Validators.required]],
		  date: ['', [Validators.required]],
		  eventType: ['', [Validators.required]],
		  selectedItemURL: ['', [Validators.required]],
		  deviceId: ['', [Validators.required]],
		  deviceType: ['', [Validators.required]],
		  sessionId: ['', [Validators.required]],
	      averageThroughput: ['', [Validators.required]],
		  currentBufferLevel: ['', [Validators.required]],
		  mediaTime: ['', [Validators.required]],
		  quality: ['', [Validators.required]],
		  startupDelay: ['', [Validators.required]],
		  url: ['', [Validators.required]],
		  viewLat: ['', [Validators.required]],
		  viewLon: ['', [Validators.required]],
		  viewX: ['', [Validators.required]],
		  viewY: ['', [Validators.required]],
		  viewZ: ['', [Validators.required]]
	    })
	  }

	  // Choose designation with select dropdown
	  updateProfile(e){
	    this.qoeForm.get('designation').setValue(e, {
	      onlySelf: true
	    })
	  }

	  // Getter to access form control
	  get myForm(){
	    return this.qoeForm.controls;
	  }

	  onSubmit() {
	    /*if (!this.qoeForm.valid) {
	      return false;
	    } else {*/
	      this.apiService.createQoe(this.qoeForm.value).subscribe(
	        (res) => {
	          console.log('Qoe successfully created!');
	          this.ngZone.run(() => this.router.navigateByUrl('/session-list'))
	        }, (error) => {
	          console.log(error);
	        });
	    //}
	  }

}