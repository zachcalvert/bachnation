import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Avatar, Paper, Divider, Grid, GridList, GridListTile, Link, makeStyles, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import { AllContestants } from '../Contestant/AllContestants';
import { AllTeams } from '../Team/AllTeams';

const LEAGUE_URL = `${process.env.REACT_APP_DJANGO_URL}api/leagues/1/`
const CONTESTANTS_URL = `${process.env.REACT_APP_DJANGO_URL}api/contestants/`

export const League = () => {
  const [league, setLeague] = useState({"teams": []});
  const [contestants, setContestants] = useState([]);
  const [view, setView] = useState('contestants');

  useEffect(() => {
    async function fetchLeague() {
      const { data } = await axios.get(LEAGUE_URL);
      setLeague(data);
    }
    async function fetchContestants() {
      const { data } = await axios.get(CONTESTANTS_URL);
      setContestants(data.results);
    }
    fetchLeague();
    fetchContestants();
  }, []);

  const handleView = (event, newView) => {
    setView(newView)
  };
  
  return (
    <>
      <div style={{ margin: '16px 0', textAlign: 'left' }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleView}
          aria-label="position-filter">
          <ToggleButton value="contestants" aria-label="contestant view">
            <Typography variant='h6'>Contestants</Typography>
          </ToggleButton>
          <ToggleButton value="teams" aria-label="team view">
            <Typography variant='h6'>Teams</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === 'contestants' ? <AllContestants contestants={contestants} /> : <AllTeams teams={league.teams} contestants={contestants} />  }
    </>
  )
}
  

