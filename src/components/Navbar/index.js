import React from "react";
import { Link} from "react-router-dom";
import { Button } from 'primereact/button';
import "./style.scss";

const Navbar = () => {
    return (
        <nav className="p-d-flex p-justify-center p-py-3">
            <Link to="/scenicSpot">
                <Button label="查詢全部" className="p-ml-2"/>
            </Link>
            <Link to="/scenicSpot/臺北市">
                <Button label="依城市查詢" className="p-ml-2"/>
            </Link>
        </nav>
    );
};

export default Navbar;
