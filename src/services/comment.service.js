import db from "../_helpers/connectionDb";
import { isNil, isEmpty } from "ramda";

const addCommnet = ({ user, body }) => {
  return new Promise((res, rej) =>
    db.connection.query(
      "INSERT INTO matchuserscomments(user,content,date,matchId) VALUES(?,?,?,?)",
      [user.sub, body.content, body.date, body.matchId],
      (err, result) => {
        if (isNil(err)) {
          res("Komentář byl úspěšně přidán");
        } else {
          rej(new Error("Komentář byl úspěšně přidán"));
        }
      }
    )
  );
};

const editComment = async ({ user, body, params }) => {
  const id = parseInt(params.id);
  return new Promise((res, rej) => {
    getCommentById(id).then(comment => {
      if (comment[0].user === user.sub) {
        db.connection.query(
          "UPDATE matchuserscomments SET content = ?, date = ? WHERE comment_id = ? AND user = ?",
          [body.content, body.date, id, user.sub],
          (err, result, fields) => {
            const ok = { ...fields };

            if (isNil(err)) {
              res("Komentář byl úspěšně aktualizovan");
            } else {
              rej(new Error(""));
            }
          }
        );
      } else {
        rej(new Error(""));
      }
    });
  });
};
const getTeamsUsersComments = id => {
  return new Promise((res, rej) => {
    db.connection.query(
      "SELECT matchuserscomments.comment_id,matchuserscomments.user, matchuserscomments.content,matchuserscomments.date, users.id,users.username,users.user_img,users.email  FROM matchuserscomments INNER JOIN users ON matchuserscomments.user = users.id WHERE matchuserscomments.matchId = ?",
      [id],
      (err, result) => {
        res(result);
      }
    );
  });
};

const getCommentById = id => {
  return new Promise(
    (res, rej) =>
      db.connection.query(
        "SELECT matchuserscomments.comment_id,matchuserscomments.user, matchuserscomments.content,matchuserscomments.date, users.id,users.username,users.user_img,users.email  FROM matchuserscomments INNER JOIN users ON matchuserscomments.user = users.id WHERE matchuserscomments.comment_id = ?",
        [id],
        (err, result) => {
          res(result);
        }
      )
    /* db.connection.query('SELECT * from matchuserscomments WHERE id = ?', [id], (err, result) => {
            if (isNil(err) && !isEmpty(result)) { 
                db.connection.query('SELECT * from users WHERE id = ?', [result[0].user], (err, dbUser) => {
                    if (isNil(err) && !isEmpty(dbUser)) { 
                        res({comment: { ...result[0],  user: dbUser[0] }  })
                    } else {
                        rej(new Error(''))
                    }
                })
            }
            else {
                rej(new Error(''))
            }
        })
        */
  );
};

//SELECT * FROM `matchuserscomments` INNER JOIN users ON matchuserscomments.user = users.id
export default {
  addCommnet,
  editComment,
  getCommentById,
  getTeamsUsersComments
};
