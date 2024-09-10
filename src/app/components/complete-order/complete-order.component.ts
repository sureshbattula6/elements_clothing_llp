import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css']
})
export class CompleteOrderComponent implements OnInit {

  completeordermessageform: FormGroup;
  submitted = false;
  orderId: number;
  dialog: any;

  constructor(
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CompleteOrderComponent>,
  ) {
    this.orderId = data?.orderID; 
  }
   ngOnInit(): void {
    console.log('Order input data', this.data);
    this.completeordermessageform = this.formbuilder.group({
      force_completed_reason: ['', Validators.required],
    });
  }

  get formvalidate() {
    return this.completeordermessageform.controls;
  }

  onlineFormSubmit(): void {
     this.orderId = this.data?.orderID;
    this.submitted = true;

    if (this.completeordermessageform.invalid) {
      return;
    }
    const params = {
      force_completed_reason :this.completeordermessageform.value.force_completed_reason,
    };

   console.log(params, this.orderId, 'orderId');

    this.productService.StorecompleteOrderMessage(params, this.orderId)
      .subscribe({
        next: (res) => {
          alert("Order has been Completed!.");
          this.completeordermessageform.reset();
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
    this.dialogRef.close(); 
  }

}
