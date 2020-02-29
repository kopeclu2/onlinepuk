import axios from 'axios'


export const addAllcoments = (data) => ({
    type: 'DISCUSION_COMMENTS',
    payload: data
})
const loadComments = () => async (dispatch, getState) => {
    dispatch({
        type: 'LOADING_DISCUSION'
    })
    const request =  await axios.get('http://localhost:4000/chatRoom/getAllComments');
    dispatch(addAllcoments(request.data))
    dispatch({
        type: 'FINISHED_LOADING_DISCUSION'
    })
}
export default loadComments