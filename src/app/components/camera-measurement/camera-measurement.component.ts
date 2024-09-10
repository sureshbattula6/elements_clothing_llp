import { Component, OnInit, Inject } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { WebcamService } from '../../services/webcam.service';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-measurement',
  templateUrl: './camera-measurement.component.html',
  styleUrls: ['./camera-measurement.component.css']
})
export class CameraMeasurementComponent implements OnInit {

  cartId: any;
  position: any = "default";
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  public errors: WebcamInitError[] = [];
  public commentInput;

  // latest snapshot
  public webcamImage!: WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  constructor(
    private WebcamService: WebcamService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CameraMeasurementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.position = data.position;
   }

  // Check if multiple camera devices available
  public ngOnInit(): void {
    this.cartId = this.route.snapshot.paramMap.get('cartId');
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  // Capture Image
  public takeSnapshot(): void {
    this.trigger.next();
  }

  // ON OFF Camera
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  // Switch to next camera device if avaiable
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public takePicture(webcammmImage: WebcamImage): void {
    //console.info('received webcam image', webcammmImage);
    this.webcamImage = webcammmImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get initObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  form: any = {
    comment: null,

    // src    :null,
  };



  //  cartId?:any;


  sendImage(cartId:any) {

    const params = {
      // imageAsBase64: this.webcamImage.imageAsBase64,
      imageAsDataUrl: this.webcamImage.imageAsDataUrl,
      imageAsBase64: this.webcamImage.imageAsBase64,
      position: this.position,
    }
    this.dialogRef.close(params);
  }

  cancel():void{
    this.dialog.closeAll();
  }
}
