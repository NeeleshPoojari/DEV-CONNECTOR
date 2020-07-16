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

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('api/profile/experience', formData);

    dispatch({
      type: Types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {

  console.log("Inside my education action")
  try {
    const res = await axios.put('api/profile/education', formData);

    dispatch({
      type:Types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Experience

export const deleteExperience = id =>async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: Types.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Removed', 'success'));
    
  } catch (err) {
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete Education

export const deleteEducation = id =>async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: Types.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'));
    
  } catch (err) {
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}


export const deleteAccount = id =>async dispatch => {

  if(window.confirm('U Sure? Cannot be undone !')){

  }
  try {
    const res = await axios.delete('/api/profile');

    dispatch({
      type: Types.CLEAR_PROFILE
    })

    dispatch({
      type: Types.ACCOUNT_DELETE
    })

    dispatch(setAlert('Account Deleted permanently'));
    
  } catch (err) {
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}