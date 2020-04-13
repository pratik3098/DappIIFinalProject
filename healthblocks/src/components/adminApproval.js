import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const rows = [
  {
    email: "pratik3098@gmail.com",
    type: "Doctor",
    affiliation: "SunnyBrook Hospital",
    minc: "CAMD-1234-5679",
    created: "2013-03-01",
    approval: ""
  }
];

export default function ApprovalTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Affiliation</TableCell>
            <TableCell align="right">MINC</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Approval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.affiliation}</TableCell>
              <TableCell align="right">{row.minc}</TableCell>
              <TableCell align="right">{row.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
