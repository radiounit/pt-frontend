import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter as Router } from "react-router-dom";

export default function PageTabs() {

    return (
        <div>
            <AppBar position="static" color="default">
                <Router>
                    <Tabs >
                        <Tab label="Calendar" value="calendar" href="/" />
                        <Tab label="Customers" value="customers" href="/customers" />
                        <Tab label="Trainings" value="trainings" href="/trainings" />
                    </Tabs>
                </Router>
            </AppBar>
        </div>
    );
}