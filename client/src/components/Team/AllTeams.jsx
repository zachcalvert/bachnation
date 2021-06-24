import React from 'react';

import { Avatar, Paper, Divider, Grid, GridList, GridListTile, Link, makeStyles, Typography } from '@material-ui/core';

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
    width: 350,
    [theme.breakpoints.down('sm')]: {
      width: '88vw',
    },
  },
  large: {
    height: 100,
    width: 100,
    margin: theme.spacing(2)
  },
  medium: {
    height: 80,
    width: 80,
    margin: 'auto'
  },
  eliminated: {
    height: 80,
    width: 80,
    opacity: '20%',
    margin: 'auto'
  },
  teamCell: {
    display: 'flex',
  },
  teamContainer: {
    display: 'block',
    padding: theme.spacing(2)
  },
  teamName: {
    marginBottom: 'auto',
    marginLeft: theme.spacing(2)
  },
  totalRoses: {
    marginBottom: 'auto',
    marginLeft: theme.spacing(2)
  },
  gridList: {
    padding: theme.spacing(2)
  },
  roses: {
    fontSize: 20
  }
}));

export const AllTeams = (props) => {
  const classes = useStyles();
  const { teams } = props;

  return (
    <Grid className={classes.board} container spacing={3}>
      {teams.map((team) => (
        <Grid item key={team.id}>
            <Paper className={classes.paper} variant='outlined'>
              <div className={classes.teamCell}>
                <Avatar className={classes.large} src={team.image} />
                <div className={classes.teamContainer}>
                  <Link className={classes.teamName} color='inherit' href={`/team/${team.id}`}>
                    <Typography variant='h6'>Team {team.name}</Typography>
                  </Link>
                  <Typography className={classes.roses} variant='subtitle2'>{team.total_roses}</Typography>
                </div>
              </div>
              <Divider />

              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {team.contestants.map((contestant) => (
                  <Link color='inherit' href={`/contestant/${contestant.id}`}>
                    <GridListTile key={contestant.id} cols={2}>
                      <Avatar className={contestant.eliminated ? classes.eliminated : classes.medium} src={contestant.image} />
                      <Typography variant='subtitle1'>{contestant.name}</Typography>
                      <Typography variant='subtitle1'>{contestant.roses}</Typography>
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