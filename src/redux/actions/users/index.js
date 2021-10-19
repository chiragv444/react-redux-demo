import { FamilyRestroomTwoTone } from '@material-ui/icons';
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

const editRecord = (data, setSubmitting, handleClose) => async (dispatch) => {
  try {
    const response = await axios.put(
      `localhost:3000/programs/${data.id}/edit`,
      data
    );

    dispatch({
      type: 'GET_EDIT_RECORD',
      payload: response
    });
    setSubmitting(false);
    handleClose({ open: false, data: null });
  } catch (err) {
    dispatch({
      type: 'GET_EDIT_RECORD_ERRORS',
      payload: 'Something went wrong for edit record'
    });
    setSubmitting(false);
    handleClose({ open: false, data: null });
  }
};

const deleteRecord = (data) => async (dispatch) => {
  try {
    // const response = await axios.delete(
    //   `https://jsonplaceholder.typicode.com/users/${data.id}`
    // );
    dispatch({
      type: 'GET_DELETE_RECORD',
      payload: data
      //   success: !!response.d/ata
    });
  } catch (err) {
    dispatch({
      type: 'GET_DELETE_RECORD_ERRORS',
      payload: 'Something went wrong for delete record'
    });
  }
};

const handleEditModal = (data) => async (dispatch) => {
    dispatch({
      type: 'HANDLE_EDIT_RECORD',
      payload: data
    });
};

export default {
  getAllList,
  editRecord,
  deleteRecord,
  handleEditModal
};
