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
    marginTop: theme.spacing(1)
  },
  table: {
    minWidth: 400
  },
  photo: {
    height: 60,
    width: 60,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0
  },
  nameCell: {
    display: 'flex',
    minWidth: 200
  },
  linkContainer: {
    display: 'block',
    padding: theme.spacing(2)
  },
  teamName: {
    marginBottom: 'auto',
    marginLeft: theme.spacing(2)
  },
  eliminated: {
    height: 60,
    width: 60,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    opacity: '20%',
  },
  roses: {
    fontSize: 20
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
                      <Typography variant='h6'>{contestant.name}</Typography>
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <Link color='inherit' href={`/team/${contestant.team_id}`}>
                  <Typography >{contestant.team_name}</Typography>
                </Link>
              </TableCell>
              <TableCell align="right"><span className={classes.roses}>{contestant.roses}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}