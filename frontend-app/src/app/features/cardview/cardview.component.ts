
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationService } from './../../core/services/user-authentication.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from "../../core/services/cardView.service";
import { SearchService } from "../../core/services/search.service";
import { SchoolService } from "../../core/services/school.service";
import { CompareSchoolService } from "../../core/services/compare-school.service";
import { Router } from '@angular/router';
import { SchoolCard } from "../../core/models/schoolCard.model";

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css']
})
export class CardviewComponent implements OnInit {
  cardDetails: any = {};
  visible: boolean = false;
  displayCardView: boolean = false;
  catchmentArea: boolean = false;
  isAddedToCompare: boolean = false;

  constructor(
    private cardService: CardService,
    private schoolService: SchoolService,
    private searchService: SearchService,
    private router: Router,
    private compareSchoolService: CompareSchoolService,
    private userAuthService: UserAuthenticationService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    this.cardService.getCardData.subscribe((data: SchoolCard) => {
      if (data && data.uniqueReferenceNumber) {
        data.isAddedToCompare = this.compareSchoolService.checkIfAddedToCompare(data.uniqueReferenceNumber);
        this.cardDetails = data;
        this.catchment(true);
        this.displayCardView = true;
      } else {
        this.displayCardView = false;
      }
    }, (error) => {
      console.log(error);
    })

    this.searchService.currentMessage.subscribe((message) => this.hideCardView());
  }


  addToWishList(event: Event, school: any, flag: boolean) {
    event.stopPropagation();
    if (this.userAuthService.isLoggedIn()) {
      school.visible = !school.visible;
      if (school.visible) {
        this.schoolService.addToWishlist(school.uniqueReferenceNumber).then(() => {
          this.toasterService.info('Successfully Added In WishList!');
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.schoolService.removeFromWishList(school.uniqueReferenceNumber).then(() => {
          this.toasterService.info("Removed From Wishlist");
        }).catch((error) => {
          console.error(error);
        });
      }
    } else {
      this.toasterService.error('Please login using your account details to mark any school in your wishlist');
    }

  }

  hideCardView() {
    this.displayCardView = false;
    this.cardDetails = {};
  }

  catchment(catchmentState: boolean) {
    this.catchmentArea = catchmentState;
    this.searchService.changeCatchmentState({ state: catchmentState, lat: this.cardDetails.location[1], lng: this.cardDetails.location[0] });
  }

  viewSchoolDetails(urn: string) {
    this.router.navigate(['schooldetails', urn]);
  }

  setClasses(rating: string) {
    return "rating-" + rating.toLocaleLowerCase().split(" ").join("-");
  }

  addToCompare(event: Event, school: any, flag: boolean) {
    event.stopPropagation();
    if (this.userAuthService.isLoggedIn()) {
      school.isAddedToCompare = !school.isAddedToCompare;
      if (school.isAddedToCompare) {
        this.compareSchoolService.addToCompare(school.uniqueReferenceNumber)
      } else {
        this.compareSchoolService.removeFromCompare(school.uniqueReferenceNumber)
        this.toasterService.info('Removed from Compare List');
      }
    } else {
      this.toasterService.error('Please login using your account details to mark any school in your wishlist');
    }

  }


}

