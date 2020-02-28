import React from 'react'
import { toast } from "react-toastify";
import MatchGoalNotification from "../../components/MatchGoalNotif";
import Whistle from '../../utils/sounds/whistle.mp3'
import {loadMatches} from '../matches'
import {change} from 'redux-form'
export const finishedMatch = (match) => (dispatch, getState) => {
    dispatch({type: 'SET_FINISHED_MATCH', payload: match.match.id})
    dispatch(change('editingMatch','finished', true))
    dispatch(change('editingMatch','live', false))
    dispatch(loadMatches())

    const store = getState();
    const findedMatch = store.matches.matches.find((objMatch) => objMatch.id === match.match.id)
    const audio = new Audio(Whistle)
    console.log('NOTIF')
    JSON.parse(localStorage.getItem('LIVE_NOTIFIC_SOUND')) &&audio.play()
    JSON.parse(localStorage.getItem('LIVE_NOTIFIC')) && toast(<MatchGoalNotification match={findedMatch} finished />, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
}