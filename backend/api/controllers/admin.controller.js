const User =
  require(
    "../models/user.model"
  );

async function getUsers(
  req,
  res
) {

  try {

    const users =
      await User.findAll({

        attributes: {
          exclude: [
            "password"
          ]
        }

      });

    res.json(users);

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

  getUsers

};