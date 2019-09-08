import { Injectable } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private listResultsSubject = new Subject<any[]>();
  public listResults$ = this.listResultsSubject.asObservable();


  constructor(private appService: AppServiceService) {

  }

  fetchData() {
    this.appService.fetchLatest().subscribe(
      data => {
        this.listResultsSubject.next(data);
      },
      error => {
        this.listResultsSubject.next(error);
      }
    );
  }
}
