const
  express = require('express'),
  router = express.Router()

const favoriteServices = require('../BL/favorite.service')
const auth = require('../auth')

router.post("/addsong", auth.verifyToken, async (req, res) => {
  try {
    const song = req.body.song;
    const userId = req.user

    const updatedUser = await favoriteServices.addFavoriteSong(userId, song);
    // console.log(updatedUser);
    res.json({ message: "Song added to favorites successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/removesong", auth.verifyToken, async (req, res) => {

  try {
    const songId = req.body.songId.id
    const userId = req.user;

    const updatedUser = await favoriteServices.removeFavoriteSong(userId, songId);
    res.json({ message: "Song removed from favorites successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/favoritesongs', auth.verifyToken, async (req, res) => {
  try {
    const userId = req.user
    const favoriteUser = await favoriteServices.getFavoriteSongs(userId);
    console.log(favoriteUser);
    res.json({ favoriteSongs: favoriteUser })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router