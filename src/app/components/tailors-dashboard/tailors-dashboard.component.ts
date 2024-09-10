import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { TailorsdashboardService } from 'src/app/services/tailorsdashboard.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
@Component({
  selector: 'app-tailors-dashboard',
  templateUrl: './tailors-dashboard.component.html',
  styleUrls: ['./tailors-dashboard.component.css']
})
export class TailorsDashboardComponent implements OnInit {
  public SERVER_PATH = environment.REST_API_URL;
  public tailorOrderCount:number = 0;
  public latestorders:number = 0;
  public tailorTotalItemsCount: number = 0;
public userId: any ;
  public visits:any[];

  constructor(private tailordashboardservice: TailorsdashboardService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    var userDetails = this.authenticationService.getUserDetails();
    this.getDashboardDetails(userDetails.user_id);
  }

  getDashboardDetails(userId: any): void{
    this.tailordashboardservice.getDashboardDetails(userId).subscribe(
      (res:any) => {
        console.log('data',userId)
         this.latestorders = res.data.latestorders;
         this.tailorOrderCount = res.data.tailorOrderCount;
         this.tailorTotalItemsCount = res.data.tailorTotalItemsCount;
        // console.log(res.data);
         this.visits = res.data.userId;
      }
    )
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
