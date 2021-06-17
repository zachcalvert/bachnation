import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Avatar, Paper, Divider, Grid, GridList, GridListTile, Link, makeStyles, Typography } from '@material-ui/core';

const LEAGUE_URL = `${process.env.REACT_APP_DJANGO_URL}api/leagues/1/`

const useStyles = makeStyles((theme) => ({
  board: {
    display: "flex",
    height: '100%',
    width: '100%',
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    height: 100,
    width: 100
  },
  medium: {
    height: 80,
    width: 80,
    margin: 'auto'
  },
  eliminated: {
    height: 80,
    width: 80,
    opacity: '50%',
    margin: 'auto'
  },
  teamCell: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  teamName: {
    margin: 'auto',
    marginLeft: theme.spacing(2)
  },
  gridList: {
    padding: theme.spacing(2)
  }
}));

export const League = () => {
  const classes = useStyles();
  const [league, setLeague] = useState({"teams": []})

  useEffect(() => {
    async function fetchLeague() {
      const { data } = await axios.get(LEAGUE_URL);
      setLeague(data);
    }
    fetchLeague();
  }, []);
  
  return (
    <Grid className={classes.board} container spacing={3}>
      {league.teams?.map((team) => (
        <Grid item key={team.id}>

            <Paper className={classes.paper} variant='outlined'>
              <div className={classes.teamCell}>
                <Avatar className={classes.large} src={team.image} />
                <Link className={classes.teamName}color='inherit' href={`/team/${team.id}`}>
                  <Typography variant='h6'>Team {team.name}</Typography>
                </Link>
              </div>

              <Divider />

              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {team.contestants.map((contestant) => (
                  <Link color='inherit' href={`/contestant/${contestant.id}`}>
                    <GridListTile key={contestant.id} cols={2}>
                      <Avatar className={contestant.eliminated ? classes.eliminated : classes.medium} src={contestant.image} />
                      <Typography variant='subtitle1'>{contestant.name}</Typography>
                    </GridListTile>
                  </Link>
                ))}
              </GridList>
            </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
  

