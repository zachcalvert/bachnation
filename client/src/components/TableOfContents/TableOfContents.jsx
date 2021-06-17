import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, List, MenuItem, Typography, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './TableOfContents.css';

const TEAMS_URL = `${process.env.REACT_APP_DJANGO_URL}api/teams/`
const CONTESTANTS_URL = `${process.env.REACT_APP_DJANGO_URL}api/contestants/`

const useStyles = makeStyles((theme) => ({
  toc: {
    padding: theme.spacing(2),
  },
  draftLink: {
    paddingLeft: 0,
    paddingBottom: theme.spacing(2)
  }
}));

export const TableOfContents = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [contestants, setContestants] = useState([]);

  useEffect(() => {
    async function fetchContestants() {
      const { data } = await axios.get(CONTESTANTS_URL);
      setContestants(data.results);        
    }
    async function fetchTeams() {
      const { data } = await axios.get(TEAMS_URL);
      setTeams(data.results);        
    }
    fetchContestants();
    fetchTeams();
  }, []);

  return (
    <div className={classes.toc}>
      <MenuItem
        className={classes.draftLink}
        key={1} 
        component={Link}
        to={`/draft`}>
          <Typography variant='h5'>Draft</Typography>
      </MenuItem>
      <Typography variant='h5'>Teams</Typography>
      <List>
        {teams.map((team) => (
          <MenuItem 
            key={team.id} 
            component={Link}
            to={`/team/${team.id}`}>
              <Typography variant='h6'>{team.name}</Typography>
          </MenuItem>
        ))}
      </List>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography variant='h5'>Contestants</Typography>
        </AccordionSummary>
        <AccordionDetails className='accordion-details'>
          <List>
            {contestants.map((contestant) => (
              <MenuItem 
                key={contestant.id} 
                component={Link}
                to={`/contestant/${contestant.id}`}>
                  <Typography variant='h6'>{contestant.name}</Typography>
              </MenuItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
