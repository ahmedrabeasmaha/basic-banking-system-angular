import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, AfterViewChecked {
  customers: Customer[] = [];
  @Input() page: number = 1;
  itemsPerPage = 10;
  totalItems: number | undefined;
  success: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.['success']) {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 5000);
    }
  }
  ngAfterViewChecked(): void {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers(): void {
    this.customerService.getCustomers(this.page).subscribe({
      next: (value) => {
        this.customers = value.data;
        this.totalItems = value.total;
      },
      error: (err) => {},
    });
  }
}
