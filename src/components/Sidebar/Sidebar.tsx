import React from 'react';
import {List, ListItem, Divider} from '@mui/material';
import './Sidebar.scss';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleTransactionsClick = () => {
        navigate('/transactions?show=all');
    }

    const handleAccountsClick = () => {
        navigate('/accounts');
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h3>Hi, Username!</h3>
                <Divider/>
                <List>
                    <ListItem>
                        <Button variant="outlined" className="sidebar-button"
                                onClick={handleAccountsClick}>Accounts</Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" className="sidebar-button"
                                onClick={handleTransactionsClick}>Transactions</Button>
                    </ListItem>
                </List>
            </div>
        </div>
    );
}
