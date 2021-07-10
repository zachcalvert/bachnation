import React from 'react';
import { Avatar, Dialog, DialogTitle, DialogActions, DialogContent, Grid, makeStyles, Paper, Typography, Zoom, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 16px 0 16px',
      padding: 0
    },
  },
  contestant: {
    position: 'relative',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1)
    },
  },
  zoomed: {
    display: 'flex'
  },
  bio: {
    maxWidth: '300px',
    height: '100px',
    textOverflow: 'scroll'
  },
  photo: {
    height: 150,
    width: 150,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
  },
  eliminated: {
    height: 150,
    width: 150,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    opacity: '50%',
  },
  large: {
    height: 250,
    width: 250,
    margin: 'auto'
  },
  roses: {
    fontSize: 24,
    letterSpacing: '5px'
  },
  roseDecoration: {
    position: 'absolute',
    width: 'fit-content',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 30
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export const AllContestants = (props) => {
  const classes = useStyles();
  const { contestants } = props;
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(null);

  const handleClick = (e) => {
    setActive(contestants[e.target.parentElement.parentElement.id]);
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

      <Grid container classes={classes.container}>
        {contestants.map((contestant, index) => (
          <div className={classes.contestant} onClick={handleClick} key={index} id={index}>
            <Avatar 
              id={index}
              style={{ border: `2px solid ${contestant.team_color}` }}
              className={contestant.eliminated ? classes.eliminated : classes.photo}
              src={contestant.image} />
            <div className={classes.roseDecoration}>
              {contestant.roses}
            </div>
          </div>
        ))}
      </Grid>
    </>
  )
}