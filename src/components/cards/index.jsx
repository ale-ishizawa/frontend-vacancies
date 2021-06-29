import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, 
   Grid, makeStyles, Typography }
  from '@material-ui/core';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import styles from './styles';

const useStyles = makeStyles(styles);

function Cards({ data, remove, edit, details }) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Grid container spacing={4}>
    {data.map((card) => (
      <Grid item key={card._id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.title}
            </Typography>
            <Typography>
              {card.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="contained" 
              onClick={() => details(card._id)}>
              Detalhes
            </Button>
            <Button size="small" color="primary"
              onClick={() => edit(card._id)}>
              Editar
            </Button>
            <Button size="small" color="secondary" variant="contained"
              onClick={() => remove(card._id)}>
              Excluir
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
)
}
Cards.defaultProps = {
  data: []
}
Cards.propTypes = {
  data: propTypes.array.isRequired,
  edit: propTypes.func.isRequired,
  remove: propTypes.func.isRequired,
  details: propTypes.func.isRequired,
  vacancyId: propTypes.string
};

export default Cards;