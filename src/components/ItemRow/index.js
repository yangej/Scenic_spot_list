import React from "react";
import './style.scss';
import logo from '../../images/pin.svg';

const ItemRow = React.memo(({ location, description }) => {
    return (
        <div className="item-row">
            <h3 className="p-my-0 p-px-3 p-py-2">
                <img className="icon p-mr-2" src={logo} alt="location icon"/>{location}
            </h3>
            <p className="p-my-0 p-p-3">{description}</p>
        </div>
    )
});

export default ItemRow;