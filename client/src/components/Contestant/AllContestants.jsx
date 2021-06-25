import React from 'react';
import { Avatar, makeStyles, Link, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
  },
  table: {
    minWidth: '100%'
  },
  photo: {
    height: 60,
    width: 60,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 40,
    },
  },
  nameCell: {
    display: 'flex',
    minWidth: 140
  },
  linkContainer: {
    display: 'block',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px!important'
    },
  },
  teamName: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px!important'
    },
  },
  eliminated: {
    height: 60,
    width: 60,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    opacity: '20%',
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 40,
    },
  },
  rosesContainer: {
    minWidth: 90
  },
  roses: {
    fontSize: 20,
    minWidth: 100,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
  }
}));

export const AllContestants = (props) => {
  const classes = useStyles();
  const { contestants } = props;

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="right">Roses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestants.map((contestant) => (
            <TableRow key={contestant.id}>
              <TableCell component="th" scope="row">
                <div className={classes.nameCell}>
                  <Avatar className={contestant.eliminated ? classes.eliminated : classes.photo} src={contestant.image} />
                  <div className={classes.linkContainer}>
                    <Link color='inherit' href={`/contestant/${contestant.id}`}>
                      <p>{contestant.name}</p>
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <Link className={classes.teamName} color='inherit' href={`/team/${contestant.team_id}`}>
                  <p >{contestant.team_name}</p>
                </Link>
              </TableCell>
              <TableCell className={classes.rosesContainer} align="right"><span className={classes.roses}>{contestant.roses}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}