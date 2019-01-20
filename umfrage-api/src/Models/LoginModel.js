import {pool} from '../index.js'

export const existsUser = (user) => pool.query('SELECT COUNT(*) AS user_exists FROM users WHERE user_name = ?', [user])
.then((result) => {
    //Gibt true zurück wenn User existiert
    return result[0][0].user_exists === 1;
})
.catch((err) => {
    return err;
})


export const getHashedPassword = (user) => pool.query('SELECT * FROM users WHERE user_name = ?', [user])
.then((result) => {
    return result[0][0].password_hash;
})
.catch((err) => {
    return err;
})