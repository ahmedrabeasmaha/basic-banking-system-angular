import { Transfer } from './transfer';

export interface Customer {
  id: number;
  name: string;
  email: string;
  balance: number;
  account_number: number;
  transfers?: {
    amount: number;
    created_at: Date;
    to_customer: {
      account_number: number;
    };
    from_customer: {
      account_number: number;
    };
  }[];
}
