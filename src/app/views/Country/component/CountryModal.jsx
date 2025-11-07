import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import GlobitsTextField from '../../../common/form/GlobitsTextField';
import countrySchema from '../schema/countrySchema';
import { createCountry, editCountry } from '../CountryService';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

export default function CountryModal({handleClose, open, onSuccess, currentCountry}) {  
  const classes = useStyles();
  const isEditMode = Boolean(currentCountry);

  const initialValues = {
    name: currentCountry?.name || "",
    code: currentCountry?.code || "",
    description: currentCountry?.description || "",
    id: currentCountry?.id || null
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="country-dialog-title"
      aria-describedby="country-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="country-dialog-title">
        {isEditMode ? 'Edit Country' : 'Create Country'}
      </DialogTitle>
      <Formik
        key={open ? (currentCountry?.id || 'new') : 'closed'}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={countrySchema}
        onSubmit={(values, { resetForm }) => {
            const submitPromise = isEditMode 
              ? editCountry(values)
              : createCountry(values);
            
            submitPromise
            .then((res) => {
                console.log(`Country ${isEditMode ? 'updated' : 'created'} successfully:`, res.data);
                toast.success(isEditMode ? "Cập nhật thành công!" : "Tạo mới thành công!");
                resetForm();
                handleClose();
                if (onSuccess) {
                  onSuccess();
                }
            })
            .catch((error) => {
                console.error(`Error ${isEditMode ? 'updating' : 'creating'} country:`, error);
                toast.error(isEditMode ? "Có lỗi khi cập nhật!" : "Có lỗi khi tạo mới!");
            });
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogContent>
              <GlobitsTextField
                name="name"
                label="Name"
                placeholder="Country name"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="code"
                label="Code"
                placeholder="Country code"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="description"
                label="Description"
                placeholder="Country description"
                className={classes.formField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                type="submit"
                color="primary" 
                variant="contained"
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
