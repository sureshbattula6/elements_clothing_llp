import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { StyleService } from '../../../services/style.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css'],
})
export class StyleComponent implements OnInit {
  @Input() cart: any;


  order_item: any;
  orderId: any;
  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private styleService: StyleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getstyles();
    this.orderId = this.route.snapshot.paramMap.get('orderId');

  }

  public style: any;

  form: any = {
    button: '',
    lapel: '',
    vent: '',
    pocket: '',
    jodhpuri: '',
    type: '',
    pleat: '',
    pocket_type: '',
    back_pocket: '',
    shape: '',
    cut_way: '',
    collar_type: '',
    placket: '',
    cuff_type: '',
    other: '',
    shape_type: '',
    fit_type: '',
    remark: '',
  };

  getstyles() {
    let style_id = this.route.snapshot.paramMap.get('id');
    this.styleService.getstyles(style_id).subscribe(
      (res: any) => {
        const style = res.data.styles;
        this.form.button = style.button;
        this.form.lapel = style.lapel;
        this.form.vent = style.vent;
        this.form.pocket = style.pocket;
        this.form.jodhpuri = style.jodhpuri;
        this.form.type = style.type;
        this.form.pleat = style.pleat;
        this.form.pocket_type = style.pocket_type;
        this.form.back_pocket = style.back_pocket;
        this.form.shape = style.shape;
        this.form.cut_way = style.cut_way;
        this.form.collar_type = style.collar_type;
        this.form.placket = style.placket;
        this.form.cuff_type = style.cuff_type;
        this.form.other = style.other;
        this.form.shape_type = style.shape_type;
        this.form.fit_type = style.fit_type;
        this.form.remark = style.remark;
      },
      (err) => console.log('Error ', err)
    );
  }

  title = 'html-to-pdf-angular-application';
  public convetToPDF() {
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
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('styles.pdf'); // Generated PDF
    });
  }

  goBack(): void {
    this.location.back();
  }
}
