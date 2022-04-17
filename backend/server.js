const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/connection');
const bodyParser = require('body-parser')

const app = express();

const restaurants = require('./routes/restaurants')
const categories = require('./routes/categories')
const comments = require('./routes/comments')
const users = require('./routes/users')
const session = require('./routes/session')
const communities = require('./routes/Communities/communities')
const posts = require('./routes/Communities/posts')
const community_comments = require('./routes/Communities/comments')
const community_likes = require('./routes/Communities/likes')
const restaurants_categories = require('./routes/restaurants-categories')
const search = require('./routes/search')
const forgot_password = require('./routes/forgot-password')

connectDB;

dotenv.config()

app.use(cors({origin: [
    'http://localhost:3000',
    'http://localhost:3000/restaurants'],
    credentials:true}))
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(cookieParser())

app.use('/forgot-password', forgot_password)
app.use('/search', search)
app.use('/restaurants', restaurants)
app.use('/restaurants-categories', restaurants_categories)
app.use('/categories', categories)
app.use('/comments', comments)
app.use('/users', users)
app.use('/session', session)
app.use('/communities', communities)
app.use('/posts', posts)
app.use('/community/comments', community_comments)
app.use('/community/likes', community_likes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})