import { withStyles } from '@material-ui/core/styles';
import { FormControl as MuiFormControl } from '@material-ui/core';

export const FormControl = withStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))(MuiFormControl);

export default (theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});
