import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {
  cancelordermessageform: FormGroup;
  submitted = false;
  orderId: number;
  dialog: any;

  constructor(
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelOrderComponent>,
  ) {
    this.orderId = data?.orderID; // Corrected casing here
  }

  ngOnInit(): void {
    console.log('Order input data', this.data);
    this.cancelordermessageform = this.formbuilder.group({
      cancel_order_message: ['', Validators.required],
      //cancel_date: ['',Validators.required]
    });
  }

  get formvalidate() {
    return this.cancelordermessageform.controls;
  }

  onlineFormSubmit(): void {
    // this.orderId = this.data?.orderId;
     this.orderId = this.data?.orderID;
    this.submitted = true;

    if (this.cancelordermessageform.invalid) {
      return;
    }

    const cancelOrderMessage = this.cancelordermessageform.value.cancel_order_message;
    //const canceldate = this.cancelordermessageform.value.cancel_date;

    const params = {
            cancel_order_message: cancelOrderMessage,
      //cancel_date: canceldate
    };

   console.log(params, this.orderId, 'orderId');

    this.productService.Storecancelordermessage(params, this.orderId)
      .subscribe({
        next: (res) => {
          alert("Order has been Cancelled");
          this.cancelordermessageform.reset();
          this.dialogRef.close();
          window.location.reload();
          this._router.navigate(['/order-view/', this.orderId]);
        },
        error: () => {
          alert("Error while submitting Form");
        }
      });
  }

  cancel(): void {
    this.dialogRef.close(); // Close the dialog if cancelled
  }
}
