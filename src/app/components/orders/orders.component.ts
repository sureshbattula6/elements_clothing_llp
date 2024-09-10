import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../auth/services/loader.service';
import { CommonService } from '../../services/common.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';

const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'Customer_name', 'phone', 'order_qty', 'amount', 'paidAmount', 'discount', 'balance', 'status', 'actions'];//'gst','afterDiscount',,'amount','paidAmount','balance','model','color','size','frame_type','collection_type','material','prescription_type','glass_color','frame_width','catalog_no'


  public PAGE_SIZE_OPTIONS_DATA: number[] = PAGE_SIZE_OPTIONS;

  public page_length: number = PAGE_LENGTH;

  public items_per_page: number = ITEMS_PER_PAGE;

  public current_page: number = CURRENT_PAGE;

  dataSource = new MatTableDataSource<any[]>();

  public filter: FormControl = new FormControl("")
  public orderStatus: FormControl = new FormControl("")

  public customerId: string | number = this.authenticationService.getCustomerId();
  public userDetails = this.authenticationService.getUserDetails();
  myForm: FormGroup;
  options = [
    { label: 'Order Placed', value: '0' },
    { label: 'Order Completed', value: '1' },
    { label: 'Order Cancelled', value: '2' },
  ];
  constructor(
    private dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private commonService: CommonService,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
    );

  }

  ngOnInit(): void {
    this.getData(this.current_page, this.page_length);

    this.myForm = this.fb.group({
      order_status: [''], // Default value is an empty string, you can set it to a default value if needed
      filter: [''], // Default value is an empty string, you can set it to a default value if needed
    });
  }

  onSubmit() {
    const selectedStatus = this.myForm.get('order_status').value;
    const filter = this.myForm.get('filter').value;
    alert(`Selected Value: ${selectedStatus}  ${filter}`);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  advancedFilter() {
    // alert(this.filter.value + this.orderStatus.value);

    this.getData(this.current_page, this.page_length);
  }

  getData(currentPage, perPage): void {
    const customerId = (this.customerId != null) ? this.customerId.toString() : '';
    const userId = (this.userDetails != null) ? this.userDetails.user_id.toString() : '';
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    // params = params.set('customerId', customerId);
    params = params.set('userId', userId);



    // const selectedStatus = this.myForm.get('order_status').value;
    // let formfilter = this.myForm.get('filter').value;

    let filter = this.filter.value;
    params = params.set('filter', filter);

    let order_status = this.orderStatus.value;
    params = params.set('order_status', order_status);

    this.productService.getOrders(params)
      .subscribe((response: any) => {
        //console.log('Orders Data', response.data)
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

  getPaidAmount(orderpayments) {
    let paidAmount = 0;
    orderpayments.forEach(payment => {
      paidAmount += +(payment.paid_amount)
    });
    //return paidAmount;
    return paidAmount.toFixed(2);

  }

  getBalanceAmount(order) {
    let balanceAmount = 0;
    let paidAmount = 0;
    const totalAmont = +order.total_amount;
    const discount = +order.discount;
    const afterDiscount = +order.after_discount;
    const gstAmount = +order.total_gst;

    order.orderpayments.forEach(payment => {
      paidAmount += +(payment.paid_amount)
    });
    balanceAmount = Math.round((totalAmont + gstAmount) - paidAmount - discount - afterDiscount);
       return balanceAmount;
    // return balanceAmount.toFixed(2);
  }

  getOrderStatus(order: any): string {

    if (order) {
      if (order.order_status == 0) {
        return "Order Placed";
      }
      else if(order && order.order_status == 1){
            return "Order Completed";
      }
      else if(order && order.order_status == 2){
          return "Order Canceled"
      }
    }
     return "Unknown Status";
  }


  //   let status = '';
  //   if (order && order.order_status) {

  //     status = "Order Completed";
  //     // for (let orderItem of order.order_status) {
  //     //   if (orderItem.order_status === null || orderItem.order_status === '1') {
  //     //     status = "Order Placed";
  //     //     break;
  //     //   }
  //     // };
  //   }
  //   return status;



}
