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
import familyRelationshipSchema from '../schema/familyRelationshipSchema';
import { useStore } from '../../../stores';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const FamilyRelationshipModal = observer(() => {  
  const classes = useStyles();
  const { familyRelationshipStore } = useStore();
  const isEditMode = Boolean(familyRelationshipStore.currentFamilyRelationship);

  const initialValues = {
    name: familyRelationshipStore.currentFamilyRelationship?.name || "",
    code: familyRelationshipStore.currentFamilyRelationship?.code || "",
    description: familyRelationshipStore.currentFamilyRelationship?.description || "",
    id: familyRelationshipStore.currentFamilyRelationship?.id || null
  };

  return (
    <Dialog
      open={familyRelationshipStore.open}
      onClose={familyRelationshipStore.handleClose}
      aria-labelledby="family-relationship-dialog-title"
      aria-describedby="family-relationship-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="family-relationship-dialog-title">
        {isEditMode ? 'Edit Family Relationship' : 'Create Family Relationship'}
      </DialogTitle>
      <Formik
        key={familyRelationshipStore.open ? (familyRelationshipStore.currentFamilyRelationship?.id || 'new') : 'closed'}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={familyRelationshipSchema}
        onSubmit={async (values, { resetForm }) => {
            resetForm();
            if (isEditMode) {
                await familyRelationshipStore.handleUpdate(values);
            } else {
                await familyRelationshipStore.handleCreate(values);
            }
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogContent>
              <GlobitsTextField
                name="name"
                label="Name"
                placeholder="Family relationship name"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="code"
                label="Code"
                placeholder="Family relationship code"
                required
                className={classes.formField}
              />
              <GlobitsTextField
                name="description"
                label="Description"
                placeholder="Family relationship description"
                className={classes.formField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={familyRelationshipStore.handleClose} color="secondary">
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

export default FamilyRelationshipModal;

