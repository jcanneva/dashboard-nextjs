import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Sidebar from '../components/sidebar/sidebar.jsx';
import Footer from '../components/footer/footer.jsx';
import Starter from "../components/starter";
import ThemeRoutes from "../routes/routing";

const Fulllayout = (props) => {

    if (process.browser) {
        /*--------------------------------------------------------------------------------*/
        /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
        /*--------------------------------------------------------------------------------*/
        const [width, setWidth] = useState(window.innerWidth);
        props.history ?    props.history.listen((location, action) => {
                if (
                    window.innerWidth < 767 &&
                    document
                        .getElementById('main-wrapper')
                        .className.indexOf('show-sidebar') !== -1
                ) {
                    document
                        .getElementById('main-wrapper')
                        .classList.toggle('show-sidebar');
                }
            }) : null;

        /*--------------------------------------------------------------------------------*/
        /*Function that handles sidebar, changes when resizing App                        */
        /*--------------------------------------------------------------------------------*/
        useEffect(() => {
            const updateDimensions = () => {
                let element = document.getElementById('main-wrapper');
                setWidth(window.innerWidth)
                if (width < 1170) {
                    element.setAttribute("data-sidebartype", "mini-sidebar");
                    element.classList.add("mini-sidebar");
                } else {
                    element.setAttribute("data-sidebartype", "full");
                    element.classList.remove("mini-sidebar");
                }
            }
            window.addEventListener("load", updateDimensions.bind(null));
            window.addEventListener("resize", updateDimensions.bind(null));
            return () => {
                window.removeEventListener("load", updateDimensions.bind(null));
                window.removeEventListener("resize", updateDimensions.bind(null));
            };
        }, [width]);
    }
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
        <div
            id="main-wrapper"
            data-theme="light"
            data-layout="vertical"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
            data-boxed-layout="full"
        >
            {/*--------------------------------------------------------------------------------*/}
            {/* Header                                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <Header />
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar                                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            <Sidebar {...props} routes={ThemeRoutes}/>
            {/*--------------------------------------------------------------------------------*/}
            {/* Page Main-Content                                                              */}
            {/*--------------------------------------------------------------------------------*/}
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                    <Switch>
                        {ThemeRoutes.map((prop, key) => {
                            if (prop.redirect) {
                                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                            }
                            else {
                                return (
                                    <Route path={prop.path} component={prop.component} key={key} />
                                );
                            }
                        })}
                    </Switch>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
export default Fulllayout;
