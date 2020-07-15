import axios from "axios";
import { Types } from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: Types.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// create or update profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => { 
  try {
    console.log("On createProfile called");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: Types.GET_PROFILE,
      payload: res.data,
    });
    console.log("On createProfile res, ",res ,edit);

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if(!edit) {
      console.log("History",history);
      history.push('/dashboard');
    }
  } catch (err) {
    
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
