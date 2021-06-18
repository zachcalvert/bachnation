import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Avatar, Link, Typography } from '@material-ui/core';

import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin: '10px 0',
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  teamCell: {
    display: 'flex',
  },
  teamContainer: {
    display: 'block',
    padding: theme.spacing(2),
    margin: 'auto',
    marginLeft: '16px'
  },
  teamName: {
    margin: 'auto',
    marginLeft: theme.spacing(2)
  },
  totalRoses: {
    marginBottom: 'auto',
    marginLeft: theme.spacing(2)
  },
  playerCell: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  playerName: {
    margin: 'auto',
    marginLeft: theme.spacing(2)
  },
  medium: {
    width: 80,
    height: 80
  },
  roses: {
    fontSize: 20
  }
}));


export const Team = () => {
  const classes = useStyles();
  const { id } = useParams();
  const TEAM_URL = `${process.env.REACT_APP_DJANGO_URL}api/teams/${id}/`;
  const [team, setTeam] = useState(null);
  
  useEffect(() => {
    async function fetchTeam() {
      const { data } = await axios.get(TEAM_URL);
      setTeam(data);
    }
    fetchTeam();
  }, [id]);
  
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <div className={classes.teamCell}>
          <Avatar className={classes.large} src={team?.image} />
          <div className={classes.teamContainer}>
            {team &&<Typography variant='h6'>Team {team.name}</Typography>}
            {team && <Typography className={classes.roses} variant='subtitle2'>{team.total_roses}</Typography>}
          </div>
        </div>
      </Card>

      <TableContainer component={Paper} variant='outlined'>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Contestant</TableCell>
            <TableCell align="right">Roses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team?.contestants?.map((contestant) => (
            <TableRow key={contestant.id}>
              <TableCell component="th" scope="row">
                <div className={classes.playerCell}>
                  <Avatar className={classes.medium} src={contestant.image} />
                  <Link className={classes.playerName} color='inherit' href={`/contestant/${contestant.id}`}>{contestant.name}</Link>
                </div>
              </TableCell>
              <TableCell align="right">{contestant.roses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </>
  );
  }

