module.exports = {
  createReservation: async (req, res) => {
    const db = req.app.get('db')

    const { dateFrom, dateTo } = req.body
    const { listing_id } = req.params

    const [reservation] = await db.check_listing([listing_id, dateFrom, dateTo])
    if (reservation) {
      return res.status(409).send('listing is currently booked')
    }
    if (dateFrom > dateTo) {
      return res.status(500).send(console.log('dateTo cannot be earlier than dateFrom'))
    } else if (dateFrom === null || dateTo === null || dateFrom === '' || dateTo === '') {
      return res.status(500).send(console.log('please select both dates'))
    } else {
      console.log(dateFrom)
      console.log(dateTo)
      const [reservation] = await db.create_reservation(req.session.user.user_id, listing_id, dateFrom, dateTo)

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
