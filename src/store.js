import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReduce from './reducers'

const middleware = [thunk]

const store = createStore(rootReduce, applyMiddleware(...middleware))

export default store
