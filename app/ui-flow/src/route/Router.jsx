import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import CustomRoute from './CustomRoute'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import LeftMenu from '../components/menu/LeftMenu'
import SimpleTest from '../components/tests/SimpleTest';
import SimpleTest2 from '../components/tests/SimpleTest2';
import ComponentEnhancer from '../components/ComponentEnhancer';
import Dashboard from '../pages/Dashboard';
import { TemplateContext } from '../context/template-context'
import { store, persistor } from '../store/reduxStore'

const isAuth = true;

const Router = () => {
    const [templateState, setTemplateState] = useState({ darkMode: true });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <LeftMenu />
                    <Switch>
                        isAuth ? (
                        <CustomRoute exact path="/" component={ComponentEnhancer(Dashboard)}
                            isAuth={false} isPrivate={false} />
                        <CustomRoute path="/teste" component={ComponentEnhancer(SimpleTest)}
                            isAuth={false} isPrivate={false} />
                        <CustomRoute path="/outro-teste" component={ComponentEnhancer(SimpleTest2)}
                            isAuth={false} isPrivate={false} />
                        <Route component={NotFound} />
                        ) : (
                        <CustomRoute exact path="/" component={Home}
                            isAuth={false} isPrivate={false} />
                        <CustomRoute path="/teste" component={SimpleTest}
                            isAuth={false} isPrivate={false} />
                        <Route component={NotFound} />
                        )
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default Router