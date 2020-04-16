import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DropzoneDialog } from "material-ui-dropzone";
import Container from '@material-ui/core/Container';
import { useHistory} from "react-router-dom";
import axios from 'axios';
import {server} from '../configData.js';
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
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      }
  }));

export default function SignUpForm(props){
    const history=useHistory()
    
    const[data,setData]=React.useState(history.location.state.data)
    const[license,setLicense]=React.useState('')
    const classes = useStyles();
  const [state, setState] = React.useState({
    type: ""
  });
  
  
const onClickRedirect= (ev) =>{
  let newData=  Object.assign({}, data ,{license: license})
  axios.post('http://'+server.host+':'+server.port+'/auth',{
    data:  newData
  }).then(res=>{
    console.log(res)
  })
  
  return(
    <div>
      <Typography> You application is in approval process!</Typography>
    </div>
  )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <form method="POST" className={classes.form} noValidate action="/submit">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                defaultValue={data.fname}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                defaultValue={data.lname}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="type"
                label="Type"
                name="type"
                defaultValue={data.type}
                autoComplete="type"
                disabled="disabled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={data.email}
                disabled="disabled"
                autoComplete="email"
              />
            </Grid>
            {(data.type=="Doctor") ?
            (<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="minc"
                label="MINC"
                placeholder="CAMD-1234-5679"
                name="minc"
                onChange={(ev)=>{setLicense(ev.target.value)}}
              />
            </Grid>):
           
            (<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ocp"
                label="OCP"
                placeholder="12345"
                name="ocp"
                onChange={(ev)=>{setLicense(ev.target.value)}}
              />
            </Grid>)
          }
          </Grid>
          <Button
            onClick={onClickRedirect}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export function FileUpload(){
    const initialState = {
        open: false,
        files: []
      };
      let [fileUpdateStatus,setFileUpdateStatus]= React.useState(true)
      const [state, setState] = React.useState(initialState);
      const [result, setResult]=React.useState(true)
      const [accepted, setAccept]=React.useState(0)
      const [notAccepted, setNotAccept]= React.useState(0)
      const handleOpen = () => {
        setState({
          ...state,
          open: true
        });
      };
    
      const handleClose = () => {
        setState({
          ...state,
          open: false
        });
      };
    
      const handleSave = files => {
        setState({
          ...state,
          files: files,
          open: false
        });
         setFileUpdateStatus(false)
        let form = new FormData()
        form.append('file',files[0])
        form.append('name',files[0].name)
        
  
          axios.post('http://3.21.126.118:8080/newData',form,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function(res){
              console.log(res.data.data)
              if(Boolean(res.data.data)){
              
              setFileUpdateStatus(true)
              }})
            }
            return (
                <div>
                  <Grid container direction="row" justify="center" alignItems="center">
                  <Box m={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleOpen}
                    textTransform="Capitalize"
                  >
                    Upload Picture
                  </Button>
                  <DropzoneDialog
                    open={state.open}
                    onSave={handleSave}
                    accept="file/image"
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                    cancelButtonText={"Cancel"}
                    submitButtonText={"Upload"}
                    showFileNamesInPreview={true}
                    dialogTitle={"Profile Pic Upload"}
                    dropzoneText={"Upload"}
                  />
                  </Box>
                  </Grid>
                </div>
              );

}

function ImageAvatars() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Avatar src="../icons/brokenImgae.png" className={classes.large} />
    </div>
  );
}


