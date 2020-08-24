import React from 'react'
import ClientOnlyPortal from './ClientOnlyPortal'
import {HashRouter, Route, Switch} from "react-router-dom";
import indexRoutes from "../routes";

export default function Root() {
    return (
        <>
            <ClientOnlyPortal selector="#root">
                <HashRouter>
                    <Switch>
                        {indexRoutes.map((prop, key) => {
                            return <Route path={prop.path} key={key} component={prop.component} />;
                        })}
                    </Switch>
                </HashRouter>
            </ClientOnlyPortal>
        </>
        )
}