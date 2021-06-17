import React from 'react';
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Hidden, Link } from '@material-ui/core';

const CONTESTANTS_URL = `${process.env.REACT_APP_DJANGO_URL}api/contestants/`

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "auto",
    marginTop: 0,
    position: 'relative'
  },
  table: {
    minWidth: 350,
  },
  smallText: {
    fontSize: '14px',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  teamHeader: {
    display: 'flex',
  },
  teamInfo: {
    margin: 'auto',
    textAlign: 'left'
  }
}));

export const AllContestants = () => {
  const classes = useStyles();
  const [contestants, setContestants] = React.useState([]);
  
  async function fetchContestants() {
    const { data } = await axios.get(CONTESTANTS_URL);
    setContestants(data.results);
  }

  React.useEffect(() => {
    fetchContestants();
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Profession</TableCell>
            <TableCell align="right">Team</TableCell>
            <Hidden smDown>
              <TableCell align="right">Team</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestants.map((contestant, index) => (
            <TableRow key={contestant.id}>
              <TableCell>{contestant.name}</TableCell>
              <TableCell align="right">{contestant.age}</TableCell>
              <TableCell align="right">{contestant.profession}</TableCell>
              <Hidden smDown>
                <TableCell component="th" scope="row">
                  <Link color='inherit' href={`/contestant/${contestant.id}`}>{contestant.name}</Link>
                </TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

