import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TableData from "../Table/Table";
import Chart from "../Chart/Chart";
import Contact from "../Contact/Contact";


export default function Navigation() {
    return (
        <Switch>
            <Route exact path="/" component={TableData} />
            <Route exact path="/chart" component={Chart} />
            <Route exact path="/contact" component={Contact} />
            <Route render={() => <h1>404 Not found!</h1>} />
        </Switch>
    );
}
