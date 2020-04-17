import React, { Children } from 'react';
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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Regex from "regex";
import axios from 'axios';
import {server} from '../configData.js';
import {
  useHistory,
  Route,
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

const emailvalidationPattern= `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$;`
const regex = new Regex(emailvalidationPattern);
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  React.useEffect(() => {
    document.title = 'HeathBlocks'
  });

  const classes = useStyles()
  const history = useHistory()
  const {dt}= useParams()
  const [state, setState] = React.useState({
    type: ""
  });

  const [firstName, setFirstName]=React.useState('')
  const [lastName, setLastName]=React.useState('')
  const [type, setType]=React.useState('')
  const[email,setEmail]=React.useState('')
  const[password, setPassword]=React.useState('')
  function NativeSelects() {
  
    const classes = useStyles();
  
  
    const handleChange = event => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value
      });
      setType(event.target.value)
    };
  
    return (
      <div>
        <FormControl 
           variant="outlined"
           fullWidth
           className={classes.formControl}>
          <InputLabel
           required
          htmlFor="outlined-age-native-simple">Type</InputLabel>
          <Select
            native
            value={state.type}
            onChange={handleChange}
            label="Type"
            inputProps={{
              name: "type",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="Patient" value={"Patient"}>Patient</option>
            <option value={"Doctor"}>Doctor</option>
            <option value={"Pharmacy"}>Pharmacist</option>
          </Select>
        </FormControl>
      </div>
    );
  }
  
  const OnSubmitForm= (ev) =>{
  
   let  data= {
      email: email,
      password: password,
      fname: firstName,
      lname:lastName,
      type: type
    }
    
 
      
     if(type==="Doctor" || type==="Pharmacy")
     history.push({pathname: "/signupform", state:{data: data}})
     else 
     {
      axios.post('http://'+server.host+':'+server.port+'/auth/signup',{
        data: data
      }).then(res=>{
        console.log(res)
     history.push({pathname: "/dashboard", state:{data:res.data.data} })
    }).catch(err=>{
      console.log(err.message)
    })
  }


  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                onChange={(ev)=>{ setFirstName(ev.target.value)}}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(ev)=>{ setLastName(ev.target.value)}}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
            <NativeSelects></NativeSelects>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(ev)=>{ setEmail(ev.target.value)}}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(ev)=>{ setPassword(ev.target.value)}}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={OnSubmitForm}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

