export default function LoggedReducer(state = { fromDetail: false }, action) {
    switch (action.type) {
        case 'fromDetail':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

