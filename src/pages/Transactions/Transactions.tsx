import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {makeRequest} from "../../utils/makeRequest";
import "./Transactions.scss";
import {Transaction} from "../../types/transaction";

import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {Account} from "../../types/account";
import {formatDate, formatAmount, maskAccount} from '../../utils/format';

const Transactions = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const showAll: boolean = params.get("show") === "all";

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const account: Account = location.state?.account;

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await makeRequest.get('/api/users/1/transactions');

            const transactions: Transaction[] = response.data.map((transaction: Transaction) => {
                    return {
                        ...transaction,
                        amount: Number(transaction.amount)
                    }
                }
            )

            setTransactions(transactions);
        };

        if (showAll) {
            fetchTransactions();
        }

    }, [showAll]);

    useEffect(() => {
        const fetchTransactions = async (account: Account) => {
            const response = await makeRequest.get(`/api/accounts/${account.id}/transactions`);
            const transactions: Transaction[] = response.data.map((transaction: Transaction) => {
                    return {
                        ...transaction,
                        amount: Number(transaction.amount)
                    }
                }
            )

            setTransactions(transactions);

        };

        if (account) {
            fetchTransactions(account);
        }

    }, [account]);


    const renderTransactionsTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>ID</TableCell>
                            <TableCell sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Date</TableCell>
                            <TableCell sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Transaction
                                Type</TableCell>
                            <TableCell sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Account ID</TableCell>
                            <TableCell sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>Notes</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell
                                    sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{transaction.id}</TableCell>
                                <TableCell
                                    sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{formatDate(transaction.transaction_date)}</TableCell>
                                <TableCell
                                    sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{transaction.transaction_type}</TableCell>
                                <TableCell
                                    sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{maskAccount(transaction.account.account_id)}</TableCell>
                                <TableCell
                                    sx={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{transaction.notes}</TableCell>
                                <TableCell>{formatAmount(transaction.amount, transaction.transaction_type)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    if (showAll) {
        const component = () => {
            return (
                <div className="transactions-container">
                    <h2>All Transactions</h2>
                    {renderTransactionsTable()}
                </div>
            );
        };
        return component();
    } else if (account) {
        const component = () => {
            return (
                <div className="transactions-container">
                    <h2>Transactions for Account ID {account.account_id}</h2>
                    {renderTransactionsTable()}
                </div>
            );
        };
        return component();
    } else {
        const component = () => {
            return <div className="transactions-container">Transactions</div>;
        };
        return component();
    }
};

export default Transactions;
