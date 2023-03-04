import React, {useState, useEffect} from 'react';
import {makeRequest} from '../../utils/makeRequest';
import {Account} from "../../types/account";
import AccountCard from "../../components/AccountCard/AccountCard";

const Accounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = await makeRequest.get('/api/users/1/accounts');
            console.log('res', res)
            setAccounts(res.data as Account[]);
        };

        fetchAccounts();
    }, []);


    return (
        <div className="account">
            <h1>Accounts</h1>
            {accounts.map((account) => (
                <AccountCard account={account} key={account.id}/>
            ))}
        </div>
    );
};

export default Accounts;
