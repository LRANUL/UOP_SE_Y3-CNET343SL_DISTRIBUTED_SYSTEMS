import { Component, OnInit } from '@angular/core';
import { OperatorService } from 'src/app/service/operator.service';

@Component({
  selector: 'app-support-sub-page',
  templateUrl: './support-sub-page.page.html',
  styleUrls: ['./support-sub-page.page.scss'],
})
export class SupportSubPagePage implements OnInit {
  name: string;
  email: string;
  promotion: boolean;
  maintainence: boolean;

  constructor(
    public operatorService: OperatorService

  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
// Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';

    this.operatorService.getOfferStatus().subscribe(
      (data) => {
        console.log(data)
        if(data=='true'){
          this.promotion = true
        }
        else{
          this.promotion = false
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.operatorService.getMaintenanceStatus().subscribe(
      (data) => {
        console.log(data)
        if(data=='true'){
          this.maintainence = true;
        }
        else{
          this.maintainence = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updatePromotion(promotion){
    this.operatorService.setOfferStatus(promotion).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateMaintainence(maintainence){
    this.operatorService.setMaintenanceStatus(maintainence).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
