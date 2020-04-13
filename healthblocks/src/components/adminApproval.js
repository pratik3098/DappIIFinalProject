import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover, bindMenu } from "material-ui-popup-state";
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button:{
    textTransform:"Capitalize"
  },
  header:{
    fontWeight: "bold",
    padding: "70px",
    fontSize: "150%"
  },
  column:{
    fontWeight: "bold"
  }
});

const rows = [
  { 
    
    email: "pratik3098@gmail.com",
    details: {
        name: "Pratik Patil",
        dob:  "30/09/1998",
        practiseStart: "1/12/2001"
    },
    type: "Doctor",
    affiliation: {
    name: "SunnyBrook Hospital",
    address: "2075 Bayview Ave, Toronto, ON M4N 3M5"
  },
    minc: "CAMD-1234-5679",
    created: "2013-03-01",
    approval: ""
  }
];


export default function AprovalApp(){
    const classes = useStyles();
    return(
        <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Box m={1}>
        <Typography className={classes.header } >HealthBlocks Approvals DashBoard</Typography>
        </Box>
        <div>
        <ApprovalTable></ApprovalTable>
        </div>
      </Grid>
  
      </div>
    )
}
export function ApprovalTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.column}>Email</TableCell>
            <TableCell align="center" className={classes.column}>Name</TableCell>
            <TableCell align="center" className={classes.column}>Type</TableCell>
            <TableCell align="center" className={classes.column}>Affiliation</TableCell>
            <TableCell align="center" className={classes.column}>MINC</TableCell>
            <TableCell align="center" className={classes.column}>Creation Date</TableCell>
            <TableCell align="center" className={classes.column}>Approval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.email}>
             <TableCell component="th" scope="row">{row.email} </TableCell>
              <TableCell align="center"><PopoverPopupDetails dt={row.details}></PopoverPopupDetails></TableCell>`   `
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center"><PopoverPopupState dt={row.affiliation}></PopoverPopupState></TableCell>
              <TableCell align="center">{row.minc}</TableCell>
              <TableCell align="center">{row.created}</TableCell>
              <TableCell align="center"><ApprovalButton dt={{email: row.email, approval: row.approval}}></ApprovalButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



function PopoverPopupState(dt) {
    const classes = useStyles();
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button
           className={classes.button}
            variant="contained"
            color="default"
            {...bindTrigger(popupState)}
          >
            {dt.dt.name}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Box p={2}>
              <Typography>Address: {dt.dt.address}</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

function PopoverPopupDetails(dt) {
    const classes = useStyles();
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {popupState => (
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="default"
              {...bindTrigger(popupState)}
            >
              {dt.dt.name}
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
              <Box p={2}>
                <Typography>Dob: {dt.dt.dob}</Typography>
                <Typography>Practise Start Date: {dt.dt.practiseStart}</Typography>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    );
  }


  // e.g: dt={{email: "1", approval: "" }}
 function ApprovalButton(dt) {
      
    const classes = useStyles();
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {popupState => (
          <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)} >
            Action
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} defaultValue='Approve'>Approve</MenuItem>
            <MenuItem onClick={popupState.close} defaultValue='Rejected'>Reject</MenuItem>
          </Menu>
        </React.Fragment>
        )}
      </PopupState>
    );
    }