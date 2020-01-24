import { toast } from "react-toastify";
import React from "react";
import MatchGoalNotification from "../../components/MatchGoalNotif";
import Horn from '../../utils/sounds/goal_horn.mp3'
export const updateAfterGoalSocket = match => (dispatch, getStore) => {
  dispatch({
    type: "UPDATE_SCORE_AFTER_GOAL_SOCKET",
    payload: match
  });
  const store = getStore();
  const findedMatch = store.matches.matches.find((objMatch) => objMatch.id === match.id)
  console.log(findedMatch)
  const audio = new Audio(Horn)
  audio.play()
 
  toast(<MatchGoalNotification match={findedMatch} />, {
    position: "bottom-left",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
