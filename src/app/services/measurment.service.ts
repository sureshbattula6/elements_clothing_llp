import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurmentService {

  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http:HttpClient,
      private router:Router) { }

  // public getMeasurments(params:any = ""):Observable<any>{
  //   return this.http.post(`${this.REST_API_SERVER}/measurmentslist?${params.toString()}`,{ params: ""});
  // }

  public storeMeasurment(customer_id: any,cartId :any,title:any, remark:any, suit_fl :any, suit_bl:any, suit_suitl:any, suit_knl:any, suit_wl:any, suit_sh:any, suit_nsh:any, suit_sl:any, suit_st:any, suit_h:any, suit_cf:any, suit_cb:any, suit_bicep:any, suit_hb:any, suit_hf:any, suit_n:any, shirt_l:any, shirt_kl:any, shirt_sl:any, shirt_arm:any, shirt_farm:any, shirt_cuff:any, trouser_l:any, trouser_w:any, trouser_h:any, trouser_fth:any, trouser_kn:any, trouser_b:any, trouser_hl:any, trouser_bal:any, backshape:any, stomach:any, shoulder:any, button:any, lapel:any, vent:any, pocket:any, jodhpuri:any, type:any, pleat:any, pocket_type:any, back_pocket:any, shape:any, cut_way:any, collar_type:any, placket:any, cuff_type:any, other:any, shape_type:any, fit_type:any, trouser_calf_round:any,trouser_crotch_length:any,suit_sl_left:any, suit_sl_right:any, suit_upper_ch:any, suit_lower_ch: any, shirt_sl_left: any, shirt_sl_right:any, shirt_upper_ch:any, shirt_lower_ch:any, suit_left_cuff:any, suit_right_cuff:any, shirt_left_cuff:any, shirt_right_cuff:any,shirt_hp: any, shirt_st: any, shirt_n: any,trouser_uround:any, master_name : any, meas_taken_by: any, front_captured_img: any, back_captured_img: any, side_captured_img: any): Observable<any> {

    return this.http.post(`${this.REST_API_SERVER}/measurment-store`, {
      customer_id, cartId, title, remark,suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left,suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp, shirt_st, shirt_n,trouser_uround,master_name, meas_taken_by, front_captured_img, back_captured_img, side_captured_img
    });
    }

    //updateMeasurements(
    //  id: number, customer_id: any, cartId: any, title: any, remark: any, suit_fl: any, suit_bl: any, suit_suitl: any,
    //  suit_knl: any, suit_wl: any, suit_sh: any, suit_nsh: any, suit_sl: any, suit_st: any, suit_h: any, suit_cf: any,
    //  suit_cb: any, suit_bicep: any, suit_hb: any, suit_hf: any, suit_n: any, shirt_l: any, shirt_kl: any, shirt_sl: any,
    //  shirt_arm: any, shirt_farm: any, shirt_cuff: any, trouser_l: any, trouser_w: any, trouser_h: any, trouser_fth: any,
    //  trouser_kn: any, trouser_b: any, trouser_hl: any, trouser_bal: any, backshape: any, stomach: any, shoulder: any,
    //  button: any, lapel: any, vent: any, pocket: any, jodhpuri: any, type: any, pleat: any, pocket_type: any,
    //  back_pocket: any, shape: any, cut_way: any, collar_type: any, placket: any, cuff_type: any, other: any,
    //  shape_type: any, fit_type: any, trouser_calf_round: any, trouser_crotch_length: any, suit_sl_left: any,
    //  suit_sl_right: any, suit_upper_ch: any, suit_lower_ch: any, shirt_sl_left: any, shirt_sl_right: any,
    //  shirt_upper_ch: any, shirt_lower_ch: any, suit_left_cuff: any, suit_right_cuff: any, shirt_left_cuff: any,
    //  shirt_right_cuff: any, shirt_hp: any, shirt_st: any, shirt_n: any, trouser_uround: any, master_name: any,
    //  meas_taken_by: any, front_captured_img: any, back_captured_img: any, side_captured_img: any , 
    //): Observable<any> {
    //  return this.http.put(`${this.REST_API_SERVER}/measurement-updates/${id}`, {
    //    customer_id, cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl,
    //    suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm,
    //    shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl,
    //    trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type,
    //    back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round,
    //    trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right,
    //    shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp,
    //    shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by, front_captured_img, back_captured_img,
    //    side_captured_img
    //  });
    //}
  
    updateMeasurements(
      id: number, customer_id: any, cartId: any, title: any, remark: any, suit_fl: any, suit_bl: any, suit_suitl: any,
      suit_knl: any, suit_wl: any, suit_sh: any, suit_nsh: any, suit_sl: any, suit_st: any, suit_h: any, suit_cf: any,
      suit_cb: any, suit_bicep: any, suit_hb: any, suit_hf: any, suit_n: any, shirt_l: any, shirt_kl: any, shirt_sl: any,
      shirt_arm: any, shirt_farm: any, shirt_cuff: any, trouser_l: any, trouser_w: any, trouser_h: any, trouser_fth: any,
      trouser_kn: any, trouser_b: any, trouser_hl: any, trouser_bal: any, backshape: any, stomach: any, shoulder: any,
      button: any, lapel: any, vent: any, pocket: any, jodhpuri: any, type: any, pleat: any, pocket_type: any,
      back_pocket: any, shape: any, cut_way: any, collar_type: any, placket: any, cuff_type: any, other: any,
      shape_type: any, fit_type: any, trouser_calf_round: any, trouser_crotch_length: any, suit_sl_left: any,
      suit_sl_right: any, suit_upper_ch: any, suit_lower_ch: any, shirt_sl_left: any, shirt_sl_right: any,
      shirt_upper_ch: any, shirt_lower_ch: any, suit_left_cuff: any, suit_right_cuff: any, shirt_left_cuff: any,
      shirt_right_cuff: any, shirt_hp: any, shirt_st: any, shirt_n: any, trouser_uround: any, master_name: any,
      meas_taken_by: any, front_captured_img_status: any, front_captured_img: any, back_captured_img_status: any,
      back_captured_img: any, side_captured_img_status: any, side_captured_img: any
  ): Observable<any> {
      const payload: any = {
          customer_id, cartId, title, remark, suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl,
          suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm,
          shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl,
          trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type,
          back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round,
          trouser_crotch_length, suit_sl_left, suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right,
          shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff, shirt_hp,
          shirt_st, shirt_n, trouser_uround, master_name, meas_taken_by,
          front_captured_img_status, back_captured_img_status, side_captured_img_status
      };
  
      if (front_captured_img_status === 'updated') {
          payload.front_captured_img = front_captured_img;
      }
  
      if (back_captured_img_status === 'updated') {
          payload.back_captured_img = back_captured_img;
      }
  
      if (side_captured_img_status === 'updated') {
          payload.side_captured_img = side_captured_img;
      }
  
      return this.http.put(`${this.REST_API_SERVER}/measurement-updates/${id}`, payload);
  }
  

    public updatestoremeasurement
      (customer_id: any,cartId :any,title:any, remark:any, suit_fl :any, suit_bl:any, suit_suitl:any, suit_knl:any, suit_wl:any, suit_sh:any, suit_nsh:any, suit_sl:any, suit_st:any, suit_h:any, suit_cf:any, suit_cb:any, suit_bicep:any, suit_hb:any, suit_hf:any, suit_n:any, shirt_l:any, shirt_kl:any, shirt_sl:any, shirt_arm:any, shirt_farm:any, shirt_cuff:any, trouser_l:any, trouser_w:any, trouser_h:any, trouser_fth:any, trouser_kn:any, trouser_b:any, trouser_hl:any, trouser_bal:any, backshape:any, stomach:any, shoulder:any, button:any, lapel:any, vent:any, pocket:any, jodhpuri:any, type:any, pleat:any, pocket_type:any, back_pocket:any, shape:any, cut_way:any, collar_type:any, placket:any, cuff_type:any, other:any, shape_type:any, fit_type:any, trouser_calf_round:any,trouser_crotch_length:any,suit_sl_left:any, suit_sl_right:any, suit_upper_ch:any, suit_lower_ch: any, shirt_sl_left: any, shirt_sl_right:any, shirt_upper_ch:any, shirt_lower_ch:any, suit_left_cuff:any, suit_right_cuff:any, shirt_left_cuff:any, shirt_right_cuff:any,shirt_hp: any, shirt_st: any, shirt_n: any,trouser_uround:any, master_name : any, meas_taken_by: any,  front_captured_img:any, front_captured_img_status: any, back_captured_img:any, back_captured_img_status: any, side_captured_img:any, side_captured_img_status: any): Observable<any> {

        return this.http.post(`${this.REST_API_SERVER}/measurment-updatecreate` , {
          customer_id, cartId, title, remark,suit_fl, suit_bl, suit_suitl, suit_knl, suit_wl, suit_sh, suit_nsh, suit_sl, suit_st, suit_h, suit_cf, suit_cb, suit_bicep, suit_hb, suit_hf, suit_n, shirt_l, shirt_kl, shirt_sl, shirt_arm, shirt_farm, shirt_cuff, trouser_l, trouser_w, trouser_h, trouser_fth, trouser_kn, trouser_b, trouser_hl, trouser_bal, backshape, stomach, shoulder, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, trouser_calf_round, trouser_crotch_length, suit_sl_left,suit_sl_right, suit_upper_ch, suit_lower_ch, shirt_sl_left, shirt_sl_right, shirt_upper_ch, shirt_lower_ch, suit_left_cuff, suit_right_cuff, shirt_left_cuff, shirt_right_cuff,shirt_hp, shirt_st, shirt_n,trouser_uround, master_name, meas_taken_by, front_captured_img, front_captured_img_status,back_captured_img, back_captured_img_status, side_captured_img, side_captured_img_status
        });
    }



  public measurementList(customerId: any) {
    return this.http.get(`${this.REST_API_SERVER}/measurmentslist/${customerId}`);
  }

  public measurementUpdate(id: any, measurmentId: any) {
    return this.http.post(`${this.REST_API_SERVER}/measurment-update/${id}`, measurmentId);
  }

  public measurementUpdateOrderItems(orderId: any, param: any) {
    return this.http.post(`${this.REST_API_SERVER}/measurment-update-orderItems/${orderId}`, param);
  }

  public getmeasurement(id:any):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/measurment-show/${id}`,id);
  }

  public customermeasurement(customerId: any) {
    return this.http.get(`${this.REST_API_SERVER}/cart-customer-measurement/${customerId}`);
  }

  public customermeasurements(customerId: any) {
    return this.http.get(`${this.REST_API_SERVER}/customer-measurement/${customerId}`);
  }

  // public getmeasurementList(params:any = ""):Observable<any>{
  //   return this.http.post(`${this.REST_API_SERVER}/measurments?${params.toString()}`,{ params: ""});
  // }

  public getmeasurementList(customerId: any) {
    return this.http.get(`${this.REST_API_SERVER}/customer-measurements/${customerId}`);
  }

  public getAllMeasurementsList(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/measurements-list?${params.toString()}`,{ params: ""});
  }

}
