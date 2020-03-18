import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from "../Landing/Landing";

export default function Navigation() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route render={() => <h1>404 Not found!</h1>} />
        </Switch>
    );
}
