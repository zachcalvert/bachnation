import React from 'react';
import { Avatar, Dialog, DialogTitle, DialogActions, DialogContent, Grid, makeStyles, Paper, Typography, Zoom, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: 0
    },
  },
  contestant: {
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
    [theme.breakpoints.down('sm')]: {
      height: 125,
      width: 125,
    },
  },
  eliminated: {
    height: 150,
    width: 150,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    opacity: '40%',
    [theme.breakpoints.down('sm')]: {
      height: 125,
      width: 125,
    }
  },
  large: {
    height: 250,
    width: 250,
    margin: 'auto'
  },
  roses: {
    fontSize: 24,
    letterSpacing: '5px'
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
          </div>
            // <TableCell align="center">
            //   <Link className={classes.teamName} color='inherit' href={`/team/${contestant.team_id}`}>
            //     <p >{contestant.team_name}</p>
            //   </Link>
            // </TableCell>
            // <TableCell className={classes.rosesContainer} align="right"><span className={classes.roses}>{contestant.roses}</span></TableCell>
        ))}
      </Grid>
    </>
  )
}