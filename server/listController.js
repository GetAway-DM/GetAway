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
    addListing: async(req, res) => {
      const db = req.app.get('db')
      const { title, description, property_type, bedrooms, bathrooms, price, street, city, state, zip, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool } = req.body

    const { user_id } = req.session

       await db.create_listing([ title, description, user_id, property_type, bedrooms, bathrooms, price, street, city, state, zip, parking, television, washer_dryer, air_conditioning, wifi, hair_dryer, pool ])

       const [ listings ] = await db.get_all_listings()

       res.status(200).send(listings)

       },
       editListing: async(req, res) => {
            /*
            TODO Get content from req.body
            TODO Get listing_id from req.params
            TODO Save the updated post to the db
            TODO Send back all posts
            */

            const db = req.app.get('db')

            const { } = req.body

            const { listing_id } = req.params

            await db.edit_listing
       }
    }




