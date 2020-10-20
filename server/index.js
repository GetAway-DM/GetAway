require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./authController.js')
const listCtrl = require('./listController')
const resCtrl = require('./resController')

const app = express()

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
)

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
app.post('/api/listing/newlisting', listCtrl.addListing)
app.put('/api/listing/editlisting/:listing_id', listCtrl.editListing)
app.delete('/api/listing/deletelisting/:listing_id', listCtrl.deleteListing)

//reservation endpoints
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
