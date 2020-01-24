import express from 'express'; 
const router = express.Router();
import matchService from '../services/matches.service'
import authorize from '../_helpers/authorize'
import Role from '../_helpers/role'
import matchActionService from '../services/matchActions.service'
import matchActionsService from '../services/matchActions.service';
router.get('',(req,res) => {
    matchService.getAllMatches(req,res)
})

router.post('/addAction', authorize(Role.Admin), addMatchAction)
router.post('/editAction', authorize(Role.Admin), editMatchAction)
router.post('/deleteAction', authorize(Role.Admin), deleteMatchAction)

async function addMatchAction(req,res){
    const result = await matchActionsService.addAction(req)
    .catch(err => res.status(400).send({message: 'Pridani akce se nezdarilo'}))
    res.send(result)
}
async function editMatchAction(req,res){
    const result = await matchActionsService.editAction(req)
    .catch(err => res.status(400).send({message: 'Aktualiyace akce se nezdarilo'}))
    res.send(result)
}
async function deleteMatchAction(req,res){
    const result = await matchActionsService.deleteAction(req)
    .catch(err => res.status(400).send({message: 'Smazani akce se nezdarilo'}))
    res.send(result)
}

export default router;