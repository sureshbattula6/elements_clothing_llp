import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { TailorsService } from '../../../services/tailors.service';
import { CommonService } from 'src/app/services/common.service';
import { FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ItemStatusViewComponent } from '../item-status-view/item-status-view.component';
// import { CancelOrderComponent } from './components/cancel-order/cancel-order.component';
import { MeasurementStyleComponent } from '../../../shared/components/cart/measurement-style/measurement-style.component';
import { SuitStyleComponent } from '../../../shared/components/cart/suit-style/suit-style.component';
import { ShirtStyleComponent } from '../../../shared/components/cart/shirt-style/shirt-style.component';
import { TrouserStyleComponent } from '../../../shared/components/cart/trouser-style/trouser-style.component';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  PAGE_SIZE_OPTIONS,
  PAGE_LENGTH,
  ITEMS_PER_PAGE,
  CURRENT_PAGE
} from '../../../shared/constants/pagination.contacts';

import { StyleService } from 'src/app/services/style.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { MeasurmentService } from 'src/app/services/measurment.service';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancelOrderComponent } from '../../cancel-order/cancel-order.component';
import { CompleteOrderComponent } from '../../complete-order/complete-order.component';
import { UpdateRemarksDialogComponent } from 'src/app/update-remarks-dialog/update-remarks-dialog.component';



const dialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  public SERVER_PATH = environment.REST_API_URL;
  // public BASE_PATH = environment.BASE_URL;

  public orderId: number;
  // public
  public customer: any;
  isOrderPlaced: boolean = false;
  public orderItems: any[] = [];
  public order: any;
  public total: number = 0;
  public self = this;
  public showCancelOrderButton: boolean = true;
  public showCompleteOrderButton: boolean = true;
  isPaymentUpdated: boolean = false;

  selectedTailorIds: any[] = [];
  selectedTailorIdsStatus: any[] = [];

  public paidAmount: number;
  public balanceAmount: number;

  public orderPayments: any[] = [];
  public measurementId: number;

  public newCustomerId: any;

  public tailors: any[] = [];

  public page_length: number = PAGE_LENGTH;

  public items_per_page: number = ITEMS_PER_PAGE;

  public current_page: number = CURRENT_PAGE;

  public PAGE_SIZE_OPTIONS_DATA: number[] = PAGE_SIZE_OPTIONS;

  public customerId: string = this.authenticationService.getCustomerId();
  public roleId: number = +this.authenticationService.getRoleId();
  public orderMeasurementId: any;
  public measurementsList: any;
  public measurements: any;
  public invoiceOrder: any = {};
  public orderStatus: any[] = [
    { id: '1', name: 'Send store on trail' },
  ]
  public balanceAmountChild: any;
  public salesEmployeeList: any;
  public searchSelectedEmployees: any;
  filteredSalesEmployeeList: any[] = [];
  public permissions:any  = this.authenticationService.getPermissions() || [];
  public checkOrderCreatePermission : boolean = false;
  public orginalOrderStatus: number = 0;
  public recentPayment: any;
  public sendMessageStatus = 1;
  public invoiceGenerated: boolean = false;

  constructor(private productService: ProductService,
    private router: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private tailorsService: TailorsService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private styleService: StyleService,
    private authenticationService: AuthenticationService,
    private measurementService: MeasurmentService,
    private location: Location,
    private _router: Router
  ) { }

  ngOnInit(): void {


    this.orderId = +this.router.snapshot.paramMap.get('orderId');
    this.getData();
    //this.checkInvoiceStatus();
    this.getTailorsList();
    this.getSalesEmployeeList();
    this.checkOrderCreatePermission = this.checkOrderCreatePermissionfn();
  }


  getData() {
    this.productService.showOrder(this.orderId).subscribe(
      (res) => {
        //console.log(res);
        this.customer = res.data.order.customer;
        this.orderItems = res.data.order.orderitems;
        this.measurementId = res.data.order.orderitems[0].measurements_id;

        this.order = res.data.order;
        this.orginalOrderStatus = res.data.order.order_status;
        this.orderPayments = res.data.order.orderpayments;
        let paidAmount = 0;
        let totalAmont = this.order.total_amount;
        this.order.orderpayments.forEach(payment => {
          paidAmount += +(payment.paid_amount)
        });

        this.paidAmount = paidAmount;
        this.balanceAmount = Math.round(totalAmont - paidAmount);

        if (res.success && res.data && res.data.order) {
          this.invoiceGenerated = res.data.order.invoice_number !== null;
        } else {
          console.error('Invalid response structure', res);
        }

        this.getMeasurementList(this.customer.id);
        this.newCustomerId = this.customer.id;
        for (const cart of this.orderItems) {
          this.selectedTailorIds[cart.id] = cart.tailor_id; // Set the default value here
          this.selectedTailorIdsStatus[cart.id] = cart.tailor_id; // Set the default value here
        }
      }
    )
   
  }

  getTailorsList() {
    this.tailorsService.GetTailors().subscribe(
      (res: any) => {
        this.tailors = res.data;
      },
      (err) => console.log('Error ', err)
    );
  }

  tailorUpdate(tailorId: any, orderItemId: any) {
    const param = {
      tailorId: tailorId.value,
    }
    this.tailorsService.tailorUpdateOnOrderItem(orderItemId, param).subscribe(
      (response: any) => {
        if (response.message) {
          this.commonService.openAlert(response.message);
        }
      },
      (err) => this.commonService.openAlert(err.message)
    )
  }

  statusUpdate(tailorId: any, orderItemId: any) {
    const param = {
      order_status: tailorId.value,
    }
    this.tailorsService.statusUpdateOnOrderItem(orderItemId, param).subscribe(
      (response: any) => {
        if (response.message) {
          this.commonService.openAlert(response.message);
        }
      },
      (err) => this.commonService.openAlert(err.message)
    )
  }

  viewItemStausModal(orderItemId: number) {
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: orderItemId,
    }

    this.dialog.open(ItemStatusViewComponent, dialogConfig);
  }


  measurementStyle(orderItemId: number, orderId: number, product_category_id: number): void {

    dialogConfig.width = "70%";
    dialogConfig.data = {
      orderItemId: orderItemId,
      orderId: orderId,
      product_category_id: product_category_id,
      page: 'order',
      id: 'id'
    }
    //console.log(product_category_id, 'productcategory_id');
    if (product_category_id == 1) {
      this.dialog.open(SuitStyleComponent, dialogConfig);
    } else if (product_category_id == 4) {
      this.dialog.open(ShirtStyleComponent, dialogConfig);
    } else if (product_category_id == 2){
      this.dialog.open(TrouserStyleComponent, dialogConfig);
    }
    // this.dialog.open(MeasurementStyleComponent,dialogConfig);


  }


  getMeasurementList(customerId: any) {

    // console.log('customerid', this.newCustomerId);

    this.measurementService.measurementList(customerId).subscribe(
      (res: any) => {
        const measurements = res.data.measurment;
        this.measurementsList = measurements;
        this.measurements = new FormControl(null);
      },
      (err) => console.log('Error ', err)
    );
  }

  measurementUpdate(measurementId: any) {
    const param = {
      measurementId: measurementId.value,
    }
    // console.log(measurementId.value)
    //  console.log(this.orderId);
    this.measurementService.measurementUpdateOrderItems(this.orderId, param).subscribe(
      (response: any) => {
        console.log(response)
      },
      (err) => console.log(err)
    )
  }


  getLatestOrderStatus(orderStatus: any): string {
    let index = orderStatus.length;
    let status = '';
    //  debugger;
    if (index > 0) {
      let name = (orderStatus[index - 1].status && orderStatus[index - 1].status.name) ? orderStatus[index - 1].status.name : '';
      let userName = (orderStatus[index - 1].user && orderStatus[index - 1].user.name) ? orderStatus[index - 1].user.name : '';
      let updatedAt = new DatePipe('en-US').transform(orderStatus[index - 1].created_at, 'medium');
      status = name + ' - ' + userName + ' - ' + updatedAt;
    }
    return status;
  }

  updateAllTailorStatuses() {

    if (!confirm('Are you sure to Submit?')) {
      return;
    }

    const dataToSend = [];

    for (const cart of this.orderItems) {
      const cartId = cart.id;
      const selectedTailorId = this.selectedTailorIds[cartId];
      // console.log(`Cart ID: ${cartId}, Selected Tailor ID: ${selectedTailorId}`);

      if (selectedTailorId) {
        dataToSend.push({
          orderItemId: cartId,
          tailorId: selectedTailorId
        });
      }
    }

    const param = {
      order_items_stores: dataToSend,
    }
    this.tailorsService.tailorStoreUpdateOnOrderItem(param).subscribe(
      (response: any) => {
        if (response.message) {
          this.commonService.openAlert(response.message);
        }

        for (const data of dataToSend) {
          this.selectedTailorIdsStatus[data.orderItemId] = data.tailorId;
        }

      },
      (err) => this.commonService.openAlert(err.message)
    )

  }

  goBack(): void {
    this.location.back();
  }


  UpdateRemarks() {
    const dialogRef = this.dialog.open(UpdateRemarksDialogComponent, {
      width: '450px',
      data: { 
        remarks: '',
        orderId: this.orderId // Pass the correct orderId here
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const params = { remarks: result };
        this.productService.UpdateInvioceRemarks(this.orderId, params).subscribe(
          res => {
            console.log('Remarks updated', res);
            this.generateInvoice();
          },
          err => console.error(err)
        );
      } else {
        this.generateInvoice();
      }
    });
  }
 
  //checkInvoiceStatus(){
  //  this.productService.showOrder(this.orderId).subscribe(
  //    (res) => {
  //      if (res.success && res.data && res.data.order) {
  //        this.invoiceGenerated = res.data.order.invoice_number !== null;
  //      } else {
  //        console.error('Invalid response structure', res);
  //      }
  //    },
  //    (err) => {
  //      console.error('Error fetching order details', err);
  //    }
  //  );
  //}
  
  generateInvoice() {

    this.productService.generateSalesInvoice(this.orderId, this.sendMessageStatus).subscribe(
      (res: any) => {
        console.log('sales Invoice', res.sales_invoice_pdf);
        console.log('sales order', res.order);
        if (res.sales_invoice_pdf) {
          const pdfUrl = res.sales_invoice_pdf;
          const newWindow = window.open(pdfUrl, '_blank');
          // if (newWindow) {
          //   newWindow.onload = () => {
          //     newWindow.print();
          //   };
          // }
          window.location.reload();
        }
      },
      (err) => err
    );
  }

  
  generateSalesOrder() {
    this.productService.generateSalesOrder(this.orderId, this.sendMessageStatus).subscribe(
      (res: any) => {
        // console.log('sales order copy', res.sales_order_copy_pdf);
        // console.log('sales order', res.order);
        if (res.sales_order_copy_pdf) {
          const pdfUrl = res.sales_order_copy_pdf;
          const newWindow = window.open(pdfUrl, '_blank');
          // if (newWindow) {
          //   newWindow.onload = () => {
          //     newWindow.print();
          //   };
          // }
        } else {
          alert('Sales Copy Generation failed, Try again')
        }
      },
      (err) => {
        console.log(err);
        alert('Sales Copy Generation failed, Try again.')
      }
    );

  }

  cancelorder(orderId: number): void {

    const dialogRef = this.dialog.open(CancelOrderComponent, {
      width: '70%',
      data: {
        orderID :orderId,
        message: 'Are you sure you want to cancel this order? Please provide a reason:'
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) { // User confirmed
        // Proceed with cancellation
        this.productService.cancelOrder(orderId).subscribe(
          (res) => {
            if (res.success) {
              this.commonService.openAlert(res.message);
            }
            this._router.navigate(['/orders']);
          },
          (err) => this.commonService.openAlert(err.message)
        );
      }
    });
  }

  completeorder(orderId: number): void {

    const dialogRef = this.dialog.open(CompleteOrderComponent, {
      width: '70%',
      data: {
        orderID :orderId,
        message: 'Are you sure you want to Complete this order:'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // User confirmed
        // Proceed with cancellation
        this.productService.cancelOrder(orderId).subscribe(
          (res) => {
            if (res.success) {
              this.commonService.openAlert(res.message);
            }
          },
          (err) => this.commonService.openAlert(err.message)
        );
      }
    });
  }





  setBalanceAmount(amount : any)
  {
    this.balanceAmountChild = amount;
  }
  placeOrder() {
    // Your order placement logic
    this.isOrderPlaced = true;
  }

  generatePdfLink(): string {
    return `${this.SERVER_PATH}/pdf/orders/sales_order_copy_${this.order?.id}.pdf`;
  }

  gotoAddMeasurementPage() {
    this.authenticationService.setCustomerId(this.newCustomerId);
    this._router.navigate(['/addmeasurement' , this.orderId]);
  }

  getSalesEmployeeList() {

    this.productService.getSaleEmployees().subscribe(
      (res) => {
        //console.log(res)
        this.salesEmployeeList = res;
        this.searchSelectedEmployees = this.salesEmployeeList;
        this.filteredSalesEmployeeList = this.salesEmployeeList.slice(); // Initial copy

      },
      (err) => {
        console.log('Error Sales Employee', err)
      }
    )
  }

  onSearchEmpKey(value) {
    this.searchSelectedEmployees = this.searchSaleEmp(value);
  }

  searchSaleEmp(value: string) {
    const filterValue = value.toLowerCase();
    return this.salesEmployeeList.filter((saleEmp) =>
      `${saleEmp.name} - ${saleEmp.employe_code}`.toLowerCase().includes(filterValue)
    );
  }

  updateOrderSalesEmployee(orderItemId: number, event:any)
  {
    const params = {
      sales_emp_id : event.value
    };

    this.productService.updateOrderSalesEmployee(orderItemId, params).subscribe(
      (res) => {
        this.commonService.openAlert(res.message);
      }
    )
  }

  isSelectDisabled(created_at: Date): boolean {
    const createdAtUTC = new Date(created_at);
    const currentTimeUTC = new Date();
    const timeDifference = currentTimeUTC.getTime() - createdAtUTC.getTime();
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
    // Check if the time difference is less than 24 hours
    const isValidFor24Hours = timeDifference > twentyFourHoursInMillis;

    return isValidFor24Hours;
  }


  checkOrderCreatePermissionfn(): boolean {
    return this.permissions.some(element => element.permission.flag_name === 'ORDER_CREATE');
  }

}







