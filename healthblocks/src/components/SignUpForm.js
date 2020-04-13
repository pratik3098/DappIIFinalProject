import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

export default function SignUpForm(dt){
    
    const classes = useStyles();
  const [state, setState] = React.useState({
    type: ""
  });
  function NativeSelects() {
  
    const classes = useStyles();
  
  
    const handleChange = event => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value
      });
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
            <option aria-label="None" value="" />
            <option value={"Patient"}>Patient</option>
            <option value={"Doctor"}>Doctor</option>
            <option value={"Pharmacy"}>Pharmacy</option>
          </Select>
        </FormControl>
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


