module.exports = {
  getStreet: async (req, res) => {
    const db = req.app.get('db')
    const street = await db.get_street()
    res.status(200).send(street)
  },
  getState: async (req, res) => {
    const db = req.app.get('db')
    const state = await db.get_state()
    res.status(200).send(state)
  },
  getCity: async (req, res) => {
    const db = req.app.get('db')
    const city = await db.get_city()
    res.status(200).send(city)
  },
}
