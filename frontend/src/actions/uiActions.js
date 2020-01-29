
export const addMatchOpen = () => ({
    type: 'ADD_MATCH_OPEN'
})
export const addMatchClose = () => ({
    type: 'ADD_MATCH_ClOSE'
})

export const editingMatchOpen = (id) => ({
    type: 'EDIT_MATCH_OPEN',
    payload: id
})
export const editingMatchClose = () => ({
    type: 'EDIT_MATCH_ClOSE'
})

export const setCurrentPagePaginationFinished = (pageNumber) => ({
    type: 'SET_CURRENT_PAGE_PAGINATION_FINISHED',
    payload:pageNumber
})
export const setCurrentPagePaginationScheduled = (pageNumber) => ({
    type: 'SET_CURRENT_PAGE_PAGINATION_SCHEDULED',
    payload:pageNumber
})