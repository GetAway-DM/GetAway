module.exports = {
  getPhotos: async (req, res) => {
    const db = req.app.get('db')
    const { listing_id } = req.params
    const photos = await db.get_listing_photos([listing_id])
    res.status(200).send(photos)
  },
  uploadPhoto: async (req, res) => {
    const db = req.app.get('db')
    const { listing_id } = req.params
    const { photo } = req.body
    await db.create_listing_photo([listing_id, photo])
    const photos = await db.get_listing_photos([listing_id])
    res.status(200).send(photos)
  },
  deletePhoto: async (req, res) => {
    const db = req.app.get('db')
    const { listing_id, photo_id } = req.params
    await db.delete_listing_photo([photo_id])
    const photos = await db.get_listing_photos([listing_id])
    res.status(200).send(photos)
  },
}
