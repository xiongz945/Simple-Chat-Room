module.exports = {
    port: 3000,
    session: {
        secret: 'webappdemo',
        key: 'webappdemo',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/webappdemo'
}