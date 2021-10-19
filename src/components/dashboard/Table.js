import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions/users';
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
      <button  class="action-button update"  data-action="update"> update  </button>
      <button  class="action-button cancel"  data-action="cancel" > cancel </button>
    `;
  } else {
    eGui.innerHTML = `
      <button class="action-button edit"  data-action="edit" > edit  </button>
      <button class="action-button delete" data-action="delete" > delete </button>
    `;
  }

  return eGui;
}

const Table = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.usersReducer.data);

  const [state]= useState({
    modules: [ClientSideRowModelModule],
    columnDefs: [
      { field: "id", minWidth: 90 },
      { field: "name", maxWidth: 150 },
      { field: "status", maxWidth: 90 },
      {
        headerName: "Actions",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action"
      }
    ],
    defaultColDef: {
      editable: true
    },
    rowData: [
      { athlete: 'Toyota', age: 'Celica', price: 35000 },
      { athlete: 'Ford', age: 'Mondeo', price: 32000 },
      { athlete: 'Porsche', age: 'Boxter', price: 72000 }
    ]
  })

  useEffect(() => {
    dispatch(actions.getAllList());
  }, []);

  const onCellClicked = (params) => {
    // Handle click event for action cells
    if (
      params.column.colId === "action" &&
      params.event.target.dataset.action
    ) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        let update = userList.findIndex(res => res.is === params.data.id)
        userList[update] = params.data;
        dispatch(actions.editRecord(userList));
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  const onRowEditingStarted = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  const onRowEditingStopped = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
            onRowEditingStopped={onRowEditingStopped}
            onRowEditingStarted={onRowEditingStarted}
            onCellClicked={onCellClicked}
            editType="fullRow"
            suppressClickEdit={true}
            modules={state.modules}
            columnDefs={state.columnDefs}
            defaultColDef={state.defaultColDef}
            enableRangeSelection={true}
            rowData={userList}
          />
    </div>
  );
};

export default Table;
