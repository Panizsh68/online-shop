export default () => ({
    database: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Shop'
})
    
