import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { MeasurmentService } from '../../services/measurment.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CameraMeasurementComponent } from '../camera-measurement/camera-measurement.component';

const dialogConfig= new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;


@Component({
  selector: 'app-addmeasurments',
  templateUrl: './addmeasurments.component.html',
  styleUrls: ['./addmeasurments.component.css']
})
export class AddmeasurmentsComponent implements OnInit {
  customerId: string;
  // public customerId:string|number = this.authenticationService.getCustomerId();

  customerPhone: any = "";
  cartId: any;
  orderId: any = this.route.snapshot.paramMap.get('orderId');
  frontMeasurementImgUrl: any;
  frontMeasurementImgBase64: any;
  backMeasurementImgUrl: any;
  backMeasurementImgBase64: any;
  sideMeasurementImgUrl: any;
  sideMeasurementImgBase64: any;
  form: any = {
    customer_id: null,
    // fl_value: null,
    // bl_value: null,
    // suitl_value: null,
    // knl_value: null,
    // wl_value: null,
    // sh_value: null,
    // nsh_value: null,
    // sl_value: null,
    // ch_value: null,
    // st_value: null,
    // h_value: null,
    // cf_value: null,
    // cb_value: null,
    // bicep_value: null,
    // hb_value: null,
    // hf_value: null,
    // n_value: null,
    // l_data: null,
    // kl_data: null,
    // sl_data: null,
    // arm_data: null,
    // farm_data: null,
    // cuff_data: null,
    // l_measurment: null,
    // w_measurment: null,
    // h_measurment: null,
    // fth_measurment: null,
    // kn_measurment: null,
    // b_measurment: null,
    // hl_measurment: null,
    // bal_measurment: null,
    // remark: null,
    backshape: null,
    stomach: null,
    shoulder: null,
    button: null,
    lapel: null,
    vent: null,
    pocket: null,
    jodhpuri: null,
    type: null,
    pleat: null,
    pocket_type: null,
    back_pocket: null,
    shape: null,
    cut_way: null,
    collar_type: null,
    placket: null,
    cuff_type: null,
    other: null,
    shape_type: null,
    fit_type: null,
    title: this.orderId ? 'PCO0'+this.orderId : this.customerPhone,
    trouser_calf_round:null,
    trouser_crotch_length: null,
    suit_sl_left: null,
    suit_sl_Right: null,
    suit_upper_ch: null,
    suit_lower_ch: null,
    shirt_sl_left: null,
    shirt_sl_right: null,
    shirt_upper_ch: null,
    shirt_lower_ch: null,
    suit_left_cuff: null,
    suit_right_cuff: null,
    shirt_left_cuff: null,
    shirt_right_cuff: null,
    remark: null,
    master_name: null,
    meas_taken_by: null

  };

  constructor(
    private measurmentService: MeasurmentService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog:MatDialog,
    private location: Location,
    private customerService: CustomerService
    ) { }


  ngOnInit(): void {
    this.cartId = this.route.snapshot.paramMap.get('cartId');
    this.customerId = this.authenticationService.getCustomerId();
    this.getCustomer();

  }


  getCustomer() {
    this.customerService.showCustomer(this.customerId).subscribe(
      (res:any)=>{
          this.customerPhone = res.data.customer.phone;
          if(!this.orderId)
            this.form.title = this.customerPhone;
      }
    )
  }

  onSubmit(): void {
    const {title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal,  backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by } = this.form;


    this.measurmentService.storeMeasurment(this.customerId,this.cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by, this.frontMeasurementImgBase64, this.backMeasurementImgBase64, this.sideMeasurementImgBase64).subscribe({
      next: data => {
        console.log('FORM SUBMISSION', data)  ;
        if(data.success == false){
          this.commonService.openAlert(data.message);
        }  else{
          this.commonService.openAlert(data.message);

          if (this.orderId) {
            this.router.navigate(['/order-view', this.orderId]);
          } else if (this.cartId) {
            this.router.navigate(['/cart']);
          } else {
            this.router.navigate(['/customer/'+ this.customerId + '/measurements']);
          }

        }
      },
      error: err => {

      }

    });

  }


  captureMeasurement(position: any){
    dialogConfig.width ="60%";
    dialogConfig.data = {
      position: position,
    }
    const dialogRef = this.dialog.open(CameraMeasurementComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.position == 'front') {
        this.frontMeasurementImgUrl = data.imageAsDataUrl;
        this.frontMeasurementImgBase64 = data.imageAsBase64;
      } else if (data.position == 'back') {
        this.backMeasurementImgUrl = data.imageAsDataUrl;
        this.backMeasurementImgBase64 = data.imageAsBase64;
      }
      else if (data.position == 'side') {
        this.sideMeasurementImgUrl = data.imageAsDataUrl;
        this.sideMeasurementImgBase64 = data.imageAsBase64;
      }
    });

  }

  removeCapturedImg(position:string) {
    if (position == 'front') {
      this.frontMeasurementImgUrl = null;
      this.frontMeasurementImgBase64 = null;
    } else if (position == 'back') {
      this.backMeasurementImgUrl = null;
      this.backMeasurementImgBase64 = null;
    }
    else if (position == 'side') {
      this.sideMeasurementImgUrl = null;
      this.sideMeasurementImgBase64 = null;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
