import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {makeRequest} from "../../utils/makeRequest";
import "./Transactions.scss";
import {Transaction} from "../../types/transaction";

import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {Account} from "../../types/account";
import {formatDate, formatAmount, maskAccount} from '../../utils/format';
import {getUserFromLocalStorage} from "../../utils/localStorageUtils";

const Transactions = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const showAll: boolean = params.get("show") === "all";

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const account: Account = location.state?.account;

    useEffect(() => {
        const fetchTransactions = async () => {
            const user = getUserFromLocalStorage()
            const response = await makeRequest.get(`/api/users/${user.id}/transactions/`);

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
            const response = await makeRequest.get(`/api/accounts/${account.id}/transactions/`);
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

    const columnLine = {borderRight: "1px solid rgba(224, 224, 224, 1)"}
    const renderTransactionsTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={columnLine}>ID</TableCell>
                            <TableCell sx={columnLine}>Date</TableCell>
                            <TableCell sx={columnLine}>Transaction
                                Type</TableCell>
                            <TableCell sx={columnLine}>Account ID</TableCell>
                            <TableCell sx={columnLine}>Notes</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell
                                    sx={columnLine}>{transaction.id}</TableCell>
                                <TableCell
                                    sx={columnLine}>{formatDate(transaction.transaction_date)}</TableCell>
                                <TableCell
                                    sx={columnLine}>{transaction.transaction_type}</TableCell>
                                <TableCell
                                    sx={columnLine}>{maskAccount(transaction.account.account_id)}</TableCell>
                                <TableCell
                                    sx={columnLine}>{transaction.notes}</TableCell>
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
