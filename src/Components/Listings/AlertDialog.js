import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Link } from 'react-router-dom'
import DialogTitle from '@material-ui/core/DialogTitle'

function AlertDialog() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        More Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Frequently asked question'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Do guests get a refund of the cleaning fee?</h3>

            <p>
              The cleaning fee is refunded if the guest cancels before check-in.
            </p>

            <h3>
              Can guests get a refund if the listing isn’t what was expected?
            </h3>
            <p>
              We’ll help guests find a new place to stay or issue a refund if
              the listing is inaccessible, unclean, unsafe, or if there’s an
              animal present that the host didn’t mention in the listing
              description. Learn more
            </p>
            <h3>
              Can guests get a full refund if the host can’t or won’t fix an
              issue?
            </h3>
            <p>
              Guests should contact us within 24 hours of finding the issue. In
              qualifying cases, we will cancel a reservation and issue a refund.
            </p>
            <h3>What if a guest needs to cancel because of an emergency?</h3>
            <p>
              We may be able to issue a refund if a guest has to cancel because
              of an emergency. Learn more How long does it take to get a refund?
              We send refunds immediately upon cancellation and they usually
              show up within 3-5 days, but sometimes it takes as long as 15 days
              before they reflect on the original payment method. In some
              countries, such as Brazil and India, it can take up to 2 months
              for the refund to arrive. .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary">Disagree</Button>
          </Link>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertDialog
