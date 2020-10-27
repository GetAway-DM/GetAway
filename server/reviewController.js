module.exports = {
    getAllReviews: async (req, res) => {
        const db = req.app.get('db')
        const { property_id } = req.params
        const reviews = await db.get_reviews([property_id])
        res.status(200).send(reviews)
    },
    addReview: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user
        const { property_id } = req.params
        const { rating, content, created_at } = req.body

        await db.create_review([property_id, user_id, rating, content, created_at])

        const reviews = await db.get_reviews([property_id])
        res.status(200).send(reviews)
    },
    deleteReview: async (req, res) => {
        const db = req.app.get('db')
        const { property_id, review_id } = req.params

        await db.delete_review([review_id])

        const reviews = await db.get_reviews([property_id])
        res.status(200).send(reviews)
    }
}
