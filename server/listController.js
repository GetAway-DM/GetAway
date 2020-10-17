module.exports = {
  getAllListings: async(req, res) => {
      const db = req.app.get('db')
      const listings = await db.get_all_listings()
      res.status(200).send(listings)
  },
   getListing: async(req, res) => {
   console.log(req.params.listing_id)
    req.app
        .get('db')
        .get_listing_by_id(req.params.listing_id)
        .then((listing) =>
            listing[0] ? res.status(200).send(listing[0]) : res.status(200).send(listing)
        )
  },
}
