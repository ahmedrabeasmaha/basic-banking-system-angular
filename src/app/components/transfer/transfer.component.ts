import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Transfer } from 'src/app/interfaces/transfer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { accountValidator } from 'src/shared/account.validator';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    balance: 0,
    account_number: 0,
  };
  error = {
    message: '',
    code: 0,
  };
  transferForm = new FormGroup({
    fromAccount: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    toAccount: new FormControl('', [Validators.required, accountValidator()]),
    transferAmount: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
  });
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private transferService: TransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.customerService.getCustomer(id).subscribe({
      next: (value) => {
        this.customer = value;
        this.transferAmount?.addValidators(
          Validators.max(this.customer.balance)
        );
      },
      error: (err) => {
        this.router.navigate(['404']);
      },
    });
  }
  createTransfer() {
    if (this.transferForm.valid) {
      const transfer: Transfer = {
        id: parseInt(this.route.snapshot.paramMap.get('id')!),
        from_account: this.customer.account_number,
        to_account: parseInt(this.toAccount?.value!),
        transfer_amount: parseInt(this.transferAmount?.value!),
      };
      this.transferService.createTrasfer(transfer).subscribe({
        next: (value) => {
          this.router.navigate(['/'], {
            state: {
              success: true,
            },
          });
        },
        error: (err) => {
          this.error.message = err.error.message as string;
          this.error.code = err.error.code as number;
        },
      });
    }
  }

  get fromAccount() {
    return this.transferForm.get('fromAccount');
  }
  get toAccount() {
    return this.transferForm.get('toAccount');
  }
  get transferAmount() {
    return this.transferForm.get('transferAmount');
  }
}
