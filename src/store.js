import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReduce from './reducers'

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
