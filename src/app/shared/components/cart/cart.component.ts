import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PrescriptionService } from '../../../services/prescription.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MeasurmentService } from 'src/app/services/measurment.service';

interface Hub {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  @Input('discountEnable') public discountFlag: boolean = false;
 



  public cartList: any = [];
  public prescriptionList: any = [];
  public TotalCartItem: number;
  public value?: any;

  public total: any = 0;
  public orderTotal: any = 0;
  public taxableValue: any = 0;
  public paidAmount: number = 0;
  public subtotal: any = 0;
  public discount: any = 0;
  public discountType: any = 1 ;
  // percentage: string = 'percentage';
  public discountPercent: number = 0;
  public discountValue: number = 0;
  public discountError: any = false;
  public invalidDiscountError: any = false;
  public coupon: string;
  public totalGST: any = 0;
  public selectedViewMeasurement: number = 0;
  public productCountArray: any = null;
  public formSubmitted = false;
  public userDetails = this.authenticationService.getUserDetails();
  public customerId: any = this.authenticationService.getCustomerId();
  public roleId: number = +this.authenticationService.getRoleId();
  measurements: any;
  measurementsList: any;
  Discount?: any = 0;
  discount_percent : any = 0;
  // Payment Section
  public orderForm: FormGroup;
  public orderId: number;

  public salesEmployeeList: any []= [];
  public searchSelectedEmployees: any; 
  filteredSalesEmployeeList: any[] = [];
  public isPaymentAmountVisible: boolean = true;
  public paymentTypeOptions: any[] = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD' },
    { id: 3, name: 'CREDIT' },
    //{ id: 4, name: 'ONLINE'},
    { id: 5, name: 'UPI' }
  ];

  public discountTypeOption: any[] = [
    { id: 1, name: 'Percentage' },
    { id: 2, name: 'Amount' }
  ];

  public paymentSettlementOptions: any[] = [
    { id: -1, name: 'None' },
    { id: 1, name: 'Full Amount' },
    { id: 2, name: 'Advanced Amount' }
  ];
  products: any;
  cartId: any;
  cart: any;
  
  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private prescriptionService: PrescriptionService,
    private commonService: CommonService,
    private measurementService: MeasurmentService,
    private fb: FormBuilder,
    private _router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.fb.group({
      deliveryDate: [''],
      trailDate: [''],
      // other form controls
    });
  }


  ngOnInit(): void {

    this.orderId = +this.route.snapshot.paramMap.get('orderId');
    this.cartId = this.route.snapshot.paramMap.get('cartId');
    
    this.getSalesEmployeeList();
    this.getCartItems();
    this.getPrescriptoins();
    this.getMeasurementList();
    this.measurements = 6;
    this.createOrderForm();
    this.OrderForm();
    this.subscribeToDeliveryDateChanges();
  }
  
  ngAfterViewInit(): void {
    // this.getSalesEmployeeList();  
  }

  OrderForm() {
    this.orderForm = this.fb.group({
      paymentType: ['', Validators.required],
      paymentSettlement: [''],
      deliveryDate: [null, Validators.required],
      trailDate: [null, Validators.required],
      remarks: [''],
      amount: [''],
      discountType: ['1'],
      discountInputValue: [''],  
    });
  }

  getSalesEmployeeList() {

    this.productService.getSaleEmployees().subscribe(
      (res) => {
       
        this.salesEmployeeList = res;
        //console.log('Sale cart List::', this.salesEmployeeList);
        this.searchSelectedEmployees = this.salesEmployeeList;
        // this.filteredSalesEmployeeList = this.salesEmployeeList.slice(); 
      },
      (err) => {
        console.log('Error Sales Employee', err)
      }
    )
  }

  subscribeToDeliveryDateChanges() {
    this.orderForm.get('deliveryDate').valueChanges.subscribe(
      (deliveryDate) => {
        // Update trailDate value when deliveryDate changes
        this.orderForm.get('trailDate').setValue(deliveryDate);
      }
    );
  }
  storehub: Hub[] = [
    { value: 'Send to Hub', viewValue: 'Send to Hub' },
    { value: 'No send to Hub', viewValue: 'No send to Hub' },
  ];



onInput(): void {
  const discountType = this.orderForm.value.discountType;
  const discountValue = (this.orderForm.value.discountInputValue);

  if (discountType === '1') {
    if (discountValue < 0) {
      this.invalidDiscountError = true;
      return;
    }

    if (this.verifyDiscountPermission(discountValue)) {
      this.discountValue = 0;
      this.discountError = true;
      return;
    }
  }

  this.discountError = false;
  this.invalidDiscountError = false;

  this.discount = discountValue;
  this.taxableValue = (this.subtotal - this.discount).toFixed(2);
  this.totalGST = (this.taxableValue * 0.05).toFixed(2);
  this.total = parseFloat(this.taxableValue) + parseFloat(this.totalGST);

  if (this.total < 0) {
    this.total = 0;
  }

  this.updateCartDiscount(this.discount);

  //this.onPaymentOptionChange(this.total);
}

verifyDiscountPermission(discountValue: number): boolean {
  if(this.discountType === 1){
    if (this.roleId == 0 && discountValue > 50) {
      alert('Error: Discount limit up to 50% for role 0');
      return true;
    } else if (this.roleId != 0 && discountValue > 10) {
      alert('Error: Discount limit up to 10% for non-role 0');
      return true;
    }
    return false;
  }
}



  updateCartDiscount(discount: number ) {
    
      const params = {
        discount: discount,
        discount_type:this.discountType,
      };
      const customerId = Number(this.customerId);
      this.productService.updateCart(customerId, params).subscribe((res: any) => {
        //console.log(`Cart item ${customerId} updated with discount`, res);
      });
      this.cartUpdate(event);
  }
  
  getCartItems(productCount = true): void {
    let params = new HttpParams();
    params = params.set('current_page', '1');
    params = params.set('per_page', '100');
    params = params.set('customerId', this.customerId);

    this.productService.getCarts(params).subscribe((response: any) => {
      this.cartList = response.data;

      if (productCount) {
        this.getProductCountbyProductId();
      }
      this.TotalCartItem = response.total;
      this.total = 0;
      this.discount = 0;
      this.subtotal = 0;
      this.totalGST = 0;
      this.orderTotal = 0;
      this.taxableValue = 0;
     // console.log('cartlist', this.cartList);

      for (let i = 0; i < this.cartList.length; i++) {
        const cart = this.cartList[i];
       // console.log('cart Object', cart);
        this.subtotal += cart.price * 1;
        this.discount += +cart.discount_amount;
        this.totalGST += Number(cart.gst_amount);
       // console.log('totalgst', this.totalGST)
      }
      this.subtotal = +this.subtotal.toFixed(2);
      this.totalGST = +this.totalGST.toFixed(2);
      this.orderTotal = Math.round(this.subtotal + this.totalGST).toFixed(2);
      this.taxableValue = this.subtotal.toFixed(2);;
      this.total = this.subtotal + this.totalGST - this.discount;
      this.total = Math.round(this.total).toFixed(2);
      const amountControl = this.orderForm.get('amount');
      //alert(amountControl);
      amountControl.setValue(this.total);
    });
  }

  getPrescriptoins(): void {
    let params = new HttpParams();
    params = params.set('customerId', this.customerId);

    this.prescriptionService
      .getPrescriptions(params)
      .subscribe((response: any) => {
        this.prescriptionList = response.data;
      });
  }

  cartUpdate(event) {
    this.getCartItems();
  }

 

  orderFormSubmit() {
    if (!confirm('Are you sure to Place Order')) return;
  
    this.formSubmitted = true;
  
    if (this.orderForm.invalid) {
      return;
    }
  
    const discountInputValue = this.orderForm.value.discountInputValue;
  
    if (discountInputValue < 0) {
      this.invalidDiscountError = true;
      return;
    }
  
    if (this.verifyDiscountPermission(this.discountValue)) {
      this.discountValue = 0;
      return;
    }
  
    if (this.cartList.length > 0) {
      
      const storeId = this.authenticationService.getStoreId();
  
      let params = {
        customerId: this.customerId,
        userId: this.userDetails.user_id,
        discount: this.discount,
        discountPercent: this.discountPercent,
        paymentType: this.orderForm.value.paymentType?.id?.toString(),
        paymentSettlement: this.orderForm.value.paymentSettlement?.id?.toString(),
        amount: this.orderForm.value.amount,
        deliveryDate: this.orderForm.value.deliveryDate,
        trailDate: this.orderForm.value.trailDate,
        remarks: this.orderForm.value.remarks,
        orderTotal: this.subtotal,
        taxableValue: this.taxableValue,
        totalGST: this.totalGST,
        total: this.total,
        store_id: storeId // Add store_id to params
      };
  
       console.log('testing::',params);
  
      this.productService.storeOrder(params).subscribe(
        (res: any) => {
          // console.log('res', res)
          if (res.sales_order_copy_pdf) {
            const pdfUrl = res.sales_order_copy_pdf;
            const newWindow = window.open(pdfUrl, '_blank');
          }
          this._router.navigate(['/order-view/' + res.data.id]);
        },
        (err) => console.log(err)
      );
    }
  }
  
  

  public cartMeasurementId: any;

  getMeasurementList() {
    const customerId = this.authenticationService.getCustomerId();
    this.measurementService
      .customermeasurement(customerId)
      .subscribe((res: any) => {
        this.cartMeasurementId = res.data.cart_measurements_id;
        // console.log(res.data.cart_measurements_id);
      });
    this.measurementService.measurementList(customerId).subscribe(
      (res: any) => {
        const measurements = res.data.measurment;

        this.measurementsList = measurements;
        const selectedMeasurement = measurements?.filter(
          (obj: any) => obj.value == this.cartMeasurementId
        );
        this.selectedViewMeasurement = selectedMeasurement[0].value;
        this.measurements = new FormControl(selectedMeasurement[0].value);
      },
      (err) => console.log('Error ', err)
    );
  }



  measurementUpdate(measurementId: any) {
    const param = {
      measurementId: measurementId.value,
      // data_flag: 1
    };
    this.selectedViewMeasurement = measurementId.value;

    // console.log(measurementId.value)
    // console.log(this.cartList)
    this.measurementService.measurementUpdate(this.customerId, param).subscribe(
      (response: any) => {
        //console.log(response);
      },
      (err) => console.log(err)
    );
  }

  clearAllItems() {
    if (!confirm('Are you sure to Clear All Items')) return;

    this.productService.clearAllCartItems(this.customerId).subscribe(
      (res) => {
        this.commonService.openAlert(res.message);
        this.getCartItems();
      },
      (err) => console.log(err)
    );
  }

  getProductCountbyProductId() {
    const productInfo = {};
    this.cartList.forEach((item) => {
      const productId = item.product.id;
      const productName = item.product.name;

      if (!productInfo.hasOwnProperty(productId)) {
        productInfo[productId] = {
          product_name: productName,
          product_count: 1,
        };
      } else {
        productInfo[productId].product_count++;
      }
    });

    // Create an array of objects with product IDs, names, and counts
    this.productCountArray = Object.keys(productInfo).map((productId) => ({
      product_id: parseInt(productId),
      product_name: productInfo[productId].product_name,
      product_count: productInfo[productId].product_count,
    }));

    //console.log('pc', this.productCountArray);
  }


  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      paymentType: [''],
      paymentSettlement: [''],
      amount: [''],
      deliveryDate: ['', [Validators.required]],
      trailDate: ['', [Validators.required]],
      remarks: [''],
      // orderStatus: ['',[Validators.required]]
    });
  }

  get formValidate() { return this.orderForm.controls; }


  showDiscountType(): void {
    this.onInput()
    //const selectedDiscountType = this.discountType;
    //console.log(`The discountType selected: ${selectedDiscountType}`);
  }

  goBack() {
    this.location.back();
  }

  onSelectProduct(event: any, productId: number): void {

    if (event.target.checked) {
      var updateStatus = 1;
    } else {
      var updateStatus = 0;
    }

    const param = {
      product_id: productId,
      update_status: updateStatus
    };

    this.productService
      .updateProductStyles(this.customerId, param)
      .subscribe((res) => {

        if (res.success == true) {
          this.commonService.openAlert(res.message);
        }
        if (res.status == 'updated') {
          this.getCartItems(false);
        }
      },
        (err) => console.log(err));
  }

  onPaymentOptionChange(selectedOption: any): void {
    const amountControl = this.orderForm.get('amount');
    //alert(amountControl);
    if (selectedOption.id == 1) {
      amountControl.setValue(this.total);
    } else {
      amountControl.setValue('');
    }
  }



  onPaymentMethodChange(selectedOption: any): void {
    const amountControl = this.orderForm.get('amount');
    if (selectedOption.id == 3) {
      this.isPaymentAmountVisible = false;
      amountControl.setValue('');
    } else {
      this.isPaymentAmountVisible = true;
    }
  }


  updateAdditionalCostAppliedAll(event: any) {
    if (event.checked) {
      const params = { additional_option: event.value };

      this.productService.updateAdditionalCostAppliedAll(this.customerId, params).subscribe(
        (response: any) => {
          this.commonService.openAlert(response.message);
          this.getCartItems();
        },
        (err) => {
          console.log(err);
          this.commonService.openAlert('Failed to add option, try again');
        }
      );
    }
  }


}
