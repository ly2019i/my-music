export default function getMusicIdReducer(state = { data: {} }, action) {
    switch (action.type) {
        case 'getMusicId':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}