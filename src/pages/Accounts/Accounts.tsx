import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../utils/makeRequest';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = await makeRequest.get('/api/users/1/accounts');
            console.log('res', res)
            setAccounts(res.data);
        };

        fetchAccounts();
    }, []);


    return (
        <div className="account">
            <h1>Accounts</h1>
            {accounts.map((account) => (
                <div>

                </div>
            ))}
        </div>
    );
};

export default Accounts;
