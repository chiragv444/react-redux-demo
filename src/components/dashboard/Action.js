import React from 'react';
import { IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import userAction from '../../redux/actions/users';
import actions from '../../redux/actions';

const Action = ({ data }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.usersReducer.data);

  const handleEdit = () => {
    dispatch(userAction.handleEditModal({ open: true, data: data }));
  };

  const handleDelete = () => {
    const latestData = userList?.filter((res) => res.id !== data?.id);
    dispatch(actions.deleteRecord(latestData));
  };

  return (
    <span>
      <IconButton color="inherit" size="large" onClick={handleEdit}>
        <InputIcon />
      </IconButton>
      <IconButton color="inherit" size="large" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </span>
  );
};

Action.propTypes = {
  data: PropTypes.object
};

export default Action;
