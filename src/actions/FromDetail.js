import store from "../Store";
export function fromDetail() {
    store.dispatch({
        type: 'fromDetail',
        payload: {
            fromDetail: true
        }
    })
}