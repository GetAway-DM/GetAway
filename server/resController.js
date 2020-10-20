module.exports = {
  createReservation: async (req, res) => {
    const db = req.app.get('db')

    const { date_from, date_to } = req.body
    const { listing_id } = req.params

    const [reservation] = await db.check_listing([listing_id, date_from, date_to])
    if (reservation) {
      return res.status(409).send('listing is currently booked')
    }
    if (date_from > date_to) {
      return res.status(500).send(console.log('date_to cannot be earlier than date_from'))
    } else if (date_from === null || date_to === null || date_from === '' || date_to === '') {
      return res.status(500).send(console.log('please select both dates'))
    } else {
      const [reservation] = await db.create_reservation(req.session.user.user_id, listing_id, date_from, date_to)

      res.status(200).send(reservation)
    }
  },
  deleteReservation: async (req, res) => {
    const db = req.app.get('db')
    const { res_id } = req.params

    await db.delete_reservation([res_id])

    const getMyRes = await db.get_user_reservations([req.session.user.user_id])

    res.status(200).send(getMyRes)
  },
}
