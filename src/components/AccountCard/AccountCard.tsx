import React from 'react';
import {Card, CardContent, Link, Typography} from '@mui/material';
import {Account} from '../../types/account';
import {useNavigate} from "react-router-dom";

interface AccountCardProps {
    account: Account;
}

const AccountCard = ({account}: AccountCardProps) => {
    const navigate = useNavigate();

    const formattedBalance = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(account.balance);
    const formattedAccountNumber = account.account_id.replace(/\s+/g, '').match(/.{1,4}/g)?.join(' ');

    const handleTransactionsLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate('/transactions', { state: { account } });
    };

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
                    <Link href="#" color="primary" onClick={handleTransactionsLinkClick}>
                        View Transactions
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AccountCard;
