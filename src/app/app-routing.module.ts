import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './core/signin/signin.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthGuard } from './auth/services/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CustomerCreateComponent } from './components/customers/customer-create/customer-create.component';
import { CustomerViewComponent } from './components/customers/customer-view/customer-view.component';
import { OverviewComponent } from './components/customers/overview/overview.component';
import { CustomerVisitsComponent } from './components/customers/customer-visits/customer-visits.component';
import { CustomerOrdersComponent } from './components/customers/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { ChatComponent } from './components/chat/chat.component';
import { OrderProductsComponent } from './components/orders/order-products/order-products.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { OrderPlaceComponent } from './components/orders/order-place/order-place.component';
import { OrderCreateComponent } from './components/orders/order-create/order-create.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { StoremanagersComponent } from './components/storemanagers/storemanagers.component';
import { SupervisorsComponent } from './components/supervisors/supervisors.component';
import { TailorsComponent } from './components/tailors/tailors.component';
import { MeasurmentsComponent } from './components/measurments/measurments.component';
import { AddmeasurmentsComponent } from './components/addmeasurments/addmeasurments.component';
import { TailorOrdersComponent } from './components/tailor-orders/tailor-orders.component';
import { TailorOrderViewComponent } from './components/tailor-orders/tailor-order-view/tailor-order-view.component';
import { SupervisorOrderViewComponent } from './components/supervisor-order-view/supervisor-order-view.component';
import { CameraComponent } from './components/camera/camera.component';
import { StyleComponent } from './components/orders/style/style.component';
import { UpdatemeasurementComponent } from './components/updatemeasurement/updatemeasurement.component';
import { SalesEmployeesComponent } from './components/sales-employees/sales-employees.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerMeasurementsComponent } from './components/customers/customer-measurements/customer-measurements.component';
import { TailorsDashboardComponent } from './components/tailors-dashboard/tailors-dashboard.component';
import { MeasurementsListComponent } from './components/measurements-list/measurements-list.component';
import { OnlinePaymentsComponent } from './components/online-payments/online-payments.component';
import { OrderReportComponent } from './components/order-report/order-report.component';
import { ReportSalesemployeeComponent } from './components/report-salesemployee/report-salesemployee.component';
// let user_details = JSON.parse(localStorage.getItem('user_details'));

// const USER_ROLE = user_details.role_id;

const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'login' },
  { path:'login', component:SigninComponent },
  { path:'dashboard', canActivate: [AuthGuard], component:DashboardComponent },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    component: RolesComponent,
    // data: {
    //   allowedRoles: [USER_ROLE],
    // }
 },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent},
  { path: 'products',canActivate: [AuthGuard], component: ProductsComponent },
  // { path: 'orders',canActivate: [AuthGuard], component: OrdersComponent },
  { path: 'inventorys',canActivate: [AuthGuard], component: InventoryComponent },
  { path: 'prescriptions',canActivate: [AuthGuard], component: PrescriptionsComponent },
  { path: 'customers',canActivate: [AuthGuard], component: CustomersComponent },


  {
    path: 'customer/:userId',
    canActivate: [AuthGuard],
    component: CustomerViewComponent,
    children: [
      { path: '', pathMatch:'full', redirectTo:'overview'},
      { path: 'overview', component: OverviewComponent },
      { path: 'visits', component: CustomerVisitsComponent },
      { path: 'orders', component: CustomerOrdersComponent },
      { path: 'measurements', component: CustomerMeasurementsComponent},
    ]
 },
  { path: 'suppliers',canActivate: [AuthGuard], component: SupplierComponent },
  // { path: 'admin', canActivate: [AuthGuard], component:DefaultComponent, children: [
  //   { path: '', component:DashboardComponent },
  //   { path: 'dashboard', component:DashboardComponent },
  // ]},
  { path: 'chat', component:ChatComponent },
  { path: 'items', component:ItemsComponent },
  { path: 'storemanagers', component:StoremanagersComponent },
  { path: 'supervisors', component:SupervisorsComponent },
  { path: 'tailors', component:TailorsComponent },
  { path: 'tailor-orders', component:TailorOrdersComponent },
  { path: 'tailor-order-view/:orderId', component:TailorOrderViewComponent },
  { path: 'measurments/:id/:orderId', component: MeasurmentsComponent },
  
  { path: 'measurments/:id', component:MeasurmentsComponent },
  { path: 'measurements-list', component:MeasurementsListComponent },
  // { path: 'ordermeasurments/:id', component:MeasurmentsComponent },
  // { path: 'addmeasurement/:cartId', component:AddmeasurmentsComponent } ,
  { path: 'addmeasurement/:orderId', component:AddmeasurmentsComponent } ,
  { path: 'addmeasurement', component:AddmeasurmentsComponent } ,
  { path: 'cart', component: CartComponent },
  { path: 'order-products', component:OrderProductsComponent },
  { path: 'order-place/:orderId', component: OrderPlaceComponent},
  { path: 'order-view/:orderId', component: OrderCreateComponent },
  { path: 'supervisor-order-view',component: SupervisorOrderViewComponent},
  { path:'access-denied', component:AccessDeniedComponent },
  { path: 'camera/:cartId', component:CameraComponent },
  { path: 'style/:id/:orderId', component:StyleComponent },
  { path: 'style/:id', component:StyleComponent },
  { path: 'updatemeasurement/:id', component:UpdatemeasurementComponent},
  { path: 'sales-employees', component: SalesEmployeesComponent},
  { path: 'report-sales-employees', component: ReportSalesemployeeComponent},
  { path: 'tailors-dashboard', component: TailorsDashboardComponent},
  { path: 'payments', component: OnlinePaymentsComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'orders', component:OrderReportComponent },
  { path:'**', component:PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
