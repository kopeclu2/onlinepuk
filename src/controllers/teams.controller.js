import express from 'express'; 
const router = express.Router();
import db from '../_helpers/connectionDb'
import matchService from '../services/matches.service'
import authorize from '../_helpers/authorize'
import Role from '../_helpers/role'
import teamsService from '../services/teams.service'

router.get('/all', getAllTeams)
router.get('/:id', getTeamById)

function getAllTeams(req,res){
    teamsService.getAllTeams(req,res)
}
async function getTeamById(req,res){
    const id = parseInt(req.params.id);
    const result = await teamsService.getTeamById(id);
    res.send(result)
}
export default router;