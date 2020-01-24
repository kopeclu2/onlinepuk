import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMatches } from '../../actions/matches'
import { Card, makeStyles, Grid, Paper, CircularProgress } from '@material-ui/core'
import Match from './Match'
import { Link } from 'react-router-dom'

class Matches extends Component {
    componentDidMount() {
        this.props.loadMatches()
    }
    render() {
        const { matches, loading } = this.props;
        return (matches ?
            (
                matches && matches.map((match, index) => (
                    <Link to={`/match/${match.id}`}>
                        <Match match={match} />
                    </Link>))
            ) : (
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <CircularProgress />
                </Grid>

            )

        )
    }
}
export default connect((state) => ({
    matches: state.matches.matches,
    loading: state.matches.matchesLoading
}), { loadMatches })(Matches)