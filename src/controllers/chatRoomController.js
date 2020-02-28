import express from "express";
const router = express.Router();
import db from "../_helpers/connectionDb";
import matchService from "../services/matches.service";
import authorize from "../_helpers/authorize";
import Role from "../_helpers/role";
import chatRoomService from "../services/chatRoomService";

router.get("", (req, res) => {
  matchService.getAllMatches(req, res);
});
router.get("/getAllComments", (req, res) => {
  chatRoomService.getAllComments(req,res)
});
router.post("/delete", (req, res) => {
  chatRoomService.deleteComment(req,res)
});


router.post("/create",authorize(), createComment);

router.post("/createSubComment",authorize(), createSubComment);
router.post("/updateComment",authorize(), updateSubComment);

function createComment(req, res) {
  chatRoomService.createComment(req, res);
}
function createSubComment(req, res) {
  chatRoomService.createSubComment(req, res);
}
function updateSubComment(req, res) {
  chatRoomService.updateSubComment(req, res);
}

module.exports = router;
