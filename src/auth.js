import { AuthenticationError } from 'apollo-server-express'
import {User} from './models'
import {SESS_NAME} from './config'
export const attempSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again'
  const user = await User.findOne({email})
  if(!user){
    throw new AuthenticationError(message)
  }

  if (!await user.matchesPassword(password)){
    throw new AuthenticationError(message)
  }

  return user
}

const signedIn = req => req.session.userId

export const ensureSignedIn = req => {
  if(!signedIn(req)){
    throw new AuthenticationError('you must be signed')
  }
}
export const ensureSignedOut = req => {
  if(signedIn(req)){
    throw new AuthenticationError('you are already')
  }
}
export const signOut = (req, resp) => new Promise(
  (resolve, rejects) => {
    req.session.destroy(err =>{
      if(err) rejects(err)

      resp.clearCookie(SESS_NAME)
      resolve(true)
    })
  })