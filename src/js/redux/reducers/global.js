import {handleActions} from 'redux-actions'
import * as types from 'redux/actionTypes/globalActionTypes'

let global = {}

export default handleActions({
  [types.UPDATE_USER_INFO]: (state, action) => state,
}, global)
