import React, { useEffect, useState } from 'react';
import DialogComponent from '../../../components/dialog'
import { TextField, InputLabel, Select, MenuItem,
  makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styles, { FormControl } from './styles';
import api from '../../../services/api';
import propTypes from 'prop-types';

const useStyles = makeStyles(styles);

function NewVacancy({ open, handleClose, updateVacancies, vacancyId }) {
  const classes = useStyles();
  const [vacancy, setNewVacancy] = useState({
    title: '',
    position: '',
    description: '',
    location: '',
    company: ''
  });
  const [companies, setCompanies] = useState([]);
  const [alert, setAlert] = useState({
    severity: '',
    msg: ''
  });

  useEffect(() => {
    getCompanies();
  }, [])

  useEffect(() => {
    if (vacancyId) {
      getVacancy(vacancyId);
    }
  }, [vacancyId])

  async function getCompanies() {
    const response = await api.get('/companies')
    setCompanies(response.data);
  }

  async function getVacancy(id) {
    const response = await api.get(`/vacancies/${id}`)
    if (response.status === 200) {
      const { title, description, location, company, position} = response.data
      setNewVacancy({
        title,
        description,
        location,
        company: company._id,
        position
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newVacancy = { ...vacancy };
    newVacancy[name] = value;
    setNewVacancy(newVacancy);
  }

  async function handleSave() {
    if (validaDados()) {
      if (vacancyId) {
        const response = await api.put(`/vacancies/${vacancyId}`, JSON.stringify(vacancy), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 204) {
          setAlert({
            severity: 'success',
            msg: 'Vaga atualizada com sucesso.'
          });
          
        }
      } else {
        const response = await api.post('/vacancies', JSON.stringify(vacancy), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201) {         
          setAlert({
            severity: 'success',
            msg: 'Vaga cadastrada com sucesso.'
          });
          
        }
      }
      setNewVacancy({
        title: '',
        position: '',
        description: '',
        location: '',
        company: ''
      });
      updateVacancies();
    }
  }

  const validaDados = () => {    
      if (!vacancy.title || !vacancy.company || !vacancy.description ||
          !vacancy.location || !vacancy.position) {
          setAlert({
            severity: 'error',
            msg: 'Preencha todos os campos.'
          });
          return;
      }
      return true;
  }

  return (
    <DialogComponent open={open} handleClose={handleClose} maxWidth="md"
    title="Cadastrar nova vaga" handleSave={handleSave}>
       <div className={classes.root}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Título"
            fullWidth
            onChange={handleChange}
            value={vacancy ? vacancy.title : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Descrição da vaga"
            fullWidth 
            multiline
            rows={5}        
            onChange={handleChange}
            value={vacancy ? vacancy.description : ''}   
          />
        <FormControl  fullWidth>
          <InputLabel id="demo-simple-select-label">Posição</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="position"
            name="position"
            value={vacancy ? vacancy.position : ''}
            onChange={handleChange}>
            <MenuItem value='front-end'>front-end</MenuItem>
            <MenuItem value='back-end'>back-end</MenuItem>
            <MenuItem value='full-stack'>full-stack</MenuItem>
            <MenuItem value='devops'>devops</MenuItem>
            <MenuItem value='qa'>qa</MenuItem>
          </Select>
        </FormControl>
        <FormControl  fullWidth>
          <InputLabel id="lblCompany">Empresa</InputLabel>
        <Select
            labelId="lblCompany"
            id="company"
            name="company"
            value={vacancy ? vacancy.company : ''}
            onChange={handleChange}>
            {companies.map(company => (
               <MenuItem value={`${company._id}`}>{company.name}</MenuItem>
            ))
            }
        </Select>
        </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            name="location"
            label="Localização"
            fullWidth
            onChange={handleChange}
            value={vacancy ? vacancy.location : ''}   
          />
          <Alert severity={alert.severity}>{alert.msg}</Alert>
          </div>
    </DialogComponent>
  )
}

NewVacancy.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  updateVacancies: propTypes.func.isRequired
}

export default NewVacancy;