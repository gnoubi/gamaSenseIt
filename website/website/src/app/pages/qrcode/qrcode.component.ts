import { Component, OnDestroy } from '@angular/core';
import { QrcodeReaderService } from './qrcode-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnDestroy {

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
