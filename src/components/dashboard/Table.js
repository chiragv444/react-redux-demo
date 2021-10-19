import { useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../../redux/actions/users';
import PropTypes from 'prop-types';
import EditDialog from './EditDialog';
import Action from './Action';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const StatusRender = ({ data }) => <div>{data.stauts ? 'True' : 'False'}</div>;
StatusRender.propTypes = {
  data: PropTypes.object
};

const Table = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.usersReducer.data);

  useEffect(() => {
    dispatch(userAction.getAllList());
  }, []);

  const closeModal = () => {
    console.log('close modal');
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        frameworkComponents={{
          action: Action,
          status: StatusRender
        }}
        rowData={userList}
      >
        <AgGridColumn field="id" />
        <AgGridColumn field="name" />
        <AgGridColumn field="status" cellRenderer="status" />
        <AgGridColumn field="actions" cellRenderer="action" />
      </AgGridReact>
      <EditDialog />
    </div>
  );
};

export default Table;
