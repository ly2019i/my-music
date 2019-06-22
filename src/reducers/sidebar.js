export default function sideBar(state = { open: false }, action) {
    switch (action.type) {
        case 'changeOpen':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}