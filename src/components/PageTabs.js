import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function PageTabs() {
    return (
        <div>
            <AppBar position="static">
                <Router>
                    <Route
                        path="/"
                        render={({ location }) => (
                            <Tabs value={location.pathname}>
                                <Tab label="Calendar" value="/" href="/" />
                                <Tab label="Customers" value="/customers" href="/customers" />
                                <Tab label="Trainings" value="/trainings" href="/trainings" />
                            </Tabs>
                        )}
                    />
                </Router>
            </AppBar>
        </div>
    );
}