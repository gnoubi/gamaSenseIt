import { Component, OnDestroy } from '@angular/core';
import { QrcodeReaderService } from './qrcode-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-qrcode',
  templateUrl: './upload-qrcode.component.html',
  styleUrls: ['./upload-qrcode.component.css']
})
export class UploadQrcodeComponent implements OnDestroy {

    subscription: Subscription;

    constructor(private qrReader: QrcodeReaderService) { }

    ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    onFileChange(event) {
      const file = event.target.files[0];
      this.subscription = this.qrReader.decodeService(file)
        .subscribe(url => {
          window.open(url, '_blank');
        });
    }
}
