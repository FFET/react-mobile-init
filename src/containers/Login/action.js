/**
 * @author FFET
 * @since 2021-02-23
 * @description login action
 */

import { Session, Application } from "@utils/storage";
export const LOGIN = "Login";
export const LOGOUT = "Logout";

/**
 * login action
 * @param {object} data
 * @param {function} callback
 */
export const loginAction = (data, callback) => async (dispatch) => {
  let response = await http({
    url: API.common.login,
    // method: "post",
    data,
    headers: { token: data.result },
  });

  if (response.status) {
    dispatch({ type: LOGIN, data: { token: response.result } });
    Session.set("token", response.result);
    Session.set("user", JSON.stringify(data));
    callback();
  }
};

/**
 * logout action
 */
export const logoutAction = () => async (dispatch) => {
  http({
    url: API.common.logout,
    headers: {
      utoken: Application.get("token"),
    },
    loading: false,
  });

  dispatch({
    type: LOGOUT,
    data: {
      token: null,
    },
  });
  Session.clear();
  Application.clear();
};
