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
    // this.subscription.unsubscribe();
    console.log('ngOnDestroy actif');
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(url => {
        window.open(url, '_blank'); // '_self'
      });
  }
}
