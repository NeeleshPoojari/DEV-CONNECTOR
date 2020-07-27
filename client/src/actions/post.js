import axios from "axios";
import { Types } from "./types";
import { setAlert } from "./alert";

//Get All Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: Types.GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);

    dispatch({
      type: Types.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);

    dispatch({
      type: Types.UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`api/posts/${postId}`);

    dispatch({
      type: Types.DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add Post
// Delete Post
export const addPost = (FormData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`api/posts`, FormData, config);

    dispatch({
      type: Types.ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Added", "success"));
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: Types.GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("Add commemt", formData, postId )
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({
      type: Types.ADD_COMMENT,
      payload: res.data,
    });

    console.log("Add commemtsdsfsfs")

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: Types.REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
    
  } catch (err) {
    dispatch({
      type: Types.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
