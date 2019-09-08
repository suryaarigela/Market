import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'appKey': 'ECM_RO'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {



  constructor(private http: HttpClient) { }


  fetchLatest() {
    return this.http.get<any[]>('http://76.103.236.188/api/requestMetricsDataFroView/', httpOptions);

  }
}
