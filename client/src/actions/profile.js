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


//get all profile

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_PROFILE });
  
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: Types.GET_PROFILES,
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

//get profile by id

export const getProfileById = (userId) => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    console.log("BYID,", res)

    dispatch({
      type: Types.GET_PROFILE,
      payload: res.data,
    });
    console.log("BYIDone,", res)
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

//get github repos

export const getGithubRepos = (username) => async (dispatch) => {
  
  try {

    console.log("Github action");
    const res = await axios.get(`/api/profile/github/${username}`);
    console.log("Github action2121",res);
    dispatch({
      type: Types.GET_REPOS,
      payload: res.data,
    });
    console.log("Github action2");
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


    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if(!edit) {
  
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

  try {
    
  if(window.confirm('U Sure? Cannot be undone !')){
    await axios.delete('/api/profile');

    dispatch({
      type: Types.CLEAR_PROFILE
    })

    dispatch({
      type: Types.ACCOUNT_DELETE
    })

    dispatch(setAlert('Account Deleted permanently'));
  }
     
  } catch (err) {
    dispatch({
      type: Types.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}