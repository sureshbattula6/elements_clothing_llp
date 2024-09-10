import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeasurmentService } from 'src/app/services/measurment.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-measurments',
  templateUrl: './measurments.component.html',
  styleUrls: ['./measurments.component.css']
})
export class MeasurmentsComponent implements OnInit {

//   @ViewChild('myForm', {static: false}) myForm: NgForm;
//  public userForm:FormGroup;

public measurementId:number;
public measurement:any;
order_item: any;
  orderId: any;
  order: any;

form: any = {
  suit_fl: "", suit_bl: "", suit_suitl: "", suit_knl: "", suit_wl: "", suit_sh: "", suit_nsh: "", suit_sl: "", suit_st: "",suit_h: "", suit_cf: "", suit_cb: "", suit_bicep: "", suit_hb: "", suit_hf: "", suit_n: "", shirt_l: "", shirt_kl: "", shirt_sl: "", shirt_arm: "", shirt_farm: "", shirt_cuff: "", trouser_l: "", trouser_w: "", trouser_h: "", trouser_fth: "", trouser_kn: "", trouser_b: "", trouser_hl: "", trouser_bal: "", trouser_calf_round: "",  backshape: "", stomach: "", shoulder: "", trouser_crotch_length: "", suit_sl_left: "", suit_sl_right: "",suit_lower_ch: "", suit_upper_ch: "", shirt_sl_left: "", shirt_sl_right: "", shirt_upper_ch: "", shirt_lower_ch: "", suit_left_cuff: "", suit_right_cuff: "", shirt_left_cuff: "", shirt_right_cuff: "", shirt_hp: "",shirt_st: "",shirt_n: "",trouser_uround: "", remark: ""
};
  customer: any;
  orderItems: any;
  customers: any;
  orderItem: any;
  orders: any;


  constructor(
    private measurementService: MeasurmentService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
     this.getCustomerMeasurement();
     
  }

  getCustomerMeasurement() {
    let measurement_id = this.route.snapshot.paramMap.get('id');
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.measurementService.getmeasurement(measurement_id).subscribe(
      (res: any) => {
        const measurements = res.data.measurments;
        this.measurement = measurements;
        // this.orderItem = res.data.orderitems;
        // this.orders = res.data.order;
        this.order_item = res.data.order_items;
        this.order = res.data.order;

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
        this.form.backshape = measurements.backshape;
        this.form.stomach = measurements.stomach;
        this.form.shoulder = measurements.shoulder;
        this.form.fit_type = measurements.fit_type;
        this.form.title    = measurements.title;
        this.form.remark    = measurements.remark;
        this.form.front_captured_img = measurements.front_captured_img;
        this.form.back_captured_img = measurements.back_captured_img;
        this.form.side_captured_img = measurements.side_captured_img;
        this.form.storage_path = res.storage_path;
        // this.form.shoulder = measurements.shoulder;
        // this.form.shoulder = measurements.shoulder;
        // this.form.shoulder = measurements.shoulder;
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

  title = 'html-to-pdf-angular-application';
  public downloadPdf() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, pageHeight);
      pdf.save('order-measurement.pdf'); // Generated PDF

      const pdfBlob = pdf.output('blob');

      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      window.open(pdfUrl);
    });
  }


  goBack(): void {
    this.location.back();
  }
}
