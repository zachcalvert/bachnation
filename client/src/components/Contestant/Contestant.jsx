import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Avatar, Divider, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  leftAlign: {
    padding: '20px',
    margin: 'auto auto auto 10px'
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "auto",
    marginTop: 0,
    position: 'relative'
  },
  card: {
    padding: '0',
    marginBottom: '10px'
  },
  title: {
    fontSize: 14,
  },
  actions: {
    paddingLeft: '20px'
  },
  cardContent: {
    display: 'flex',
    margin: 'auto'
  },
  bio: {
    margin: 'auto auto auto 20px',
    display: 'block',
  },
  actions: {
    position: 'relative'
  },
  teamLink: {
    marginRight: 'auto',
  },
  pickNumber: {
    marginLeft: 'auto',
  }
}));

export const Contestant = () => {
  const classes = useStyles();
  const { id } = useParams();
  const DETAIL_URL = `${process.env.REACT_APP_DJANGO_URL}api/contestants/${id}/`;
  const [contestant, setContestant] = useState(null);

  useEffect(() => {
    async function fetchContestant() {
      const { data } = await axios.get(DETAIL_URL);
      setContestant(data);
    }
    fetchContestant();
  }, [contestant]);

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.large} src={contestant?.image} />

          <div className={classes.bio}>
            <Typography variant="h5" component="h2">
              {contestant?.name}
            </Typography>
            <Divider />
            <Typography variant="p" color="textSecondary">{contestant?.age}, {contestant?.profession}</Typography>
            <Typography variant="subtitle2">{contestant?.roses} roses</Typography>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Link className={classes.teamLink} color='inherit' href={`/team/${contestant?.team_id}`}>
            <Typography variant='subtitle1'>Team {contestant?.team_name}</Typography>
          </Link>
          <Typography className={classes.pickNumber} variant='subtitle2'>Drafted #{contestant?.pick} overall</Typography>
        </CardActions>
      </Card>

      <Paper elevation={3} variant='outlined'>
        {contestant?.bio}
      </Paper>
      </>
  )
}