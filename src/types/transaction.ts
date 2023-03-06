import {Account} from "./account";

export interface Transaction {
    id: number;
    transaction_date: string;
    amount: number;
    notes: string;
    transaction_type: "CREDIT" | "DEBIT";
    account: Account
}
