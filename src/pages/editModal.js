import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  InputAdornment,
  FormGroup,
  Grid
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person'
import UserService from 'src/services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/reducers/usersRedecer';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    backgroundColor: theme.palette.secondary.main,
    border: '0',
  },
  formControlLabel: {
    color: theme.palette.text.secondary,
  },
  inputIcon: {
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

export default function EditModal({ isOpen, onClose,data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUserName] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.passwordHash);
  const handleUserName=(e)=>{
    setUserName(e.target.value);
  }

  const handleEmail=(e)=>{
    setEmail(e.target.value);
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleUpdate=(id)=>{
    const updatedData={username:username,email:email, passwordHash:password}
    dispatch(updateUser(updatedData,id));
    onClose();
  }
  return ( 
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="sign-in-modal"
      aria-describedby="sign-in-form"
    >
      <Card className={classes.paper}>
        <CardHeader title="Edit Account" />
        <CardContent>            
          <FormGroup>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="username"
                  fullWidth
                  value={username}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                  onChange={handleUserName}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup style={{marginTop:'20px'}}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="email"
                  fullWidth
                  value = {email}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                  onChange={handleEmail}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup style={{marginTop : '20px'}}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="password"
                  value={password}
                  fullWidth
                  type="password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  onChange={handlePassword}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={()=>{
              handleUpdate(data.id)}}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
}
