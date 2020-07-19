const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/uploadImage");

const { auth, authAdmin } = require("../middleware/auth");

const { login, register, cekAuth } = require("../controllers/auth");

const { getSong, addSong, getDetailSong } = require("../controllers/song");

const { getArtist, addArtist } = require("../controllers/artist");

const {
  addTransaction,
  getTransaction,
  editTransaction,
  gethistory,
} = require("../controllers/transaction");

router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, cekAuth);

router.get("/song", getSong);
router.get("/song/:id", getDetailSong);
router.post("/song", upload("thumbnail"), addSong);

router.get("/artist", getArtist);
router.post("/artist", auth, addArtist);

router.get("/history", auth, gethistory);

router.get("/transaction", getTransaction);
router.post("/transaction", auth, upload("attache"), addTransaction);
router.patch("/transaction/:id", auth, authAdmin, editTransaction);

router.get("*", function (req, res) {
  res.status(404).send({
    error: "404 Not Found",
  });
});

module.exports = router;
