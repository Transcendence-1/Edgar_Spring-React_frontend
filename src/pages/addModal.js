import React, { useEffect, useState } from 'react';
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
  Grid,
  TextField
} from '@material-ui/core';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person'
import UserService from 'src/services/UserService';

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

export default function AddModal({ isOpen, onClose }) {
  const classes = useStyles();
  // const []
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSave = () => {
    if (username != '' && email != '' && password != '') {
      let user = { username: username, email: email, password: password };
      UserService.createUser(user).then((res) => {
        // this.props.history.push('/accounts');
        onClose();
        console.log("added");
      });
    }
    else {
      window.alert("Please input all fields!!!")
    }
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
        <CardHeader title="Add Account" />
        <CardContent>
          <FormGroup>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="username"
                  placeholder="Username"
                  fullWidth
                  required
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
          <FormGroup style={{ marginTop: '20px' }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="email"
                  placeholder="Email"
                  fullWidth
                  value={email}
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
          <FormGroup style={{ marginTop: '20px' }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="password"
                  placeholder="Password"
                  fullWidth
                  value={password}
                  type="password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  onChange={handlePassword}
                  required
                />
              </Grid>
            </Grid>
          </FormGroup>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            type='submit'
            onClick={handleSave}
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
}

