import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, List, MenuItem, Typography, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './TableOfContents.css';

const SEASONS_URL = `${process.env.REACT_APP_DJANGO_URL}api/leagues/`

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
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    async function fetchSeasons() {
      const { data } = await axios.get(SEASONS_URL);
      setSeasons(data.results);        
    }
    fetchSeasons();
  }, []);

  return (
    <div className={classes.toc}>
      <Typography variant='h5'>Seasons</Typography>
      <List>
        {seasons.map((season) => (
          <MenuItem 
            key={season.id} 
            component={Link}>
            {/* to={`/season/${season.id}`}> */}
              <Typography variant='h6'>{season.name}</Typography>
          </MenuItem>
        ))}
      </List>
    </div>
  )
}
