import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updateOrderStatus(orderId: number, arg1: string) {
    throw new Error('Method not implemented.');
  }
  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http:HttpClient,
      private router:Router) { }

  public getProducts(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/productslist?${params.toString()}`,{ params: ""});
  }

  public storeProduct(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/product-store`,params);
  }

  public createProduct():Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/product-create`);
  }

  public showProduct(id:number):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/product-show/${id}`,id);
  }

  public updateProduct(id:number,params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/product-update/${id}`,params);
  }

  public deleteProduct(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/product/delete`,params);
  }

  public productAddToCart(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cart-store`,params)
  }

  public getCarts(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cartslist?${params.toString()}`,{ params: ""});
  }

  public updateCart(id:number,params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cart-update/${id}`,params);
  }

  public updateCartPrice(id:number,params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cart-price-update/${id}`,params);
  }

  public deletecart( params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cart-delete`,params);
  }
  public addLensToCart(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/lenscart-store`,params);
  }

  public addMeasurementsToCart(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/lensmeasurementscart-store`,params);
  }

  public showCart(id:number):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/cart-show/${id}`,id);
  }

  public getOrders(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/orderslist?${params.toString()}`,{ params: ""});
  }

  // public customerOrders(params:any = ""):Observable<any>{
  //   return this.http.post(`${this.REST_API_SERVER}/orderslist?${params.toString()}`,{ params: ""});
  // }

  public getTailorOrders(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/tailor-orders?${params.toString()}`,{ params: ""});
  }

  public getTailorOrderView(orderId: any, params:any):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/tailor-order-view/${orderId}`,params);
  }

  public storeOrder(params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/order-store`,params);
  }
  public showOrder(id:number):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/order-show/${id}`,id);
  }

  public showOrderDetails(id:number):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/order-show-details/${id}`,id);
  }
  public updateOrder(id:number,params):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/order-update/${id}`,params);
  }

  public checkCartProductMeasurement(customerId: string):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/check-cart-measurement/${customerId}`)
  }
  public getOrderItemStatuses(orderItemId: number):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/order-item-statuses/${orderItemId}`)
  }
  public clearAllCartItems(customerId:string):Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/clear-cart-items/${customerId}`)
  }

  public getSaleEmployees():Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/sales-employees`);
  }

  public updateCartSalesEmployee(cartId:number, params:any):Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/update-cart-saleemployee/${cartId}`,params);
  }

  public updateCartAdditionalOption(cartId:number, params:any):Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/cart-additional-option/${cartId}`,params);
  }

  public updateAdditionalCostAppliedAll(customerId:number, params:any):Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/cart-all-additional-option/${customerId}`,params);
  }

  public updateOrderSalesEmployee(orderItemId:number, params:any):Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/update-orderitem-saleemployee/${orderItemId}`,params);
  }

  public UpdateInvioceRemarks(orderId:number, params:any):Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/invoice-remarks-update/${orderId}`,params);
  }

  public generateSalesInvoice(orderId:number, sendMessageStatus: any):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/generate-salesinvoice-pdf/${orderId}/${sendMessageStatus}`);
  }

  public generateSalesOrder(orderId:number, sendMessageStatus: any):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/generate-salesorders-pdf/${orderId}/${sendMessageStatus}`);
  }

  public generateSaleOrderCopyOnly(orderId:number, sendMessageStatus: any):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/generate-salesorders-pdf-only/${orderId}/${sendMessageStatus}`);
  }

  // public cancelOrder(orderId: any): Observable<any> {
  //   return this.http.delete(`${this.REST_API_SERVER}/cancelorder/${orderId}`);
  // }
  public cancelOrder(orderId: any): Observable<any> {
    return this.http.put(`${this.REST_API_SERVER}/cancel/${orderId}`,orderId);
  }


  public updateProductStyles(customerId: any, params:any):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cart/update-related-product-style/${customerId}`,params);
  }

  public Storecancelordermessage(params:any,orderId: number):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/cancel-order/${orderId}`,params);
  }

  public StorecompleteOrderMessage(params:any,orderId: number):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/complete-order/${orderId}`,params);
  }




}
