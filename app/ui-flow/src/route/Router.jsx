import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CustomRoute from './CustomRoute'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import LeftMenu from '../components/menu/LeftMenu'
import SimpleTest from '../components/tests/SimpleTest';
import SimpleTest2 from '../components/tests/SimpleTest2';
import ComponentEnhancer from '../components/ComponentEnhancer';
import Dashboard from '../pages/Dashboard';

const isAuth = true;

class Router extends React.Component {
    render() {
        return isAuth ?
        (
            <BrowserRouter>
                <LeftMenu />
                <Switch>
                    <CustomRoute exact path="/" component={ComponentEnhancer(Dashboard)} isAuth={false} isPrivate={false} />
                    <CustomRoute path="/teste" component={ComponentEnhancer(SimpleTest)} isAuth={false} isPrivate={false} />
                    <CustomRoute path="/outro-teste" component={ComponentEnhancer(SimpleTest2)} isAuth={false} isPrivate={false} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        ) : (
            <BrowserRouter>
                <LeftMenu />
                <Switch>
                    <CustomRoute exact path="/" component={Home} isAuth={false} isPrivate={false} />
                    <CustomRoute path="/teste" component={SimpleTest} isAuth={false} isPrivate={false} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router