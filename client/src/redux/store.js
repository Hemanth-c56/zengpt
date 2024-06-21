import {createStore, combineReducers, applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

import historyReducer from "./reducers/historyReducer"

const reducer = combineReducers({
    history : historyReducer
})

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store