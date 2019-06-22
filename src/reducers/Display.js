export default function LoggedReducer(state = { display: 'block' }, action) {
    switch (action.type) {
        case 'changeFooter':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

