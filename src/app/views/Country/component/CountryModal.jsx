import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import GlobitsTextField from '../../../common/form/GlobitsTextField';
import countrySchema from '../schema/countrySchema';
import { useStore } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const CountryModal = observer(() => {  
  const classes = useStyles();
  const { countryStore } = useStore();
  const isEditMode = Boolean(countryStore.currentCountry);

  const initialValues = {
    name: countryStore.currentCountry?.name || "",
    code: countryStore.currentCountry?.code || "",
    description: countryStore.currentCountry?.description || "",
    id: countryStore.currentCountry?.id || null
  };

  return (
    <Dialog
      open={countryStore.open}
      onClose={countryStore.handleClose}
      aria-labelledby="country-dialog-title"
      aria-describedby="country-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="country-dialog-title">
        {isEditMode ? 'Edit Country' : 'Create Country'}
      </DialogTitle>
      <Formik
        key={countryStore.open ? (countryStore.currentCountry?.id || 'new') : 'closed'}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={countrySchema}
        onSubmit={async (values, { resetForm }) => {
            resetForm();
            if (isEditMode) {
                await countryStore.handleUpdate(values);
            } else {
                await countryStore.handleCreate(values);
            }
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
              <Button onClick={countryStore.handleClose} color="secondary">
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
});

export default CountryModal;
