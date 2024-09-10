import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent implements OnInit {

  @Output('updateEvent') public orderUpdateEvent = new EventEmitter();
  @Output() getBalanceAmountEvent = new EventEmitter<string>();
  @Input('discountEnable') public discountFlag: boolean = false;

  public orderId: number;
  public orderItem:any;
  public isOrderShow:boolean = false;
  public isDiscoutShow: boolean = false;
  public orderForm: FormGroup;
  public balanceAmount: any;
  public discount:number = 0;
  public afterDiscount: number = 0;
  public orderAmount: number = 0
  public paidAmount: number = 0;
  public gstAmount: number = 0;
  public afterDiscountAmount: number = 0;
  public amount: number = 0;
  public paymentTypeOptions: any[] = [
    { id: 1, name: 'CASH' },
    { id: 2, name: 'CARD'},
    // { id: 3, name: 'CREDIT'},
    //{ id: 4, name: 'ONLINE'},
    { id: 5, name: 'UPI'}
  ];

  public paymentSettlementOptions: any[] = [
    { id: 1, name: 'Full Amount' },

  ];

  public orderStatusOptions: any[] = [
    { id: 1, name: 'Progress' },
    { id: 2, name: 'Compleate'}
  ];

  public isError:boolean = false;
  public isDiscountError: boolean = false;
  orderStatus: any;


  constructor(
    private productService:ProductService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef,
     private _router: Router) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('orderId');

    if(this.discountFlag) {
      this.paymentSettlementOptions.push({ id: 2, name: 'Partial Amount' })
    }else {
      this.paymentSettlementOptions.push({ id: 2, name: 'Advanced Amount' })
    }

    this.createOrderForm();
    this.getOrders();
    this.formEvents();

  }

  toggleDiscount(): void {
    this.isDiscoutShow = !this.isDiscoutShow;
  }

  onInput(event: any): void
  {
    const discount = +event.target.value;
    const totalAmont = this.orderItem.total_amount;
    const beforeDiscount = + this.orderItem.discount;


    if(discount > this.balanceAmount){
      this.isDiscountError = true;
      return;
    } else {
      this.isDiscountError = false;
    }

   
     this.afterDiscount = discount;
   
  }

  formEvents(){
    this.orderForm.get('paymentSettlement').valueChanges.subscribe(
      (val) =>{
        if(val.id === 1){
          this.orderForm.get('amount').setValue(this.balanceAmount);
          this.orderForm.get('amount').disable();
        }else{
          this.orderForm.get('amount').setValue('');
          this.orderForm.get('amount').enable();
        }
      }
    );

    this.orderForm.get('amount').valueChanges.subscribe((v) => {
      const enterAmount = +v;
      this.afterDiscountAmount = +this.orderItem.after_discount;
      // const orderAmount = +this.orderItem.amount;
      // console.log(`${enterAmount} - ${orderAmount}`);
        if(enterAmount > this.balanceAmount){
          this.isError = true;
        }else{
          this.isError = false;
        }
        this.cd.detectChanges();
    });
  }

  createOrderForm(){
    this.orderForm = this.fb.group({
      paymentType: ['',[Validators.required]],
      paymentSettlement: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      // orderStatus: ['',[Validators.required]]
    });
  }

  get formValidate(){ return this.orderForm.controls; }

  getOrders(){
    this.productService.showOrderDetails(this.orderId).subscribe( (res:any) => {
      this.orderItem = res.data.order;
      this.afterDiscountAmount = +this.orderItem.after_discount;
      this.orderAmount = +this.orderItem.total_amount;
      this.discount = +this.orderItem.discount;
      this.gstAmount = +this.orderItem.total_gst;
      if(this.discountFlag)
       this.discountFlag = ( this.afterDiscountAmount == 0)? true : false;
      this.checkOrderShow();
    });
    // this.orderAmount = +this.orderItem.amount;

  }

  orderFormSubmit(){
    if(this.orderForm.invalid || this.isError){
      return;
    }

    this.orderForm.get('amount').enable();

    const params = {
      paymentType: this.orderForm.value.paymentType.id.toString(),
      paymentSettlement: this.orderForm.value.paymentSettlement.id.toString(),
      amount: this.orderForm.value.amount,
      after_discount: this.afterDiscount
      // orderStatus: this.orderForm.value.orderStatus.id.toString(),
     };

    this.productService.updateOrder(this.orderId,params).subscribe( (res:any) => {
      this.orderItem = res.data;
      this.checkOrderShow();
      this.updateOrder();
      // this.ngOnInit();
      window.location.reload();
      // this._router.navigate(['/order-view', this.orderId]);
    });
  }

  checkOrderShow(){

    this.afterDiscountAmount = +this.orderItem.after_discount;
    this.orderAmount = +this.orderItem.total_amount;
    this.discount = +this.orderItem.discount;

    this.gstAmount = +this.orderItem.total_gst;

    // console.log(this.orderItem)
    this.paidAmount = 0;
    this.orderItem.orderpayments.forEach(payment => {
      this.paidAmount += +(payment.paid_amount);

    });

     this.balanceAmount = this.orderAmount - this.paidAmount;

     this.balanceAmount = Math.floor(this.balanceAmount);
     this.balanceAmount = parseFloat(this.balanceAmount.toFixed(2));
    if(this.balanceAmount ==  0){
      this.isOrderShow = false;
    }else{
      this.isOrderShow = true;
    }

    this.getBalanceAmountEvent.emit(this.balanceAmount);

    this.orderStatus = this.orderItem.order_status;

    return this.balanceAmount;
  }

  updateOrder(){
    this.orderUpdateEvent.emit('true');
  }
}
