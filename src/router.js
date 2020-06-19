import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./components/home/Home";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Activities from "./components/activity/Activities";



class Router extends Component {
    render() {
        return (
            <BrowserRouter>

                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/list" component={Activities}/>
                </Switch>

            </BrowserRouter>
        );
    }
}

export default Router;
