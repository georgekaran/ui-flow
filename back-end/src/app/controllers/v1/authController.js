const express = require("express");
const { generateToken, comparePassword } = require("../../utils/securityUtils");
//const mailer = require("../../modules/mailer");
const authMiddleware = require('../../middlewares/auth')
const jwt = require('jsonwebtoken')

const User = require("../../models/user");
const router = express.Router();

function setCookieSession(res, token) {
  try {
    if (res && token) {
      res.cookie(process.env.JWT_NAME, token, { httpOnly: true });
    }
  } catch (err) {
    console.log(err);
  }
}

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!(await comparePassword(password, user.password))) {
    return res.status(400).send({ error: "Invalid password" });
  }

  const token = await generateToken({ id: user._id });

  user.password = undefined;

  setCookieSession(res, token);

  //console.log(res)
  return res.status(200).send({ user, token });
});

router.get("/isAuthenticated", authMiddleware, async (req, res) => {
  try {
    res.send({ isAuthenticated: true });
  } catch (err) {
    res.send({ isAuthenticated: false });
  }
});

router.post("/is_token_valid", async (req, res) => {
  try {
    const { token } = req.body
    console.log(req.body)
    jwt.verify(token, process.env.JWT_NAME, (err, decoded) => {
      if (err) return res.status(401).send({ isTokenValid: false })

      req.userId = decoded.id
      res.send({ isTokenValid: true });
    })
  } catch (err) {
    res.send({ isTokenValid: false });
  }
});

// router.post("/forgot_password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send({ error: "Email não cadastrado" });
//     }
//     console.log("User id:",user._id)
//     const token = await security.generateResetToken(user._id);

//     const now = new Date();
//     now.setHours(now.getHours() + 1);

//     await User.findByIdAndUpdate(user._id, {
//       $set: {
//         passwordResetToken: token,
//         passwordResetExpires: now
//       }
//     });

//     await mailer.sendMail({
//       to: email,
//       from: "george.mueller@universo.univates.br",
//       subject: "Recuperação de senha - Expensify",
//       html: `<p>Você esqueceu sua senha? Não tem problema, acesse esse link para recuperar sua conta: 
//       <a href="${confConfig.baseFrontURL}/password-recovery/${token}">Recuperar conta<a></p>`
//     });
//     return res.status(200).send({ message: "Email de recuperação enviado com sucesso!" });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ error: "Erro ao enviar email de recuperação de senha" });
//   }
// });

// router.post("/reset_password", async (req, res) => {
//   const { email, token, password } = req.body;

//   try {
//     const user = await User.findOne({ email }).select(
//       "+passwordResetToken passwordResetExpires"
//     );
//     if (!user) {
//       return res.status(400).send({ error: "User not found" });
//     }

//     if (token !== user.passwordResetToken) {
//       return res.status(400).send({ error: "Token invalid" });
//     }

//     const now = new Date();

//     if (now > user.passwordResetExpires) {
//       return res
//         .status(400)
//         .send({ error: "Token expired, generate a new one" });
//     }

//     user.password = password;

//     await user.save();

//     res.send();
//   } catch (err) {
//     return res.status(400).send({ error: "Cannot reset password try again" });
//   }
// });

module.exports = app => app.use("/api/v1/auth", router);