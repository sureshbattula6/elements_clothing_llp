import { Component, OnInit,Input } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { PrescriptionService } from '../../../services/prescription.service';
import { Router,ActivatedRoute } from '@angular/router';
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
export class CartComponent implements OnInit {
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
   public discount: number = 0;
  public discountType: string = 'percentage';
  // percentage: string = 'percentage';
  public discountPercent: number = 0;
  public discountValue: number = 0;
  public discountError: any = false;
  public invalidDiscountError: any = false;
  public coupon: string;
  public totalGST: number = 0;
  public selectedViewMeasurement: number = 0;
  public productCountArray:any = null;
  public formSubmitted = false;
  public userDetails = this.authenticationService.getUserDetails();
  public customerId: string = this.authenticationService.getCustomerId();
  public roleId: number = +this.authenticationService.getRoleId();
  measurements: any;
  measurementsList: any;
  Discount?: any;
  // Payment Section
  public orderForm: FormGroup;
  public orderId: number;

  public paymentTypeOptions: any[] = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD'},
    { id: 3, name: 'CREDIT'},
    { id: 4, name: 'ONLINE'},
    { id: 5, name: 'UPI'}

  ];

public discountTypeOption: any[] = [
  { id: 1, name: 'Percentage'},
  { id: 2, name: 'Amount'}
];

  public paymentSettlementOptions: any[] = [
    { id: -1, name: 'None' },
    { id: 1, name: 'Full Amount' },
    {id: 2, name: 'Advanced Amount'}
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
    private fb:FormBuilder,
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
    // if(this.discountFlag) {
    //   this.paymentSettlementOptions.push({ id: 2, name: 'Partial Amount' })
    // }else {
    //   this.paymentSettlementOptions.push({ id: 2, name: 'Advanced Amount' })
    // }

    this.getCartItems();
    this.getPrescriptoins();
    this.getMeasurementList();

    this.measurements = 6;
    this.createOrderForm();
    this.OrderForm();
    this.subscribeToDeliveryDateChanges();

  }

  OrderForm() {
    this.orderForm = this.fb.group({
      paymentType: ['',Validators.required],
      paymentSettlement: [''],
      deliveryDate: [null, Validators.required],
      trailDate: [null, Validators.required],
      remarks:[''],
      amount: [''],
      discountInputValue:[''],
    });
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
    const totalWithoutDisc = this.subtotal + this.totalGST;


    if (this.orderForm.value.discountInputValue < 0) {
      this.invalidDiscountError = true;
      return;
    }

    if (this.discountType == "percentage") {
      const discountPercent = this.orderForm.value.discountInputValue;
      this.discountPercent = discountPercent;

      if (this.verifyDiscountPermission()) {
        this.discountValue = 0;
        this.discountError = true;
        return;
      }

      const discountAmt = totalWithoutDisc * (discountPercent / 100);
      this.total = Math.round(totalWithoutDisc - discountAmt);
      this.discount = discountAmt;

    }
    else { // Amount
      const discountAmt = this.orderForm.value.discountInputValue;;
      const discountPercent = (discountAmt/totalWithoutDisc) * 100;
      this.discountPercent = discountPercent;

      if (this.verifyDiscountPermission()) {
        this.discountValue = 0;
        this.discountError = true;
        return;
      }

      this.total = Math.round(totalWithoutDisc - discountAmt);
      this.discount = discountAmt;

      // console.log(discountPercent);
    }

    this.discountError = false;
    this.invalidDiscountError = false;
    if (this.total < 0)
      this.total = 0;

  }

  verifyDiscountPermission() {
    if (this.roleId == 0 && this.discountPercent > 50) {
        alert('Error: Discount limit upto 50%')
        return true;
    } else if (this.roleId != 0 && this.discountPercent > 10)   {
        alert('Error: Discount limit upto 10%')
        return true;
    }
    return false;
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

      console.log('cartlist', this.cartList);
      // this.cartList.map((cart) => {
      //   console.log('cart Object', cart);
      //   this.subtotal += cart.price * cart.quantities;
      //   console.log('this subtaotal',  this.subtotal);
      //   this.subtotal = parseFloat(this.subtotal.toFixed(2));

      //   console.log('emiting', this.subtotal, cart.price * cart.quantities);

      //   this.discount += +cart.discount;

      //   this.totalGST += cart.gst_amount;
      //   this.totalGST = parseFloat(this.totalGST.toFixed(2));

      // });

      for (let i = 0; i < this.cartList.length; i++) {
        const cart = this.cartList[i];
        console.log('cart Object', cart);
        this.subtotal += cart.price * cart.quantities;
        // console.log('emiting', this.subtotal, cart.price * cart.quantities);
        this.discount += +cart.discount;
        this.totalGST += Number(cart.gst_amount);
        console.log('totalgst', this.totalGST)
      }

      this.subtotal = +this.subtotal.toFixed(2);
      this.totalGST = +this.totalGST.toFixed(2);
      this.orderTotal =  this.subtotal  + this.totalGST;
      this.total = this.subtotal + this.totalGST - this.discount;
      this.total = Math.round(this.total).toFixed(2);

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

    if(this.orderForm.invalid){
      return;
    }

    if (this.orderForm.value.discountInputValue < 0) {
      this.invalidDiscountError = true;
      return;
    }

    if (this.verifyDiscountPermission()) {
      this.discountValue = 0;
      return;
    }

    if (this.cartList.length > 0) {
      let params = {
        customerId: this.customerId,
        userId: this.userDetails.user_id,
        discount: this.discount,
        discountPercent:this.discountPercent,
        paymentType: this.orderForm.value.paymentType?.id?.toString(),
        paymentSettlement: this.orderForm.value.paymentSettlement?.id?.toString(),
        amount: this.orderForm.value.amount,
        deliveryDate: this.orderForm.value.deliveryDate,
        trailDate: this.orderForm.value.trailDate,
        remarks: this.orderForm.value.remarks,
      };
          // console.log(params);
      this.productService.storeOrder(params).subscribe(
        (res: any) => {
          console.log('res', res)
          if (res.sales_order_copy_pdf){
            const pdfUrl = res.sales_order_copy_pdf;
            const newWindow = window.open(pdfUrl, '_blank');
            // if (newWindow) {
            //   newWindow.onload = () => {
            //     newWindow.print();
            //   };
            // }
          }
          this._router.navigate(['/order-view/' + res.data.id]);
        },
        (err) => console.log(err)
      );
    }


    // this.productService.checkCartProductMeasurement(this.customerId).subscribe(
    //   (res: any) => {
    //     if (res.message) {
    //       this.commonService.openAlert(res.message);
    //     } else {

    //     }
    //   },
    //   (err) => err
    // );
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
        const selectedMeasurement = measurements.filter(
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
        console.log(response);
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

    console.log('pc', this.productCountArray);
  }

  // selectProduct(id: number,product_name: string): void{

  //   alert(`Sales Employee Selected For Same Product ${id}, ${product_name},`);


  //   this.productService.getcartProducts(id).subscribe((res) =>{
  //           this.products = res.data.products;
  //           this.cart = res.data.cart;
  //           console.log(res);

  //   })

  // }


  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

  createOrderForm(){
    this.orderForm = this.fb.group({
      paymentType: [''],
      paymentSettlement: [''],
      amount: [''],
      deliveryDate: ['',[Validators.required]],
      trailDate: ['',[Validators.required]],
      remarks: [''],
      // orderStatus: ['',[Validators.required]]
    });
  }

  get formValidate(){ return this.orderForm.controls; }


  showDiscountType(): void {
    this.onInput()
    // const selectedDiscountType = this.discountType;
    // console.log(`The discountType selected: ${selectedDiscountType}`);
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
      update_status:updateStatus
    };

    this.productService
      .updateProductStyles(this.customerId, param)
      .subscribe((res) => {

        if(res.success == true)
        {
          this.commonService.openAlert(res.message);
        }
        if(res.status == 'updated') {
          this.getCartItems(false);
        }
      },
      (err) => console.log(err));
  }

  onPaymentOptionChange(selectedOption: any): void
  {
    const amountControl = this.orderForm.get('amount');
        if (selectedOption.id == 1) {
            amountControl.setValue(this.total);
        } else {
          amountControl.setValue('');
        }
  }



}
