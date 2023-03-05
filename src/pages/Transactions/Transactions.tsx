import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {makeRequest} from "../../utils/makeRequest";
import "./Transactions.scss";
import {Transaction} from "../../types/transaction";

import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {Account} from "../../types/account";

const Transactions = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const showAll: boolean = params.get("show") === "all";

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const account: Account = location.state?.account;

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await makeRequest.get('/api/users/1/transactions');
            setTransactions(res.data as Transaction[]);
        };

        if (showAll) {
            fetchTransactions();
        }

    }, [showAll]);

    useEffect(() => {
        const fetchTransactions = async (account: Account) => {
            const res = await makeRequest.get(`/api/accounts/${account.id}/transactions`);
            setTransactions(res.data as Transaction[]);
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
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Account ID</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.transaction_date}</TableCell>
                                <TableCell>{transaction.transaction_type}</TableCell>
                                <TableCell>{transaction.account_id}</TableCell>
                                <TableCell>{transaction.notes}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
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
