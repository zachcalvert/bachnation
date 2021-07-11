import React from 'react';
import { useSprings, animated, interpolate } from 'react-spring'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Dialog, DialogTitle, DialogActions, DialogContent, Grid, GridList, GridListTile, Link, makeStyles, Typography, Divider, Zoom } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  board: {
    display: "flex",
    width: '100%',
    padding: theme.spacing(4),
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0
    },
  },
  accordion: {
    margin: theme.spacing(1) ,
    width: 375,
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: '340'
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
    opacity: '75%',
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

const to = i => ({ x: 0, y: 0, scale: 1, rot: 0, delay: 50 })
const from = i => ({ x: 0, rot: 0, scale: 1, y: 1000 })
const trans = (r, s) => `perspective(2500px) rotateX(0deg) rotateY(0deg) rotateZ(${r}deg) scale(${s})`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export const AllTeams = (props) => {
  const classes = useStyles();
  const { teams, contestants } = props;
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [properties, set] = useSprings(teams.length, i => ({ ...to(i), from: from(i) }));

  const handleClick = contestant => e =>  {
    setActive(contestant);
    setOpen(true);
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
        <DialogTitle>
          {active?.name}
          <Typography variant='subtitle1'>{active?.age}, {active?.profession}</Typography>
          <Typography className={classes.roses}>{active?.roses}</Typography>
        </DialogTitle>
        <DialogContent>
          <Avatar
            className={classes.large}
            src={active?.image}
            style={{ border: `3px solid ${active?.team_color}`, marginBottom: '16px' }} />
          <Typography className={classes.bio} variant='subtitle2'>{active?.bio}</Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Typography variant='h6'>Team {active?.team_name}</Typography>
        </DialogActions>
      </Dialog>

      <Grid className={classes.board} container spacing={3}>
        {properties.map(({ x, y, rot, scale }, i) => (
          <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`), margin: '0 auto' }}>
            <animated.div style={{ transform: interpolate([rot, scale], trans) }}>
              <Grid item key={teams[i].id}>
                <Accordion elevation={3} className={classes.accordion} style={{ border: `1px solid ${teams[i].color}` }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: teams[i].color }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className={classes.teamCell}>
                      <Avatar style={{ border: `3px solid ${teams[i].color}` }} className={classes.large} src={teams[i].image} />
                      <div className={classes.teamContainer}>
                        <Link className={classes.teamName} color='inherit' href={`#`}>
                          <Typography variant='h6'>Team {teams[i].name}</Typography>
                        </Link>
                        <Typography className={classes.roses} variant='subtitle2'>{teams[i].total_roses} roses</Typography>
                      </div>
                    </div>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails style={{ background: teams[i].color }}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                      {teams[i].contestants.map((contestant) => (
                        <Link color='inherit' href={`#`} key={contestant.id}>
                          <GridListTile id={contestant.id} className={classes.tile} cols={2} onClick={handleClick(contestant)}>
                            <Avatar
                              style={{ border: `1px solid #333` }}
                              className={contestant.eliminated ? classes.eliminated : classes.medium} 
                              src={contestant.image} />
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
    </>
  )
}