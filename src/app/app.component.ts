import {Component, OnInit} from '@angular/core';
import {HttpService} from "./shared/services/httpService";
import {IInvoice} from "./shared/interfaces/IInvoice";
import {DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title = 'הוצאות';
  invoices: IInvoice[];
  dt: Date = new Date();
  year: number;
  month: number;
  imageSrc: any;
  filterType: number;

  constructor(private httpService: HttpService, private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.httpService.invoices().subscribe((response: IInvoice[]) => {
      response.forEach((item: IInvoice) => {
        item._InvoiceDate = new Date(item.createDate).toLocaleDateString();
        item._InvoiceCreate = new Date(item.invoiceDate).toLocaleDateString();
      });
      this.invoices = response;
    });
  }

  onDateChanged(e) {
    this.year = new Date(e).getFullYear();
    this.month = new Date(e).getMonth() + 1;
  }

  getImage(imageData: string){
    return this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }

  onImageSelect(imageData: string) {
    this.imageSrc = this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }
}
