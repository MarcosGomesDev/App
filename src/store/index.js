import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './modules/rootReducer'

export default store = configureStore({reducer: rootReducer})