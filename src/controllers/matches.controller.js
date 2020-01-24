import express from "express";
const router = express.Router();
import db from "../_helpers/connectionDb";
import matchService from "../services/matches.service";
import authorize from "../_helpers/authorize";
import Role from "../_helpers/role";

router.get("", (req, res) => {
  matchService.getAllMatches(req, res);
});

router.get("/:id", getMatchId);
router.post("/create", authorize(Role.Admin), createMatch);
router.post("/:id/edit", authorize(Role.Admin), editMatch);
router.delete("/:id/delete", authorize(Role.Admin), deleteMatch);

function getMatchId(req, res) {
  matchService.getMatchId(req, res);
}
function deleteMatch(req, res) {
  matchService.deleteMatch(req, res);
}
function createMatch(req, res) {
  matchService.createMatch(req, res);
}
function editMatch(req, res) {
  matchService.editMatch(req, res);
}
module.exports = router;
