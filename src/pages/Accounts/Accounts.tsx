import React, {useState, useEffect} from 'react';
import {makeRequest} from '../../utils/makeRequest';
import {Account} from "../../types/account";
import AccountCard from "../../components/AccountCard/AccountCard";
import './Accounts.scss';
import {getUserFromLocalStorage} from "../../utils/localStorageUtils";

const Accounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchAccounts = async () => {
            const user = getUserFromLocalStorage()
            const res = await makeRequest.get(`/api/users/${user.id}/accounts/`);
            setAccounts(res.data as Account[]);
            setIsLoading(false)
        };

        fetchAccounts();
    }, []);


    return (
        <div className="account-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                accounts.length > 0 ? (
                    accounts.map((account) => (
                        <AccountCard account={account} key={account.id}/>
                    ))
                ) : (
                    <p>No accounts to display</p>
                )
            )}
        </div>
    );
};

export default Accounts;
