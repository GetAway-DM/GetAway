import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import AlertDialog from './AlertDialog'
// import './listing.css'
import './rules.css'

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxSizing: 'borderBox',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: '26vh',
    padding: '0 30px',
    zIndex: 1,
  },
  rules: {
    zIndex: '2',
  },
})

const Rules = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} style={{ zIndex: '-1' }}>
      <Box className="rules-box">
        <Box>
          <h1>Things to Know</h1>
        </Box>
        <ul className="list-box">
          <h4>House Rules</h4>
          <li>Check-in: After 3:00PM</li>
        </ul>
        <ul className="list-box">
          <h4>Health & safety</h4>
          <li>Carbon monoxide alarm</li>
          <li>Smoke alarm</li>
        </ul>
        <ul className="list-box">
          <h4>Cancellation Policy</h4>
          <li>
            Get Away's social distancing and other COVID-19-related guidelines
            apply
          </li>
          <h5>
            <AlertDialog />
          </h5>
        </ul>
      </Box>
    </Container>
  )
}

export default Rules
