export interface Transfer {
  id: number;
  from_account: number;
  to_account: number;
  transfer_amount: number;
  date?: string;
}
