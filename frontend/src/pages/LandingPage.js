import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/LandingPage/NavigationBar';
import { Container, Grid, Paper, Button } from '@material-ui/core';
import Matches from '../components/LandingPage/Matches';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTable from '../components/LandingPage/Table';
import Match from '../components/LandingPage/Match'
import { isEmpty } from 'ramda';
import {Divider,Typography} from '@material-ui/core'
import { loadTeams } from '../actions/teams'
import { loadMatches } from '../actions/matches'
import {connect} from 'react-redux'
import { socketConnect } from 'socket.io-react';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const LandingPage = ({loadTeams, loadMatches, socket}) => {
    const classes = useStyles();
    const [matches, setmatches] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/matches')
            .then((res) => res.json())
            .then((matches) => setmatches(matches))
            loadTeams();
        setInterval(()=> {
                loadMatches();
            }, 30000)
    },[])
    
    const sendSocket = () => {
        socket.emit('news', {data:1})
    }

    
    
    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container maxWidth={'lg'} style={{marginTop: "20px"}} >
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={12} md={5}>
                    <Divider style={{ marginBottom: '2px'}} />
                         <Typography variant={'body1'} align={'center'} color={'textSecondary'}>Odehrané zápasy</Typography>
                        <Matches finished />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        {''}
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                          <Divider style={{ marginBottom: '2px'}} />
                         <Typography variant={'body1'} align={'center'} color={'textSecondary'}>Nejbližší zápas</Typography>
                        {!isEmpty(matches) && <Link to={`/match/${matches[0].id}`}><Match match={matches[0]}/></Link>}
                        
                        <Divider style={{marginTop:'15px', marginBottom: '2px'}} />
                        <Typography variant={'body1'} align={'center'} color={'textSecondary'}>Nadcházející zápasy</Typography>
                        <Matches/>
                    </Grid>
                </Grid>
            </Container>
        </div>)
}
export default socketConnect(connect((state) => ({
    teams: state.teams.allTeams,
    matches: state.matches.matches
}), {loadTeams, loadMatches})(LandingPage));