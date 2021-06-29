import React, { useEffect, useState } from 'react';
import { AppBar, Button, CssBaseline, Grid, Toolbar, Typography, makeStyles,
   Container, Link } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/PhotoCamera';

import styles from './styles'
import CardsComponent from '../../components/cards';
import api from '../../services/api';
import NewVacancy from './new-vacancy';
import Details from './details';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(styles);

export default function Vacancies({ history }) {
  const classes = useStyles();
  const [vacancies, setVacancies] = useState([]);
  const [newVacancy, setNewVacancy] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [vacancyId, setVacancyId] = useState('');

  const handleClickOpen = () => {
    setNewVacancy(true);
  };

  const handleClose = () => {
    setNewVacancy(false);
  };

  useEffect(()   =>  {
    getVacancies();
  },[])

  async function getVacancies() {
    const response = await api.get('/vacancies')
    setVacancies(response.data);
  }

  async function removeVacancy(id) {
    const response = await api.delete(`/vacancies/${id}`)
    if (response.status === 204) {
      getVacancies();
    }
  }

  function edit(id) {
    setNewVacancy(true);
    setVacancyId(id);
  }

  function details(id) {
    setVacancyId(id);
    setShowDetails(!showDetails);
  }

  function back() {
    setShowDetails(false);
    setVacancyId('');
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {newVacancy && 
       <NewVacancy open={newVacancy} handleClose={handleClose} 
        updateVacancies={getVacancies} vacancyId={vacancyId} />
      }
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Nkey - Vagas Recentes
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Trabalhe Conosco
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Cocriamos soluções digitais inteligentes, aplicando a tecnologia para otimizar processos, melhorar experiências e inovar negócios. Encontre a solução certa para seu objetivo. Faça parte da transformação digital!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Cadastrar Nova Vaga
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>        
            {showDetails ? (
              <Container className={classes.cardGrid} maxWidth="md">
                <Details vacancyId={vacancyId} back={back} />
                </Container>
              ) : (           
                <Container className={classes.cardGrid} maxWidth="lg">
                <CardsComponent data={vacancies} remove={removeVacancy} 
                  details={details} edit={edit} />          
              </Container>
              )          
            }        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
