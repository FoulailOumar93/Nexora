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
          "Un lien a été envoyé pour réinitialiser le mot de passe"
      });

    }

    console.log(
      "✅ Utilisateur trouvé :",
      user.email
    );

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

    console.log(
      "✅ Token sauvegardé :",
      token
    );

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    console.log(
      "🔗 Lien généré :",
      resetLink
    );

    const info =
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

    console.log(
      "✅ Mail envoyé :",
      info.messageId
    );

    res.json({

      message:
        "Si cet email existe, un lien a été envoyé."

    });

  } catch (error) {

    console.error(
      "❌ Erreur forgotPassword :",
      error
    );

    res.status(500).json({
      message:
        "Erreur serveur"
    });

  }

}