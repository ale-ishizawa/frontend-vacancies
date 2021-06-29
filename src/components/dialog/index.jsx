import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogActions } 
from './styles';
import propTypes from 'prop-types';

function DialogComponent({
  open,
  handleClose,
  children,
  title,
  maxWidth,
  handleSave
}) {
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" 
        open={open} maxWidth={`${maxWidth}`}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogComponent.defaultProps = {
  open: false,
  maxWidth: 'md'
}

DialogComponent.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
  title: propTypes.string.isRequired,
  maxWidth: propTypes.string
};

export default DialogComponent;