
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SideNavComponent } from './core/side-nav/side-nav.component';
import { SigninComponent } from './core/signin/signin.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';

import { AuthGuard } from './auth/services/auth.guard';
import { AuthenticationService } from './auth/services/authentication.service';
import { LoaderService } from './auth/services/loader.service';
import { AuthTokenInterceptor } from './auth/services/authToken.service';
import { LoaderInterceptor } from './auth/services/loader.interceptor';
import { RolesComponent } from './components/roles/roles.component';
import { RolesService } from './services/roles.service';
import { RoleCreateComponent } from './components/roles/role-create/role-create.component';
import { UsersComponent } from './components/users/users.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
import { CommonService } from './services/common.service';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { from } from 'rxjs';
import { CustomerViewComponent } from './components/customers/customer-view/customer-view.component';
import { OverviewComponent } from './components/customers/overview/overview.component';
import { CustomerVisitsComponent } from './components/customers/customer-visits/customer-visits.component';
import { CustomerOrdersComponent } from './components/customers/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { PrescriptionCreateComponent } from './components/prescriptions/prescription-create/prescription-create.component';
import { ChatComponent } from './components/chat/chat.component';
import { PrescriptionService } from './services/prescription.service';
import { OrderProductsComponent } from './components/orders/order-products/order-products.component';
import { OrderPlaceComponent } from './components/orders/order-place/order-place.component';
import { InventoryCreateComponent } from './components/inventory/inventory-create/inventory-create.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { StoremanagersComponent } from './components/storemanagers/storemanagers.component';
import { SupervisorsComponent } from './components/supervisors/supervisors.component';
import { TailorsComponent } from './components/tailors/tailors.component';
import { MeasurmentsComponent } from './components/measurments/measurments.component';
import { AddmeasurmentsComponent } from './components/addmeasurments/addmeasurments.component';
import { TailorCreateComponent } from './components/tailors/tailor-create/tailor-create.component';
import { TailorOrdersComponent } from './components/tailor-orders/tailor-orders.component';
import { TailorOrderViewComponent } from './components/tailor-orders/tailor-order-view/tailor-order-view.component';
import { SupervisorOrderViewComponent } from './components/supervisor-order-view/supervisor-order-view.component';
import { ItemStatusViewComponent } from './components/orders/item-status-view/item-status-view.component';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './components/camera/camera.component';
import { StyleComponent } from './components/orders/style/style.component';
import { UpdatemeasurementComponent } from './components/updatemeasurement/updatemeasurement.component';
import { CameraMeasurementComponent } from './components/camera-measurement/camera-measurement.component';
import  { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardDefaultComponent } from './components/dashboard/dashboard-default/dashboard-default.component';

import { SalesEmployeesComponent } from './components/sales-employees/sales-employees.component';
import { SalesEmployeeCreateComponent } from './components/sales-employees/sales-employee-create/sales-employee-create.component';
import { TailorsDashboardComponent } from './components/tailors-dashboard/tailors-dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CustomerMeasurementsComponent } from './components/customers/customer-measurements/customer-measurements.component';
import { MeasurementsListComponent } from './components/measurements-list/measurements-list.component';
import { OnlinePaymentsComponent } from './components/online-payments/online-payments.component';
import { OrderReportComponent } from './components/order-report/order-report.component';
import { DataTablesModule } from 'angular-datatables';
import { MatInputModule } from "@angular/material/input";
import { ReportSalesemployeeComponent } from './components/report-salesemployee/report-salesemployee.component';
import { CancelOrderComponent } from './components/cancel-order/cancel-order.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
import { UpdateRemarksDialogComponent } from './update-remarks-dialog/update-remarks-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    SigninComponent,
    PageNotFoundComponent,
    DefaultComponent,
    DashboardComponent,
    AccessDeniedComponent,
    RolesComponent,
    RoleCreateComponent,
    UsersComponent,
    UserCreateComponent,
    ProductsComponent,
    CustomersComponent,
    SupplierComponent,
    CustomerCreateComponent,
    ProductCreateComponent,
    CustomerViewComponent,
    OverviewComponent,
    CustomerVisitsComponent,
    CustomerOrdersComponent,
    OrdersComponent,
    OrderCreateComponent,
    PrescriptionsComponent,
    PrescriptionCreateComponent,
    ChatComponent,
    OrderProductsComponent,
    OrderPlaceComponent,
    InventoryCreateComponent,
    InventoryComponent,
    ItemsComponent,
    StoremanagersComponent,
    SupervisorsComponent,
    TailorsComponent,
    MeasurmentsComponent,
    AddmeasurmentsComponent,
    TailorCreateComponent,
    TailorOrdersComponent,
    TailorOrderViewComponent,
    SupervisorOrderViewComponent,
    ItemStatusViewComponent,
    CameraComponent,
    StyleComponent,
    UpdatemeasurementComponent,
    CameraMeasurementComponent,
    DashboardAdminComponent,
    DashboardDefaultComponent,
    SalesEmployeesComponent,
    SalesEmployeeCreateComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CustomerMeasurementsComponent,
    TailorsDashboardComponent,
    MeasurementsListComponent,
    OnlinePaymentsComponent,
    OrderReportComponent,
    ReportSalesemployeeComponent,
    CancelOrderComponent,
    CompleteOrderComponent,
    UpdateRemarksDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    WebcamModule,
    DataTablesModule,
    MatInputModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    RolesService,
    CommonService,
    PrescriptionService,
  ],
  bootstrap: [
    AppComponent,
    // AlertsComponent
  ]
})
export class AppModule { }
