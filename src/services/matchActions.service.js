import db from '../_helpers/connectionDb'
import { isNil, isEmpty } from 'ramda'

const addAction = ({body}) => {
    const {content,type,teamHomeOrHost,time,seconds,match_id,generalType, faulTypes} = body;
    console.log(body)
    return new Promise((res,rej) => {
        db.connection.query('INSERT INTO matchactions(content,type,teamHomeOrHost,time,seconds,faulType,match_id,generalType) VALUES(?,?,?,?,?,?,?,?)',
        [content,type,teamHomeOrHost,time,seconds,faulTypes,match_id,generalType], (err, result) => {
            console.log(err)
                if(err) {
                    rej(new Error(''))
                } else {
                    res({message: 'Akce byla uspesne pridana'})
                }
        })
    })
}

const editAction = ({body}) => {
    const {content,type,teamHomeOrHost,time,seconds,matchactions_id,faulTypes, generalType} = body;
    return new Promise((res,rej) => {
        db.connection.query('UPDATE matchactions SET content =? ,'+
         'type = ?, teamHomeOrHost =?, time= ?, seconds = ?, faulType = ?, generalType = ? WHERE matchactions_id = ?',
        [content,type,teamHomeOrHost,time,seconds,faulTypes,generalType,matchactions_id], (err, result) => {
            console.log(err)
                if(err) {
                    rej(new Error(''))
                } else {
                    res({message: 'Akce byla uspesne aktualizovana'})
                }
        })
    })
}
const deleteAction = ({body : {matchactions_id}}) => {
    return new Promise((res,rej) => {
        db.connection.query('DELETE FROM matchactions WHERE matchactions_id = ?',
        [matchactions_id], (err, result) => {
            console.log(err)
                if(err) {
                    rej(new Error(''))
                } else {
                    res({message: 'Akce byla uspesne smazana'})
                }
        })
    })
}
const getActionsOfMatchById = (id) => {
    return new Promise((res,rej) => {
        db.connection.query('SELECT * from matchactions WHERE match_id = ? ',
        [id], (err, result) => {
                if(err) {
                    rej(new Error(''))
                } else {
                    res(result)
                }
        })
    })
}
export default {
    addAction,
    getActionsOfMatchById,
    editAction,
    deleteAction
}