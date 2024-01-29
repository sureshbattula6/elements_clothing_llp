import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../auth/services/loader.service';
import { CommonService } from '../../services/common.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { MeasurmentService } from 'src/app/services/measurment.service';

@Component({
  selector: 'app-measurements-list',
  templateUrl: './measurements-list.component.html',
  styleUrls: ['./measurements-list.component.css']
})
export class MeasurementsListComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['title','customer_name', 'mobile', 'created_at', 'actions'];


  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;

  dataSource = new MatTableDataSource<any[]>();

  public filter:FormControl = new FormControl("",Validators.required)

  public customerId:string|number = this.authenticationService.getCustomerId();
  public userDetails = this.authenticationService.getUserDetails();

   constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private productService:ProductService,
    private authenticationService:AuthenticationService,
    private measurementService: MeasurmentService
  ) {
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
      );

  }

  ngOnInit(): void {
    this.getData(this.current_page, this.page_length);
  }

  ngAfterViewInit(){
    // this.dataSource.paginator = this.paginator;
  }

  advancedFilter(){
    this.getData(this.current_page, this.page_length);
  }

  getData(currentPage, perPage):void{
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    params = params.set('userId', userId);

    let filter = this.filter.value;
    params = params.set('filter',filter);

    this.measurementService.getAllMeasurementsList(params)
    .subscribe((response: any) =>{
      // console.log('Orders Data', response.data)
      this.dataSource = new MatTableDataSource<any>(response.data);
      this.dataSource.paginator = this.paginator;
      this.page_length = response.total;
    })
  }

  pageChanged(event: PageEvent) {
    this.page_length = event.pageSize;
    this.current_page = event.pageIndex + 1;
    this.getData(this.current_page, this.page_length);
  }




}
