export default function getMusicIdReducer(state = { id: '' }, action) {
    console.log(action.payload)
    switch (action.type) {
        case 'getMusicId':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}