/* eslint no-case-declarations: "error" */
/* eslint-env es6 */

const intialStore = {
  success: false,
  loading: false,
  data: null,
  errorMessage: null,
  editModal: {
    open: false,
    data: null
  },
};

export default (state = intialStore, action) => {
  switch (action.type) {
    case 'GET_ALL_LIST':
      return {
        ...state,
        success: true,
        loading: false,
        data: action.payload
      };
    case 'HANDLE_EDIT_RECORD':
      return {
        ...state,
        editModal: {
          ...state.editModal,
          ...action.payload
        }
      };
    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        success: true,
        loading: false,
        data: action.payload
      };
    case 'GET_DELETE_RECORD':
      return {
        ...state,
        success: true,
        loading: false,
        data: [...action.payload]
      };
    case 'GET_ALL_LIST_ERRORS':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case 'GET_EDIT_RECORD_ERRORS':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case 'GET_DELETE_RECORD_ERRORS':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};
