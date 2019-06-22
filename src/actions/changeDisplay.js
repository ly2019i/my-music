import store from "../Store";
export function changeToBlock() {
    store.dispatch({
        type: 'Logged',
        payload: {
            display: 'block'
        }
    })
}
export function changeToNone() {
    store.dispatch({
        type: 'Logged',
        payload: {
            display: 'none'
        }
    })
}

export function changeFooterToNone() {
    store.dispatch({
        type: 'changeFooter',
        payload: {
            display: 'none'
        }
    })
}
export function changeFooterToBlock() {
    store.dispatch({
        type: 'changeFooter',
        payload: {
            display: 'block'
        }
    })
}