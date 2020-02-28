import axios from 'axios'

const loadComments = () => async (dispatch, getState) => {
    dispatch({
        type: 'LOADING_DISCUSION'
    })
    const request =  await axios.get('http://localhost:4000/chatRoom/getAllComments');
    dispatch({
        type: 'DISCUSION_COMMENTS',
        payload: request.data
    })
    dispatch({
        type: 'FINISHED_LOADING_DISCUSION'
    })
}
export default loadComments