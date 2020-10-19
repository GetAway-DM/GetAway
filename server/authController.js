const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { email, first_name, last_name, password } = req.body

        const [user] = await db.check_user([email])

        if (user) {
            return res.status(409).send('Email is already in use. Please try signing in.')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.register_user([email, first_name, last_name, hash])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },

    getUser: (req, res) => {
        console.log(req.session)
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No session found')
        }
    },

    login: async (req, res) => {
        const db = req.app.get('db')

        const { email, password } = req.body

        const [existingUser] = await db.check_user([email])

        if (!existingUser) {
            return res.status(404).send("Oops! Couldn't find your account. Please try again or create an account.")
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect email or password. Please try again.')
        }

        delete existingUser.hash

        req.session.user = existingUser

        res.status(200).send(req.session.user)
    },
    editUser: async (req, res, next) => {
        const db = req.app.get('db')
        const { user_id, email, first_name, last_name, profile_img } = req.body

        const [newUser] = await db.edit_user([user_id, email, first_name, last_name, profile_img])

        req.session.user = newUser

        res.status(200).send(req.session.user)    
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}
