import {toast} from 'react-toastify'
export const createActionMatch = (action) => (dispatch, getState) => {
    const {user} = getState();
    fetch('/actions/addAction', {
        method: 'POST', body: JSON.stringify(action),
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
    .then((res)=> { toast('✅ Akce byla přidána', {
        hideProgressBar: true
    })})
    .catch((err)=> toast.warn('Něco se nezdařilo')) 
}

export const editActionMatch = (action) => (dispatch, getState) => {
    const {user} = getState();
    fetch('/actions/editAction', {
        method: 'POST', body: JSON.stringify(action),
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
    .then((res)=> { toast('✅ Akce byla přidána', {
        hideProgressBar: true
    })})
    .catch((err)=> toast.warn('Něco se nezdařilo')) 
}
export const deleteActionMatch = (action) => (dispatch, getState) => {
    const {user} = getState();
    fetch('/actions/deleteAction', {
        method: 'POST', body: JSON.stringify(action),
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.json()
        } else {
            throw new Error()
        }
    })
    .then((res)=> { toast('✅ Akce byla smazana', {
        hideProgressBar: true
    })})
    .catch((err)=> toast.warn('Něco se nezdařilo')) 
}