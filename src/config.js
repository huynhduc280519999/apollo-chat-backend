export const {
  PORT = 4000,
  NODE_ENV = 'development',
  
  DB_USERNAME = 'duc',
  DB_PASSWORD = 'duc1234a',
  DB_NAME = 'chat',
  SESS_NAME =  'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 *2,
  
  REDIS_HOST = 'redis-12212.c8.us-east-1-4.ec2.cloud.redislabs.com',
  REDIS_PORT = 12212,
  REDIS_PASSWORD = 'ZopzQMVdIU01c54OLF6r4vS69FhTzgrt'
}  = process.env

export const IN_PRO = NODE_ENV === 'production';