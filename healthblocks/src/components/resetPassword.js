import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {server} from '../configData.js';
import {
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        HealthBlocks
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "Capitalize"
  },
  button:{
    textTransform: "Capitalize"
  }
}));

export default function ResetPassword() {
  const history = useHistory()
  const classes = useStyles()
  React.useEffect(() => {
    document.title = 'HeathBlocks'
  });
  const[data,setData]=React.useState('')
  if (Boolean(history.location.state))
  setData(history.location.state.data)
  const[email, setEmail]=React.useState('')




  const onClickSubmit=(ev)=>{

    axios.post('http://'+server.host+':'+server.port+'/auth/resetPassword',{
      data:{
      email: email,
      }
    }).then(res=>{
      history.push("/dashboard")
    }).catch(err=>{
      console.log(err.message)
    })
      
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(ev)=>{setEmail(ev.target.value)}}
            autoComplete="email"
            autoFocus
          />
         
          <Button
            onClick={onClickSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        
          >
            Send Reset Link
          </Button>
         
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>

    
  );
}