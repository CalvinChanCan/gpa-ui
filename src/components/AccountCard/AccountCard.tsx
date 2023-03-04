import * as React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {Account} from '../../types/account';

interface AccountCardProps {
    account: Account;
}

const AccountCard = ({account}: AccountCardProps) => {
    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(account.balance);
    const formattedAccountNumber = account.account_id.replace(/\s+/g, '').match(/.{1,4}/g)?.join(' ');

    return (
        <Card sx={{width: "350px", margin: '4px'}}>
            <CardContent>
                <Typography variant="h5" component="h2" align="left">
                    Account Number
                </Typography>
                <Typography variant="h6" component="h5" align="left">
                    {formattedAccountNumber}
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography color="textSecondary" align="left">
                        Current Balance
                    </Typography>
                    <Typography color="textSecondary" align="right">
                        {formattedBalance}
                    </Typography>
                </div>
                <Typography variant="body2" align="right">
                    <a href={`/account/${account.id}/transactions/`}>View Transactions</a>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AccountCard;
