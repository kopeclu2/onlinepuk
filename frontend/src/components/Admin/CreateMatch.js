import React, { Component } from 'react'
import { Grid, MenuItem, TextField, Typography, Container, Button } from '@material-ui/core'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { teams } from '../../constants/teams'
import {connect} from 'react-redux'
import {addNewMatch} from '../../actions/Admin/addNewMatch'
export class CreateMatch extends Component {
    state = {
        teamHome: 1,
        teamHost: 1,
        scoreHome: 0,
        scoreHost: 0,
        date: new Date(),
        matchState: ''
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSelectHomeTeam = (e) => {
        this.setState({ homeScore: e.target.value })
    }
    render() {
        const { teamHome, teamHost, scoreHome, scoreHost, matchState, date } = this.state;
        return (
            <Container maxWidth='sm' xs={'lg'}>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" > Domácí tým</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            value={teamHome}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            style={{ width: "130px" }}
                            name="teamHome"
                        >
                            {teams.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>

                        <Typography variant="h6" > Hostí tým</Typography>

                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            size="small"
                            value={teamHost}
                            onChange={this.handleChange}
                            variant="outlined"
                            style={{ width: "130px" }}
                            name="teamHost"
                        >
                            {teams.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" > Skore domaci</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            size="small"
                            value={scoreHome}
                            onChange={this.handleChange}
                            variant="outlined"
                            style={{ width: "130px" }}
                            name="scoreHome"
                            type="number"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" > Skore hoste</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            value={scoreHost}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            style={{ width: "130px" }}
                            name="scoreHost"
                            type="number"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" >Stav zapasu</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            id="outlined-select-currency"
                            value={matchState}
                            onChange={this.handleChange}
                            variant="outlined"
                            size="small"
                            style={{ width: "130px" }}
                            name="matchState"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" >Datum</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div style={{ width: "130px" }}>
                            <DatePicker
                                selected={date}
                                onChange={date => this.setState({date})}
                                showTimeSelect
                                timeFormat="H:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy H:mm"

                            />
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" color="primary" onClick={()=>this.props.addNewMatch(this.state)}>
                            Ulozit
                     </Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default connect(()=>({}),{addNewMatch})(CreateMatch)
