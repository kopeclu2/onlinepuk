import { User } from './User';

const mongoose = require('mongoose')
const chatRoomCommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    isSubComment: {
        type: Boolean
    },
    subComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoomComment'}
    ]
  }, {collection: 'chatRoom'})
  export const ChatRoomComment  = mongoose.model('ChatRoomComment', chatRoomCommentSchema);