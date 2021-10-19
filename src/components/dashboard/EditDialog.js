import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Icon, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import GroupIcon from '@material-ui/icons/Group';
import userAction from '../../redux/actions/users';
import { Formik } from 'formik';
import * as Yup from 'yup';

const newMemberSchema = Yup.object().shape({
  name: Yup.string().required('Full Name Required'),
  email: Yup.string().email("Wrong email format"),
});

export default function AlertDialogSlide({ }) {

  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.usersReducer.editModal);

  const handleClose = () => {
    dispatch(userAction.handleEditModal({ open: false, data: null }));
  };

  return (
    <div>
      <Dialog
        open={modalStatus.open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <DialogTitle>Edit user</DialogTitle>
        <Formik
          initialValues={modalStatus.data ? modalStatus.data : {}}
          validationSchema={newMemberSchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(userAction.editRecord(values, setSubmitting, handleClose));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <DialogContent classes={{ root: "p-24" }}>
                <div className="flex">
                  <div className="mb-24 w-full">
                    <TextField
                      label="Name"
                      className="min-w-full"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      InputLabelProps={{shrink: true}}
                      onBlur={handleBlur}
                      variant="outlined"
                      required
                      fullWidth
                    />
                    {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name} </div>}
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="justify-between pl-16">
                <Button onClick={handleClose}>Cancle</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 normal-case"
                  aria-label="LOG IN"
                  disabled={isSubmitting}
                  value="legacy"
                >
                  Save
                  {isSubmitting && <CircularProgress size={25} variant="indeterminate" />}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
