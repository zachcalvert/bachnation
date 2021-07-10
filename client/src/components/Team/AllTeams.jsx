import React from 'react';
import { useSprings, animated, interpolate } from 'react-spring'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Paper, Grid, GridList, GridListTile, Link, makeStyles, Typography, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  board: {
    display: "flex",
    width: '100%',
    padding: theme.spacing(4),
    textAlign: 'center',
    margin: '0 auto'
  },
  accordion: {
    margin: theme.spacing(2),
    color: '#FFF'
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
    // textShadow: '-1px -1px 0 #b0bec5, 1px -1px 0 #b0bec5, -1px 1px 0 #b0bec5, 1px 1px 0 #b0bec5'
  },
  teamContainer: {
    display: 'block',
    padding: theme.spacing(2)
  },
  teamName: {
    marginBottom: 'auto',
    marginLeft: theme.spacing(2)
  },
  tile: {
    textAlign: 'center'
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

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: 0, scale: 1, rot: 0, delay: 50 })
const from = i => ({ x: 0, rot: 0, scale: 1, y: 1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(2500px) rotateX(0deg) rotateY(0deg) rotateZ(${r}deg) scale(${s})`

export const AllTeams = (props) => {
  const classes = useStyles();
  const { teams } = props;

  const [properties, set] = useSprings(teams.length, i => ({ ...to(i), from: from(i) }));

  return (
    <Grid className={classes.board} container spacing={3}>
      {properties.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          <animated.div style={{ transform: interpolate([rot, scale], trans) }}>
            <Grid item key={teams[i].id}>
              <Accordion style={{ background: teams[i].color }} className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className={classes.teamCell}>
                    <Avatar className={classes.large} src={teams[i].image} />
                    <div className={classes.teamContainer}>
                      <Link className={classes.teamName} color='inherit' href={`/team/${teams[i].id}`}>
                        <Typography variant='h6'>Team {teams[i].name}</Typography>
                      </Link>
                      <Typography className={classes.roses} variant='subtitle2'>{teams[i].total_roses} roses</Typography>
                    </div>
                  </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {teams[i].contestants.map((contestant) => (
                      <Link color='inherit' href={`/contestant/${contestant.id}`}>
                        <GridListTile className={classes.tile} key={contestant.id} cols={2}>
                          <Avatar className={contestant.eliminated ? classes.eliminated : classes.medium} src={contestant.image} />
                          <Typography variant='subtitle1'>{contestant.name}</Typography>
                          <Typography variant='subtitle2'>{contestant.roses}</Typography>
                        </GridListTile>
                      </Link>
                    ))}
                  </GridList>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </animated.div>
        </animated.div>
      ))}
    </Grid>
  )
}