import produce from 'immer'

const INITIAL_STATE = {
    type: null,
    message: null,
    show: false,
    duration: 4000,
    iconName: '',
}

export default function toast(state = INITIAL_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case '@toast/SHOW': {
                draft.type = action.payload.type;
                draft.message = action.payload.message;
                draft.iconName = action.payload.iconName;
                draft.duration = action.payload.duration;
                draft.show = true;
                break;
            }
            case '@toast/HIDE': {
                draft.type = null;
                draft.message = null;
                draft.duration = 4000;
                draft.iconName = '';
                draft.show = false;
                break;
            }
            default:
        }
    })
}