import express from 'express';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Password } from '../services/password.js';
import { pool } from '../dbAccess/dbpool.js';
import { validateToken } from '../middlewares/validate-token.js';
import { logActions } from '../middlewares/log-actions.js';
import { sendGmail } from '../services/emailConfig.js';

const router = express.Router();

/*
  API end point to sign up new users on request.
*/
router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, phone_no,
          userpass, comments } = req.body;
  const userid = randomBytes(8).toString('hex');
  const password = await Password.toHash(userpass);

  await pool
    .query(
      `insert into users (userid, first_name, last_name, email, is_admin, phone_no, userpass, comments, signedup, active, signup_date)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`,
      [userid, first_name, last_name, email, 'no',
       phone_no, password, comments, 'yes', 'yes'])
    .then(() => {
      res.status(200).send({ message: 'User signup successfull.' });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

/*
  API end point to create new users on admin's request.
*/
router.post('/create', validateToken, logActions, async (req, res) => {
  const { first_name, last_name, email, 
          phone_no, userpass, is_admin, company_id, project_id, comments, active } = req.body;
  const userid = randomBytes(8).toString('hex');
  const password = await Password.toHash(userpass);

  await pool
    .query(
      `insert into users (userid, first_name, last_name, email, is_admin, 
        company_id, project_id, phone_no, userpass, comments, signedup, active)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userid, first_name, last_name, email, is_admin,
        company_id, project_id, phone_no, password, comments, 'no', 'yes'])
    .then(() => {
      res.status(200).send({ message: 'User successfully created.' });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  let existingUser = null;

  try {
    let [rows] = await pool.query(
      `select userid, first_name, last_name, email, userpass, is_admin 
       from users 
       where active = 'yes' and email = ? `,
      [email]
    );

    if (rows.length) {
      existingUser = rows[0];
    }

    if (!existingUser) {
      throw new Error('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.userpass,
      password
    );

    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
    }

    delete existingUser.userpass;

    await pool
    .query(`select role_id from user_roles where userid = ?`, [existingUser.userid])
    .then((result) => {

      let userRoles = new Array();
      let newArray = result[0];

      for (let i = 0; i < newArray.length; i++) {
        userRoles.push(newArray[i].role_id);
      }

      existingUser.roles = userRoles;
    })
    .catch((error) => {
      existingUser.roles = [];
    });

    const userJwt = jwt.sign(existingUser, process.env.JWT_KEY, {
      expiresIn: '180m',
    });

    res.status(200).json({ user: existingUser, token: userJwt });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

router.post('/changepass', validateToken, logActions, async (req, res) => {
  const { userid, password } = req.body;
  const passwordHash = await Password.toHash(password);

  await pool
    .query(`update users set userpass = ? where userid = ?`, [
      passwordHash,
      userid,
    ])
    .then((result) => {
      res.status(200).send({ message: 'Password successfully changed.' });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});



router.patch('/resetpass/:id', validateToken, logActions, async (req, res) => {
  const userid = req.params.id;
  const { userpass } = req.body;
  const password = await Password.toHash(userpass);

  await pool
    .query(`update users set userpass = ? where userid = ?`, [password, userid])
    .then((result) => {
      res.status(200).send({ message: 'Password reset for the given user.' });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});



/*
  Delete user.
*/
router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  await pool
    .query(`delete from users where userid = ?`, [id])
    .then(() => {
      res.status(200).send({ message: 'User successfully deleted.' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

/*
  Get list of roles assigned to all users.
*/
router.get('/assigned-roles', validateToken, async (req, res) => {
  await pool.query(
    `select users.userid as userid, users.first_name as first_name, users.last_name as last_name,
      users.email as email, a.roles as role_list
     from
      ( select a.userid, group_concat(b.role_name) roles
      from users a, app_roles b, user_roles c
      where c.userid = a.userid
      and c.role_id = b.role_id
      group by a.userid ) a
     right outer join users
     on users.userid = a.userid`
  )
  .then((rows) => {
    return res.status(200).send({ users: rows[0] })
  })
  .catch ((err) => {
    return res.status(500).send({ message: err.message });
  });
});




export { router as userRouter };
