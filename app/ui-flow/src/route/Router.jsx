import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CustomRoute from './CustomRoute'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Template from '../pages/Template'
import SimpleTest from '../components/tests/SimpleTest';

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <CustomRoute exact path="/" component={Home} isAuth={false} isPrivate={false} />
                    <CustomRoute path="/template" component={Template} isAuth={false} isPrivate={false} />
                    <CustomRoute path="/teste" component={SimpleTest} isAuth={false} isPrivate={false} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router