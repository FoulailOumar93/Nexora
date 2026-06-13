const User =
  require("../models/user.model");

const argon2 =
  require("argon2");

const jwt =
  require("jsonwebtoken");

async function register(
  req,
  res
) {

  try {

    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({
        where: {
          email
        }
      });

    if (existingUser) {

      return res
        .status(409)
        .json({
          message:
            "Cet email existe déjà."
        });

    }

    const hashedPassword =
      await argon2.hash(
        password
      );

    const user =
      await User.create({

        firstName,

        lastName,

        email,

        password:
          hashedPassword

      });

    res.status(201).json({

      message:
        "Compte créé avec succès",

      user: {

        id: user.id,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email

      }

    });

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

async function login(
  req,
  res
) {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        where: {
          email
        }
      });

    if (!user) {

      return res
        .status(401)
        .json({
          message:
            "Email ou mot de passe incorrect"
        });

    }

    const validPassword =
      await argon2.verify(
        user.password,
        password
      );

    if (!validPassword) {

      return res
        .status(401)
        .json({
          message:
            "Email ou mot de passe incorrect"
        });

    }

    const token =
      jwt.sign(

        {
          id: user.id,
          role: user.role
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      );

    res.json({

      token,

      user: {

        id: user.id,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email,

        role:
          user.role

      }

    });

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

async function me(
  req,
  res
) {

  try {

    const user =
      await User.findByPk(
        req.user.id,
        {
          attributes: {
            exclude: [
              "password"
            ]
          }
        }
      );

    if (!user) {

      return res
        .status(404)
        .json({
          message:
            "Utilisateur introuvable"
        });

    }

    res.json(user);

  } catch (error) {

    console.error(
      error
    );

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

module.exports = {

  register,

  login,

  me

};