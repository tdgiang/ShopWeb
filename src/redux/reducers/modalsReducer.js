const { SHOW_PROFILE_MODAL, HIDE_PROFILE_MODAL } = require("redux/actions/modalAction");

const initialState = {
    profileModal: false,
};

const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PROFILE_MODAL: {
            return { ...state, profileModal: true };
        }
        case HIDE_PROFILE_MODAL: {
            return { ...state, profileModal: false };
        }
        default: {
            return state;
        }
    }
};

export default modalsReducer;
