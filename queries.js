const Pool = require('pg').Pool
const poolConfig = {
    user: 'nick',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: '5432'
}
const pool = new Pool(poolConfig)

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('error: ', error)
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name, email} = req.body
    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)', 
        [name, email], 
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User added with id: ${results.insertId}`)
        }
    )
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, email} = req.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', 
        [name, email, id], 
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User modified with id: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User deleted with id: ${id}`)
        }
    )
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}