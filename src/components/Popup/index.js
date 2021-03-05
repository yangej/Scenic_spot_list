import React from "react";
import { Dialog } from 'primereact/dialog';
import {useDispatch, useSelector} from "react-redux";
import {closePopup} from "../../redux/action";

const Popup = () => {
    const isPopupOpen = useSelector(state => state.isOpen);
    const popupText = useSelector(state => state.text);
    const dispatcher = useDispatch();
    const hidePopup = () => {
        dispatcher(closePopup());
    };

    return (
        <Dialog visible={isPopupOpen} style={{ width: '30vw' }} onHide={hidePopup}>
            <p className="p-text-center">{popupText}</p>
        </Dialog>
    )
};

export default Popup;