import React from 'react'
import { toast } from "react-toastify";
import MatchGoalNotification from "../../components/MatchGoalNotif";
import Whistle from '../../utils/sounds/whistle.mp3'
export const finishedMatch = (match) => (dispatch, getState) => {
    dispatch({type: 'SET_FINISHED_MATCH', payload: match.match.id})
    const store = getState();
    const findedMatch = store.matches.matches.find((objMatch) => objMatch.id === match.match.id)
    const audio = new Audio(Whistle)
    audio.play()
    toast(<MatchGoalNotification match={findedMatch} finished />, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
}