import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider, makeStyles, Button }
   from '@material-ui/core';
import api from '../../../services/api';
import styles from './styles';
import moment from 'moment';

const useStyles = makeStyles(styles);

export default function Details({ vacancyId, back }) {
  const [vacancy, setVacancy] = useState({
    company: {}
  });
  const classes = useStyles();
  
  useEffect(() => {
    if (vacancyId) {
      getVacancy(vacancyId);
    }
  }, [vacancyId])

  async function getVacancy(id) {
    const response = await api.get(`/vacancies/${id}`)
    if (response.status === 200) {
      setVacancy(response.data);
    }
  }

  return (
    <Grid item xs={12} md={12}>
      <div className={classes.vacancy}>
      <Typography variant="h5" gutterBottom>
        {vacancy.title}
      </Typography>
      <Button size="small" color="primary" variant="outlined"
        onClick={back}>
        Voltar
      </Button>
      </div>
      
      <Divider />
      <div className={classes.vacancy}>
        <p>{moment(vacancy.createdAt).format('DD/MM/YYYY')}</p>
        <p>{vacancy.position}</p>
        <p>Empresa:<strong> {vacancy.company.name}</strong></p>
      </div>
      <Typography variant="span">
        {vacancy.description} 
      </Typography>
      <p> Localização: {vacancy.location}  </p>
    </Grid>
  );
}

Details.propTypes = {
  vacancy: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired
};
