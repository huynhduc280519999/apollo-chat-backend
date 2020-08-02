import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import connectRedis from 'connect-redis'
import redis from 'redis'
import {
  PORT, IN_PRO, 
  DB_NAME, DB_PASSWORD, DB_USERNAME,
  SESS_NAME, SESS_SECRET, SESS_LIFETIME,
  REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
} from './config'
import mongoose from 'mongoose'
import session from 'express-session'
import schemaDirectives from './directives'

(async () => {
  try{
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-pvxto.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {useNewUrlParser: true}
    )
    
    const app = express()
    
    const RedisStore = connectRedis(session)
    let client = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
      no_ready_check: true,
      auth_pass: REDIS_PASSWORD,
      // pass: REDIS_PASSWORD
    })
    app.use(session({
      store: new RedisStore({ client }),
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        sameSite: true,
        secure: IN_PRO
      }
    }))

    
    app.disable('x-powered-by')
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      schemaDirectives,
      playground: IN_PRO ? false: {
        settings: {
          'request.credentials':'include'
        }
      },
      context: ({req, res}) => ({req,res})
    });
    server.applyMiddleware({ app, cors: false });
    
    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (e){
    console.error(e);
  }
})()
