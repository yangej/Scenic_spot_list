import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScenicSpotList from "./views/ScenicSpotList";
import Popup from "./components/Popup";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Redirect from="/" to="/scenicSpot" exact></Redirect>
                <Route path="/scenicSpot" exact render={() => <ScenicSpotList/>}></Route>
                <Route path="/scenicSpot/:city" render={() => <ScenicSpotList/>}></Route>
                <Redirect from="*" to="/scenicSpot"></Redirect>
            </Switch>
            <Popup/>
        </Router>
    );
};

export default App;
