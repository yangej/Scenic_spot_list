import { OPEN_POPUP, CLOSE_POPUP } from "./types";

const popupReducer = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return { ...state, isOpen: true, ...action.payload };
        case CLOSE_POPUP:
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export default popupReducer;