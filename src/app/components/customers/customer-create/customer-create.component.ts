import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CURRENT_PAGE, GET_ALL } from '../../../shared/constants/pagination.contacts';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { RolesService } from '../../../services/roles.service';
import { Role } from '../../../shared/models/Role';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { Map } from 'mapbox-gl';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  /** USING THIS TO RESET FORM  WITH OUT SHOWING FORMVALIDAITON ERRORS**/
  @ViewChild('myForm', {static: false}) myForm: NgForm;
 public customerForm:FormGroup;


 public roles:Role[];
 public countries:any[];
 public page_length:number = GET_ALL;
 public current_page:number = CURRENT_PAGE;

 public customerId:number = undefined;

 
 public buttonText:string = "Create";

 public uploadType:string ="customer";


  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private fb:FormBuilder,
    private router: Router,
    private rolesService:RolesService,
    private customerService:CustomerService,
    private authenticationService:AuthenticationService,
) {
     this.customerId = data.id;
    }

  ngOnInit(): void {
    this.createcustomerForm();
    this.getCustomerData();
   
  }



  getCustomerData():void{

    if(this.customerId == undefined){
      this.customerService.createCustomer().subscribe(
        (res:any)=>{
            this.countries = res.data.countries;
        }
      )
    }else{
      this.buttonText = "Update";
      this.customerService.showCustomer(this.customerId).subscribe(
        (res:any)=>{
            this.countries = res.data.countries;
            let customer = res.data.customer;

            this.customerForm.patchValue({
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              code: customer.code,
              profession: customer.profession,
              alternate_phone: customer.alternate_phone,
              date_of_birth: customer.date_of_birth,
              age: customer.age,
              doa: customer.doa,
              life_style: customer.life_style,
              address: customer.address,
              nearby: customer.nearby,
              city: customer.city,
              state: customer.state,
              country_id: customer.country_id,
              images: customer.images,
              gst: customer.gst,             
            });
        }
      )
    }

  }

  createcustomerForm(){
    this.customerForm = this.fb.group({
      name: ['',[Validators.required]],
    
      email: [''],
      
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') 
      ],
    ],

      code:  [''],
      profession:  [''],
      alternate_phone:  [''],
      date_of_birth:  [''],
      age:  [''],
      doa:  [''],
      life_style:  [''],
      address:  [''],
      nearby:  [''],
      city:  [''],
      state:  [''],
      country_id:  [''],
      images: [''],
      gst: ['']
    
    })

  }



  get formValidate(){
    return this.customerForm.controls;
  }

  addAttachment(fileName:any){
    this.customerForm.patchValue({images: fileName})
  }

  

  customerFormSubmit(){

    if(this.customerForm.invalid){
      return;
    }

    var storeId = this.authenticationService.getStoreId(); 
    const formData = { ...this.customerForm.value, store_id: storeId };
  
    console.log('Store ID:', storeId);

    if(this.customerId == undefined){
      this.customerService.storeCustomer(formData).subscribe(
        (response)=>{
          this.cancel();

          const customerId = response.data.id;

          this.authenticationService.setCustomerId(customerId);
            this.customerForm.reset();
            this.myForm.resetForm();
            this.commonService.openAlert(response.message);
            this.createcustomerForm();
            this.router.navigate(['/order-products'] ,customerId);
        },
        (err)=>{

            if (err instanceof HttpErrorResponse) {
              if(err.status === 422) {
                const validatonErrors = err.error.errors;
                Object.keys(validatonErrors).forEach( prop => {
                  const formControl = this.customerForm.get(prop);
                  if(formControl){
                    if (prop === 'phone' && validatonErrors[prop] === 'The phone number is already exists .'){
                          formControl.setErrors({
                            serverError: 'Phone number is already exists.'

                          })
                    }
                    formControl.setErrors({
                      serverError: validatonErrors[prop]
                    });
                  }
                });
              }
            }
        }
      )

    }else{
      this.customerService.updateCustomer(this.customerId,this.customerForm.value).subscribe(
        (response)=>{
            this.commonService.openAlert(response.message);
            this.cancel();
        },
        (err)=>{
            if (err instanceof HttpErrorResponse) {
              if(err.status === 422) {
                const validatonErrors = err.error.errors;
                Object.keys(validatonErrors).forEach( prop => {
                  const formControl = this.customerForm.get(prop);
                  if(formControl){
                    formControl.setErrors({
                      serverError: validatonErrors[prop]
                    });
                  }
                });
              }
            }
        }
      )
    }
  }

  cancel():void{
    this.dialog.closeAll();
  }

}
