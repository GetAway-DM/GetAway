module.exports = {
  getAllListings: async (req, res) => {
    const db = req.app.get('db')
    const listings = await db.get_all_listings()
    res.status(200).send(listings)
  },
  getListing: async (req, res) => {
    req.app
      .get('db')
      .get_listing_by_id(req.params.listing_id)
      .then((listing) => (listing[0] ? res.status(200).send(listing[0]) : res.status(200).send(listing)))
  },
  addListing: async (req, res) => {
    const db = req.app.get('db')
    const {
      title,
      description,
      property_type,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
    } = req.body

    const { user_id } = req.session

    await db.create_listing([
      title,
      description,
      user_id,
      property_type,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
    ])

    const [listings] = await db.get_all_listings()

    res.status(200).send(listings)
  },
  editListing: async (req, res) => {
    const db = req.app.get('db')

    const {
      title,
      description,
      property_type,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
    } = req.body

    const { listing_id } = req.params

    const [editUser] = await db.edit_listing(
      listing_id,
      title,
      description,
      property_type,
      bedrooms,
      bathrooms,
      price,
      street,
      city,
      state,
      zip,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool
    )

    res.status(200).send(editUser)
  },
  deleteListing: async (req, res) => {
    const db = req.app.get('db')

    const { listing_id } = req.params

    await db.delete_listing([listing_id])

    const deletedListing = await db.get_all_listings()

    res.status(200).send(deletedListing)
  },
  getAllAmenities: async (req, res) => {
    const db = req.app.get('db')
    const amenities = await db.get_all_amenities()
    res.status(200).send(amenities)
  },
  getAmenitiesByListingId: async (db) => {
    const listing = await db.get_listing()
    const getAmenitiesByListingId = await Promise.all(listing.map(async listing => {
      const amenities = await db.get_amenities_by_listing_id([listing.id])
      return { ...listing, amenities }
    }))
    return getAmenitiesByListingId
  }
}
