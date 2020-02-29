import React from 'react'
import { toast } from "react-toastify";
import {change} from 'redux-form'
import MatchGoalNotification from "../../components/MatchGoalNotif";
import Whistle from '../../utils/sounds/whistle.mp3'
export const liveSuccessMatch = (match) => (dispatch, getState) => {
    dispatch({type: 'SET_LIVE_MATCH', payload: match.match.id})
    dispatch(change('editingMatch','finished',false))
    const store = getState();
    const findedMatch = store.matches.matches.find((objMatch) => objMatch.id === match.match.id)
    const audio = new Audio(Whistle)
    JSON.parse(localStorage.getItem('LIVE_NOTIFIC_SOUND')) &&  audio.play()
    JSON.parse(localStorage.getItem('LIVE_NOTIFIC')) && toast(<MatchGoalNotification match={findedMatch} live />, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
}