import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "../Home";
import All from "../All";
import City from "../City";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact render={() => <Home/>}></Route>
                <Route path="/scenicSpot" exact render={() => <All/>}></Route>
                <Route path="/scenicSpot/:city" render={() => <City/>}></Route>
            </Switch>
        </Router>
    );
};

export default App;
