module.exports = {
  port: 8090,
  mongodb: 'mongodb://maczyt:maczyt@ds161210.mlab.com:61210/myblog',
  session: {
    secret: 'server-api',
    key: 'server-api',
    maxAge: 2592000000
  }
};