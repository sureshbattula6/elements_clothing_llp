import { Component, Inject ,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-remarks-dialog',
  templateUrl: './update-remarks-dialog.component.html',
  styleUrls: ['./update-remarks-dialog.component.css']
})
export class UpdateRemarksDialogComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;
  // public BASE_PATH = environment.BASE_URL;

  public orderId: number;
    public order: any;
  // public
  public customer: any;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateRemarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private _router: Router,
  ) {
    this.orderId = data.orderId; 
  }

  ngOnInit(): void {
    //this.orderId = +this.router.snapshot.paramMap.get('orderId');
    this.getData()
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    this.dialogRef.close(this.data.remarks);
  }
  getData() {
    this.productService.showOrder(this.orderId).subscribe(
      (res) => {
        this.customer = res.data.order.customer;
        this.order = res.data.order;
        this.data.remarks = this.order.remarks;
      },
      (err) => {
        console.error('Error fetching order data', err);
      }
    );
  }
}
