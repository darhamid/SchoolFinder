import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MyProfileService } from './../../core/services/my-profile.service';
import { UserProfileUpdateService } from './../../core/services/user-profile-update.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  myProfileForm: FormGroup;

  constructor(private myProfileService: MyProfileService, private userProfileUpdateService: UserProfileUpdateService, private router: Router, private toasterService: ToastrService) { }

  ngOnInit() {
    this.myProfileForm = new FormGroup({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'email': new FormControl(),
      'phone1': new FormControl(),
      'addressLine1': new FormControl(),
      'addressLine2': new FormControl(),
      'addressLine3': new FormControl(),
      'addressLine4': new FormControl(),
      'addressLine5': new FormControl(),

    });
    this.getMyProfileDetails();
  }

  isFieldValid(field: string) {
    return this.myProfileForm.get(field).touched && this.myProfileForm.get(field).invalid;
  }

  getMyProfileDetails(): any {

    this.myProfileService.getMyProfile().subscribe(

      (response: any) => {
        let data = response.data;
        this.myProfileForm = new FormGroup({
          'firstName': new FormControl(data.firstName ? data.firstName : "", [Validators.required]),
          'lastName': new FormControl(data.lastName ? data.lastName : "", [Validators.required]),
          'email': new FormControl(data.email ? data.email : "", [Validators.required, Validators.email]),
          'phone1': new FormControl(data ? data.phone1 : "", [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(9), Validators.minLength(9)]),
          'addressLine1': new FormControl(data.addressLine1),
          'addressLine2': new FormControl(data.addressLine2),
          'addressLine3': new FormControl(data.addressLine3),
          'addressLine4': new FormControl(data.addressLine4),
          'addressLine5': new FormControl(data.addressLine5)

        });
      },
      (error) => { console.log(error); }
    );
  }

  updateUserProfile() {
    this.userProfileUpdateService.updateUserProfile(this.myProfileForm.value).then((res: any) => {
      if (res.success) {
        this.toasterService.success('Profile successfully updated!');
      } else {
        this.toasterService.error(res.message);
      }

    }).catch((error) =>{
       console.error(error);
    }) 
  }
  cancleUpdate() {
    this.router.navigateByUrl('/');
  }
}
