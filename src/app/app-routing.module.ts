import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { ErrorComponent } from './components/error/error.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'transfer/:id', component: TransferComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
