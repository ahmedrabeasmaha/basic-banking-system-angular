import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from 'src/app/interfaces/transfer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private httpClient: HttpClient) {}

  createTrasfer(data: Transfer): Observable<any> {
    const transfer = this.httpClient.post<Transfer>(
      `${environment.apiUrl}/transfer`,
      data
    );
    return transfer;
  }
}
