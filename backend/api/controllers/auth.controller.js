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

async function updateMe(
  req,
  res
) {

  try {

    const user =
      await User.findByPk(
        req.user.id
      );

    if (!user) {

      return res
        .status(404)
        .json({
          message:
            "Utilisateur introuvable"
        });

    }

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      postal_code,
      city,
      country,
      avatar
    } = req.body;

    await user.update({

      firstName,
      lastName,
      email,
      phone,
      address,
      postal_code,
      city,
      country,
      avatar

    });

    res.json({

      message:
        "Profil mis à jour avec succès",

      user

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

async function changePassword(
  req,
  res
) {

  try {

    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    const user =
      await User.findByPk(
        req.user.id
      );

    if (!user) {

      return res
        .status(404)
        .json({
          message:
            "Utilisateur introuvable"
        });

    }

    const validPassword =
      await argon2.verify(
        user.password,
        currentPassword
      );

    if (!validPassword) {

      return res
        .status(400)
        .json({
          message:
            "Mot de passe actuel incorrect"
        });

    }

    if (
      newPassword !==
      confirmPassword
    ) {

      return res
        .status(400)
        .json({
          message:
            "Les mots de passe ne correspondent pas"
        });

    }

    const hashedPassword =
      await argon2.hash(
        newPassword
      );

    await user.update({

      password:
        hashedPassword

    });

    res.json({

      message:
        "Mot de passe modifié avec succès"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}


async function forgotPassword(
  req,
  res
) {

  try {

    const { email } =
      req.body;

    const user =
      await User.findOne({
        where: { email }
      });

    if (!user) {

      return res.json({
        message:
          "Si cet email existe, un lien a été envoyé."
      });

    }

    const token =
  require("crypto")
    .randomBytes(32)
    .toString("hex");

    const expires =
      new Date(
        Date.now() +
        1000 * 60 * 30
      );

    await user.update({

      reset_password_token:
        token,

      reset_password_expires:
        expires

    });

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        user.email,

      subject:
        "Réinitialisation du mot de passe Nexora",

      html: `
        <h2>Nexora</h2>

        <p>
          Cliquez sur le bouton ci-dessous
          pour réinitialiser votre mot de passe.
        </p>

        <a
          href="${resetLink}"
          style="
            background:#d4af37;
            color:black;
            padding:12px 20px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Réinitialiser
        </a>

        <p>
          Ce lien expire dans 30 minutes.
        </p>
      `

    });

    res.json({

      message:
        "Si cet email existe, un lien a été envoyé."

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

async function resetPassword(
  req,
  res
) {

  try {

    const { token } =
      req.params;

    const {
      password,
      confirmPassword
    } = req.body;

    if (
      password !==
      confirmPassword
    ) {

      return res
        .status(400)
        .json({
          message:
            "Les mots de passe ne correspondent pas"
        });

    }

    const user =
      await User.findOne({

        where: {

          reset_password_token:
            token

        }

      });

    if (
      !user ||
      !user.reset_password_expires ||
      new Date(
        user.reset_password_expires
      ) < new Date()
    ) {

      return res
        .status(400)
        .json({
          message:
            "Lien invalide ou expiré"
        });

    }

    const hashedPassword =
      await argon2.hash(
        password
      );

    await user.update({

      password:
        hashedPassword,

      reset_password_token:
        null,

      reset_password_expires:
        null

    });

    res.json({

      message:
        "Mot de passe réinitialisé avec succès"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}

module.exports = {

  register,

  login,

  me,

  updateMe,

  changePassword,

  forgotPassword,

  resetPassword

};