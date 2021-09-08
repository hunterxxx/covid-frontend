import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TableData from "../Table/Table";
import Chart from "../Chart/ChartData";
import Contact from "../Contact/Contact";
import Updates from "../Updates/Updates";
import Privacy from "../Privacy/Privacy";
import QA from "../Spin/Spin3";

export default function Navigation() {
    return (
        <Switch>
            <Route exact path="/" component={TableData} />
            <Route exact path="/chart" component={Chart} />
            <Route exact path="/updates" component={Updates} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/qa" component={QA} />
            <Route render={() => <h1 className="container mt-2">404 Not found!</h1>} />
        </Switch>
    );
}
