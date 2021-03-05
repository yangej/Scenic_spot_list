import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "../Home";
import All from "../All";
import City from "../City";
import Popup from "../../components/Popup";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Redirect from="/" to="/scenicSpot" exact render={() => <Home/>}></Redirect>
                <Route path="/scenicSpot" exact render={() => <All/>}></Route>
                <Route path="/scenicSpot/:city" render={() => <City/>}></Route>
            </Switch>
            <Popup/>
        </Router>
    );
};

export default App;
