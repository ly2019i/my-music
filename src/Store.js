import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import LoggedReducer from '../src/reducers/Logged';
import getMusicIdReducer from "../src/reducers/musicId";

// 合并reducer
const routerReducer = combineReducers({
    LoggedReducer,
    getMusicIdReducer,
})

export default createStore(
    routerReducer,
    // 使用compose把多个插件进行合并
    compose(
        applyMiddleware(...[thunk]),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)