module.exports = {
  getAllListings: async (req, res) => {
    const db = req.app.get('db')
    const listings = await db.get_all_listings()
    res.status(200).send(listings)
  },
  getListing: async (req, res) => {
    const db = req.app.get('db')
    const listing = await db.get_listing_by_id(req.params.listing_id)
    if (!listing[0]) {
      return res.status(200).send(listing)
    }
    const amenities = await db.get_amenities_by_listing_id(listing[0].listing_id)
    listing[0].amenities = amenities[0]
    res.status(200).send(listing[0])
  },
  addListing: async (req, res) => {
    const db = req.app.get('db')
    const {
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
    } = req.body

    const [listing] = await db.create_listing([
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
    ])
    const listing_id = listing.listing_id

    await db.create_amenities([
      listing_id,
      parking,
      television,
      washer_dryer,
      air_conditioning,
      wifi,
      hair_dryer,
      pool,
    ])

    res.status(200).send(listing)
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
      [listing_id,
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
      pool]
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
    const listing = await db.get_listing_by_id()
    const getAmenitiesByListingId = await Promise.all(listing.map(async listing => {
      const amenities = await db.get_amenities_by_listing_id([listing.id])
      return { ...listing, amenities }
    }))
    return getAmenitiesByListingId
  },
  getMyListings: async (req, res) => {
    const db = req.app.get('db')
    const myListings = await db.get_listing_by_owner(req.params.owner_id)

    res.status(200).send(myListings)
  }

}
