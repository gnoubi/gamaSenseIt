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
        this.qrcode.callback = (res) => {
          observer.next(res);
          observer.complete();
        };
        this.qrcode.decode(data);
      };

    });
  }

}
