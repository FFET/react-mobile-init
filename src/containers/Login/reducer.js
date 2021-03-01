/**
 * @author FFET
 * @since 2021-02-23
 * @description login reducer
 */

import { LOGIN, LOGOUT } from "./action";

// initial login state
const initialState = {
  token: null,
};

/**
 * login reducer
 * @param {object} state
 * @param {object} action
 */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { ...action.data });
    case LOGOUT:
      return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};

export default loginReducer;
