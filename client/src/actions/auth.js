import axios from "axios";
import { Types } from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../util/setAuthToken";

export const loadUser = () => async (dispatch) => {
  console.log("Called loaduser BC");

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: Types.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const newUser = {
    name,
    email,
    password,
  };
  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: Types.REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Types.REGISTER_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const newUser = {
    email,
    password,
  };
  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Types.LOGIN_FAIL,
    });
  }
};
 //Logout/ clear Profile

 export const logout = () => dispatch => {
  dispatch({
    type: Types.CLEAR_PROFILE
  }) 
  
  dispatch({
     type: Types.LOGOUT
   })
 }