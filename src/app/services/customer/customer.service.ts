import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { Paginate } from 'src/app/interfaces/paginate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  getCustomers(page: number): Observable<Paginate<Customer>> {
    const customers = this.httpClient.get<Paginate<Customer>>(
      `${environment.apiUrl}/all-customers?page=${page}`
    );
    return customers;
  }
  getCustomer(id: number): Observable<Customer> {
    const customer = this.httpClient.get<Customer>(
      `${environment.apiUrl}/customer?id=${id}`
    );
    return customer;
  }
  getCustomerTransfers(id: number): Observable<any> {
    const customer = this.httpClient.get<any>(
      `${environment.apiUrl}/customer-transfers?id=${id}`
    );
    console.log(customer);
    return customer;
  }
}
