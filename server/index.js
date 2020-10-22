require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController.js')
const listCtrl = require('./listController')
const resCtrl = require('./resController')
const verifyUser = require('./middlewares/verifyUser')
const aws = require('aws-sdk')

const app = express()

const {
  CONNECTION_STRING,
  SERVER_PORT,
  SESSION_SECRET,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
)

app.get('/sign-s3', (req, res) => {
  aws.config = {
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }

  const s3 = new aws.S3()
  const fileName = req.query['file-name']
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err)
      return res.end()
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    }

    return res.send(returnData)
  })
})

//Endpoints--
// auth endpoints
app.post('/api/auth/newuser', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.post('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/me', authCtrl.getUser)
app.put('/api/user/edit', authCtrl.editUser)

// list endpoints
app.get('/api/listing/getlistings', listCtrl.getAllListings)
app.get('/api/listing/getlisting/:listing_id', listCtrl.getListing)
app.post('/api/listing/newlisting', verifyUser, listCtrl.addListing)
app.put('/api/listing/editlisting/:listing_id', listCtrl.editListing)
app.delete('/api/listing/deletelisting/:listing_id', listCtrl.deleteListing)

//reservation endpoints
app.get('/api/reservations/:user_id', verifyUser, resCtrl.getUserReservations)
app.post('/api/reservation/newreservation/:listing_id', resCtrl.createReservation)
app.delete('/api/reservation/deletereservation/:res_id', resCtrl.deleteReservation)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('The database is working')
    app.listen(SERVER_PORT, () => console.log(`Project running on Port ${SERVER_PORT}`))
  })
  .catch((err) => console.log(err))
