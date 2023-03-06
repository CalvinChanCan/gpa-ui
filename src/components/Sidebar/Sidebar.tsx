import React, {useEffect, useState} from 'react';
import {List, ListItem, Divider} from '@mui/material';
import './Sidebar.scss';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {getUserFromLocalStorage} from "../../utils/localStorageUtils";
import {User} from "../../types/user";

export default function Sidebar() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const user = getUserFromLocalStorage()
        setCurrentUser(user)
    }, [])

    const handleTransactionsClick = () => {
        navigate('/transactions?show=all');
    }

    const handleAccountsClick = () => {
        navigate('/accounts');
    }

    const isAccountsActive = location.pathname === '/accounts';
    const isTransactionsActive = location.pathname.startsWith('/transactions');

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h3>Hi, {currentUser?.first_name}!</h3>
                <Divider/>
                <List>
                    <ListItem>
                        <Button variant={isAccountsActive ? 'contained' : 'outlined'}
                                className="sidebar-button"
                                onClick={handleAccountsClick}>Accounts</Button>
                    </ListItem>
                    <ListItem>
                        <Button variant={isTransactionsActive ? 'contained' : 'outlined'} className="sidebar-button"
                                onClick={handleTransactionsClick}>Transactions</Button>
                    </ListItem>
                </List>
            </div>
        </div>
    );
}
