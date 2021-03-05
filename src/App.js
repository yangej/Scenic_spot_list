import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import All from "./views/All";
import City from "./views/City";
import Popup from "./components/Popup";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Redirect from="/" to="/scenicSpot" exact></Redirect>
                <Route path="/scenicSpot" exact render={() => <All/>}></Route>
                <Route path="/scenicSpot/:city" render={() => <City/>}></Route>
                <Redirect from="*" to="/scenicSpot"></Redirect>
            </Switch>
            <Popup/>
        </Router>
    );
};

export default App;
