export default (theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  vacancy: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
  },
});
