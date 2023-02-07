import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    balance: 0,
    account_number: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.customerService.getCustomerTransfers(id).subscribe({
      next: (value) => {
        this.customer = value;
        this.customer.transfers = value.from_customer;
        this.customer.transfers?.push(...value.to_customer);
        this.customer.transfers?.forEach((element: { created_at: Date }) => {
          element.created_at = new Date(element.created_at);
        });
        this.customer.transfers?.sort();
        console.log(this.customer.transfers?.[0]?.created_at?.getFullYear());
      },
      error: (err) => {
        this.router.navigate(['404']);
      },
    });
  }
}
