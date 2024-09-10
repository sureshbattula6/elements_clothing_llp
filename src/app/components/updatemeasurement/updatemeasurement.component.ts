import { Component, OnInit } from '@angular/core';
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
  selector: 'app-updatemeasurement',
  templateUrl: './updatemeasurement.component.html',
  styleUrls: ['./updatemeasurement.component.css']
})
export class UpdatemeasurementComponent implements OnInit {

  // public measurementId:number;
  frontMeasurementImgUrl: any;
  frontMeasurementImgBase64: any;
  backMeasurementImgUrl: any;
  backMeasurementImgBase64: any;
  sideMeasurementImgUrl: any;
  sideMeasurementImgBase64: any;
  frontMeasurementImgStatus : any = 'keepitsame'; // keepitsame, deleted, updated
  backMeasurementImgStatus : any = 'keepitsame';
  sideMeasurementImgStatus : any = 'keepitsame';
  customerId: string;
  cartId: any;
  measurementId:any;
  form: any = {
    customer_id: null,
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
    title: null,
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
    shirt_hp: null,
    shirt_st: null,
    shirt_n: null,
    trouser_uround: null,
    remark: null,
    master_name: null,
    meas_taken_by: null
  };

  constructor(
    private measurmentService: MeasurmentService,
    // private authenticationService: AuthenticationService,
    private commonService: CommonService,
    // private route: ActivatedRoute,
    private router: Router,
    private measurementService: MeasurmentService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private location: Location
    ) { }


  ngOnInit(): void {
    this.measurementId = this.route.snapshot.paramMap.get('id');
    // alert(this.cartId);
    this.customerId = this.authenticationService.getCustomerId();
    this.getCustomerMeasurement();

  }

  //onSubmit(): void {
  //  const {title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal,  backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by} = this.form;

  //  this.measurmentService.updatestoremeasurement(this.customerId,this.cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by, this.frontMeasurementImgBase64, this.frontMeasurementImgStatus,this.backMeasurementImgBase64, this.backMeasurementImgStatus, this.sideMeasurementImgBase64, this.sideMeasurementImgStatus).subscribe({
  //    next: data => {
  //      console.log('FORM SUBMISSION', data)  ;
  //      if(data.success == false){
  //        this.commonService.openAlert(data.message);
  //      }  else{
  //        this.commonService.openAlert(data.message);
  //        this.router.navigate(['/cart']);
  //      }
  //    },
  //    error: err => {

  //    }

  //  });

  //}


  onSubmit(): void {
    if (this.measurementId) {
      this.updateMeasurement('cart');
    } else {
      this.createMeasurement();
    }
  }

  //createMeasurement(): void {
  //  const {
  //    title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st,
  //    suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm,
  //    shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl,
  //    trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type,
  //    back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round,
  //    trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right,
  //    shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp,
  //    shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by
  //  } = this.form;

  //  this.measurmentService.storeMeasurment(
  //    this.customerId, this.cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh,
  //    suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl,
  //    shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn,
  //    trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type,
  //    pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type,
  //    trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left,
  //    shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,
  //    shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by, this.frontMeasurementImgBase64, 
  //    this.backMeasurementImgBase64,  this.sideMeasurementImgBase64, 
  //  ).subscribe({
  //    next: data => {
  //      console.log('FORM SUBMISSION', data);
  //      if(data.success == false){
  //        this.commonService.openAlert(data.message);
  //      }  else{
  //        this.commonService.openAlert(data.message);
  //        this.router.navigate(['/cart']);
  //      }
  //    },
  //    error: err => {
  //      console.error('Error in form submission:', err);
  //    }
  //  });
  //}

  createMeasurement(): void {
    const {
      title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st,
      suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm,
      shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl,
      trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type,
      back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round,
      trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right,
      shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp,
      shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by
    } = this.form;

    this.measurmentService.storeMeasurment(
      this.customerId, this.cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh,
      suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl,
      shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn,
      trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type,
      pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type,
      trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left,
      shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,
      shirt_hp, shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by, this.frontMeasurementImgBase64,
      this.backMeasurementImgBase64, this.sideMeasurementImgBase64
    ).subscribe({
      next: data => {
        //console.log('FORM SUBMISSION', data);
        if (data.success == false) {
          this.commonService.openAlert(data.message);
        } else {
          this.commonService.openAlert(data.message);
          this.router.navigate(['/cart']);
        }
      },
      error: err => {
        console.error('Error in form submission:', err);
      }
    });
  }

  updateMeasurement(redirectTo: string): void {
    const {
        title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st,
        suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm,
        shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl,
        trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type,
        back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round,
        trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right,
        shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp,
        shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by
    } = this.form;

    this.measurmentService.updateMeasurements(
        this.measurementId, this.customerId, this.cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh,
        suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl,
        shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn,
        trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type,
        pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type,
        trouser_calf_round, trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left,
        shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,
        shirt_hp, shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by, this.frontMeasurementImgStatus,
        this.frontMeasurementImgBase64, this.backMeasurementImgStatus, this.backMeasurementImgBase64, this.sideMeasurementImgStatus, this.sideMeasurementImgBase64
    ).subscribe({
        next: data => {
            //console.log('FORM SUBMISSION', data);
            if (data.success == false) {
                this.commonService.openAlert(data.message);
            } else {
                this.commonService.openAlert(data.message);
                if (redirectTo === 'cart') {
                    this.router.navigate(['/cart']);
                } else if (redirectTo === 'customers') {
                    //this.router.navigate(['/customers']);
                    this.router.navigate([`/customer/${this.customerId}/measurements`]);
                }
            }
        },
        error: err => {
            console.error('Error in form submission:', err);
        }
    });
}


  getCustomerMeasurement() {
    let measurement_id = this.route.snapshot.paramMap.get('id');
    this.measurementService.getmeasurement(measurement_id).subscribe(
      (res: any) => {
        const measurements = res.data.measurments;

        // console.log('sds',measurements);
        this.form.suit_fl = measurements.suit_fl;
        this.form.suit_bl = measurements.suit_bl;
        this.form.suit_suitl = measurements.suit_suitl;
        this.form.suit_knl = measurements.suit_knl;
        this.form.suit_wl = measurements.suit_wl;
        this.form.suit_sh = measurements.suit_sh;
        this.form.suit_nsh = measurements.suit_nsh;
        this.form.suit_sl = measurements.suit_sl;
        this.form.suit_st = measurements.suit_st;
        this.form.suit_h = measurements.suit_h;
        this.form.suit_cf = measurements.suit_cf;
        this.form.suit_cb = measurements.suit_cb;
        this.form.suit_bicep = measurements.suit_bicep;
        this.form.suit_hb = measurements.suit_hb;
        this.form.suit_hf = measurements.suit_hf;
        this.form.suit_n = measurements.suit_n;
        this.form.shirt_l = measurements.shirt_l;
        this.form.shirt_kl = measurements.shirt_kl;
        this.form.shirt_sl = measurements.shirt_sl;
        this.form.shirt_arm = measurements.shirt_arm;
        this.form.shirt_farm = measurements.shirt_farm;
        this.form.shirt_cuff = measurements.shirt_cuff;
        this.form.trouser_l = measurements.trouser_l;
        this.form.trouser_w = measurements.trouser_w;
        this.form.trouser_h = measurements.trouser_h;
        this.form.trouser_fth = measurements.trouser_fth;
        this.form.trouser_kn = measurements.trouser_kn;
        this.form.trouser_b = measurements.trouser_b;
        this.form.trouser_hl = measurements.trouser_hl;
        this.form.trouser_bal = measurements.trouser_bal;
        this.form.trouser_calf_round = measurements.trouser_calf_round;
        this.form.trouser_crotch_length = measurements.trouser_crotch_length;
        this.form.suit_sl_left = measurements.suit_sl_left;
        this.form.suit_sl_right = measurements.suit_sl_right;
        this.form.suit_upper_ch = measurements.suit_upper_ch;
        this.form.suit_lower_ch = measurements.suit_lower_ch;
        this.form.shirt_sl_left = measurements.shirt_sl_left;
        this.form.shirt_sl_right = measurements.shirt_sl_right;
        this.form.shirt_upper_ch = measurements.shirt_upper_ch;
        this.form.shirt_lower_ch = measurements.shirt_lower_ch;
        this.form.suit_left_cuff = measurements.suit_left_cuff;
        this.form.suit_right_cuff = measurements.suit_right_cuff;
        this.form.shirt_left_cuff = measurements.shirt_left_cuff;
        this.form.shirt_right_cuff = measurements.shirt_right_cuff;
        this.form.shirt_hp = measurements.shirt_hp;
        this.form.shirt_st = measurements.shirt_st;
        this.form.shirt_n = measurements.shirt_n;
        this.form.trouser_uround = measurements.trouser_uround;
        this.form.master_name = measurements.master_name;
        this.form.meas_taken_by = measurements.meas_taken_by;
        this.form.title    = measurements.title;
        this.form.remark    = measurements.remark;
        this.form.backshape = measurements.backshape;
        this.form.stomach = measurements.stomach;
        this.form.shoulder = measurements.shoulder;
        this.form.fit_type = measurements.fit_type;
        this.form.front_captured_img = measurements.front_captured_img;
        this.form.back_captured_img = measurements.back_captured_img;
        this.form.side_captured_img = measurements.side_captured_img;
        this.form.storage_path = res.storage_path;
        
        // this.form.button = measurements.button;
        // this.form.lapel = measurements.lapel;
        // this.form.vent = measurements.vent;
        // this.form.pocket = measurements.pocket;
        // this.form.jodhpuri = measurements.jodhpuri;
        // this.form.type = measurements.type;
        // this.form.pleat = measurements.pleat;
        // this.form.pocket_type = measurements.pocket_type;
        // this.form.back_pocket = measurements.back_pocket;
        // this.form.shape = measurements.shape;
        // this.form.cut_way = measurements.cut_way;
        // this.form.collar_type = measurements.collar_type;
        // this.form.placket = measurements.placket;
        // this.form.cuff_type = measurements.cuff_type;
        // this.form.other = measurements.other;
        // this.form.shape_type = measurements.shape_type;
        // this.form.fit_type = measurements.fit_type;
        // this.form.title    = measurements.title;
      },
      (err) => console.log('Error ', err)
    );
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
        this.frontMeasurementImgStatus = 'updated';
      } else if (data.position == 'back') {
        this.backMeasurementImgUrl = data.imageAsDataUrl;
        this.backMeasurementImgBase64 = data.imageAsBase64;
        this.backMeasurementImgStatus = 'updated';
      }
      else if (data.position == 'side') {
        this.sideMeasurementImgUrl = data.imageAsDataUrl;
        this.sideMeasurementImgBase64 = data.imageAsBase64;
        this.sideMeasurementImgStatus = 'updated';
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

  deleteMeasurementImg(position: any)
  {
    if(!confirm('Are you sure to Delete?'))
      return;

      if (position == 'front') {
        this.form.front_captured_img = null;
        this.frontMeasurementImgStatus = "deleted";
        this.frontMeasurementImgBase64 = null;

      } else if (position == 'back') {
        this.form.back_captured_img = null;
        this.backMeasurementImgStatus = "deleted";
        this.backMeasurementImgBase64 = null;
      }
      else if (position == 'side') {
        this.form.side_captured_img = null;
        this.sideMeasurementImgStatus = "deleted";
        this.sideMeasurementImgBase64 = null;
      }
  }

  goBack(): void {
    this.location.back();
  }

}
