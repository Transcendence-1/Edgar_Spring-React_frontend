import React from 'react';
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

export default function EditModal({ isOpen, onClose,}) {
  const classes = useStyles();

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
                  placeholder="Username"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup style={{marginTop:'20px'}}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="email"
                  placeholder="Email"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup style={{marginTop : '20px'}}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={11}>
                <Input
                  id="password"
                  placeholder="Password"
                  fullWidth
                  type="password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
}
