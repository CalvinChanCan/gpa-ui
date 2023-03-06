import React, {useState, useEffect} from 'react';
import {makeRequest} from '../../utils/makeRequest';
import {Account} from "../../types/account";
import AccountCard from "../../components/AccountCard/AccountCard";
import './Accounts.scss';
import {getUserFromLocalStorage} from "../../utils/localStorageUtils";

const Accounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const user = getUserFromLocalStorage()
            const res = await makeRequest.get(`/api/users/${user.id}/accounts/`);
            setAccounts(res.data as Account[]);
        };

        fetchAccounts();
    }, []);


    return (
        <div className="account-container">
            {accounts.map((account) => (
                <AccountCard account={account} key={account.id}/>
            ))}
        </div>
    );
};

export default Accounts;
