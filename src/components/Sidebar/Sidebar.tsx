import * as React from 'react';
import {List, ListItem, Divider} from '@mui/material';
import './Sidebar.scss';
import Button from "@mui/material/Button";

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h3>Hi, Username!</h3>
                <Divider/>
                <List>
                    <ListItem>
                        <Button variant="outlined" className="sidebar-button">Accounts</Button>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" className="sidebar-button">Transactions</Button>
                    </ListItem>
                </List>
            </div>
        </div>
    );
}
