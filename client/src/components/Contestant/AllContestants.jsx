import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { Avatar, Dialog, DialogTitle, DialogActions, DialogContent, Grid, 
  makeStyles, Typography, Zoom, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 0 auto',
      padding: 0
    },
  },
  contestantContainer: {
    position: 'relative',
    margin: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  },
  contestant: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: 8
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
  closeModal: {
    position: 'absolute',
    top: 0,
    right: 0
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
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 24
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
  const fadeProps = useSpring({
    opacity: 1,
    color: 'white',
    from: { opacity: 0 },
    delay: '1200'
  })

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
          <IconButton className={classes.closeModal} onClick={e => setOpen(false)} aria-label="close">
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Avatar
            className={classes.large}
            src={active?.image}
            style={{ border: `3px solid ${active?.team_color}`, marginBottom: '16px' }} />
          <Typography className={classes.bio} variant='subtitle2'>{active?.bio}</Typography>
        </DialogContent>
        <Divider />
        <DialogActions style={{ background: active?.team_color }}>
          <Typography variant='h6'>Team {active?.team_name}</Typography>
        </DialogActions>
      </Dialog>

      <Grid container classes={classes.container}>
        {contestants.map((contestant, index) => (
          <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 16 }}>
            { springProps => (
              <div className={classes.contestantContainer}>
              <div className={classes.contestant} style={ springProps } onClick={handleClick(contestant)} key={index} id={index}>
                <Avatar 
                  id={index}
                  style={{ border: `2px solid ${contestant.team_color}` }}
                  className={contestant.eliminated ? classes.eliminated : classes.photo}
                  src={contestant.image} />
                <animated.div style={fadeProps}>
                  <div className={classes.roseDecoration}>
                    {contestant.roses}
                  </div>
                </animated.div>
              </div>
              </div>
            )}
          </Spring>
        ))}
      </Grid>
    </>
  )
}