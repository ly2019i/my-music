export default function LoggedReducer(state = { display: 'block' }, action) {
    switch (action.type) {
        case 'Logged':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

