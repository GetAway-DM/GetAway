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

    
    const {uploadedPhoto} = req.body
    const photoArray = uploadedPhoto.map((e) => ({ listing_id: listing_id, photo: e }))

    const [photos] = await db.listing_photos.insert(photoArray)

    res.status(200).send(photos)
  },
  deletePhoto: async (req, res) => {
    const db = req.app.get('db')
    const {photo_id} = req.params
    const [photos] = await db.delete_listing_photo([photo_id])
    
    res.status(200).send(photos)
  },
}
