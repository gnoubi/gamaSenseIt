import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QrcodeReaderService {

  qrcode: any;

  decode(file: any): Observable<string> {
    return new Observable(observer => {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        const data = e.target.result;
        if ( this.qrcode ) {
          console.log(typeof this.qrcode);
          this.qrcode.callback = (res) => {
            observer.next(res);
            observer.complete();
          };
          this.qrcode.decode(data);
        } else {
          console.log('qrcode undefined')
        }
      };

    });
  }

  functio(res,obs){
    obs.next(res);
    obs.complete();
  }

  callbackfn = (res,obs) => {
    obs.next(res);
    obs.complete();
  };
}
