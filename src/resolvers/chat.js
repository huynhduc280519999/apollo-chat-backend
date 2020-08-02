import {startChat} from './../schemas'
import Joi from 'joi'
import {UserInputError} from 'apollo-server-express'
import {User, Chat} from '../models'
export default {
  Mutation: {
    startChat: async (root, args, {req}, info) => {
      const {userId} = req.session
      const {title, userIds} = args
      await Joi.validate(args, startChat(userId), {abortEarly:false})

      // args.userIds.push(userID)
      // const idsFound = User.where('_id').in(userIds);
      // console.log(idsFound);
      
      // if(idsFound !== userIds.length){
      //   throw new UserInputError('One or more User IDs are invalid')
      // }

      userIds.push(userId)
      const chat = await Chat.create({title, users: userIds})
      await User.updateMany({_id: {'$in': userIds}},{
        $push: {chats: chat}
      })
      return {}
    }
  }
}