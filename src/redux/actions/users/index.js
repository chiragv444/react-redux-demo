import axios from 'axios';

const getAllList = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    dispatch({
      type: 'GET_ALL_LIST',
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: 'GET_ALL_LIST_ERRORS',
      payload: 'Something went wrong for Get All Lising'
    });
  }
};

const editRecord = (data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `localhost:3000/programs/${data.id}/edit`,
      data
    );

    dispatch({
      type: 'GET_EDIT_RECORD',
      payload: response
    });
  } catch (err) {
    dispatch({
      type: 'GET_EDIT_RECORD_ERRORS',
      payload: 'Something went wrong for edit record'
    });
  }
};

const deleteRecord = (data) => async (dispatch) => {
  try {
    
    dispatch({
      type: 'GET_DELETE_RECORD',
      payload: data
    });
  } catch (err) {
    dispatch({
      type: 'GET_DELETE_RECORD_ERRORS',
      payload: 'Something went wrong for delete record'
    });
  }
};

export default {
  getAllList,
  editRecord,
  deleteRecord
};
