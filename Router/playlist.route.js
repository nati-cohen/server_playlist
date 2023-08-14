const
  express = require('express'),
  router = express.Router()

const favoriteServices = require('../BL/favorite.service')
const auth = require('../auth')

const playlistServices = require('../BL/playlist.service')


// POST ליצירת פלייליסט חדש
router.post('/create',auth.verifyToken, async (req, res) => {
    const song = req.body.song;
    const userId = req.user
    const namePlaylist = req.body.playlistName
    console.log(userId, namePlaylist);
//   const { namePlaylist, userId } = req.body;
  try {
    const updatedPlaylist = await playlistServices.createPlaylist(namePlaylist, userId, song);
    return res.status(201).json({ message: 'Playlist created successfully', playlist: namePlaylist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/addsong', auth.verifyToken,async (req, res) => {
  const song = req.body.song;
    const userId = req.user
    const playlistId = req.body.playlistId
    try{
      const addsongs = await playlistServices.addsongToPlaylist(song, userId, playlistId)
      return res.status(201).json({ message: 'The song has been added to the playlist', playlist: playlistId });
    }catch (error) {
      console.error('Error add to playlist:', error);
      res.status(500).json({ error: error.message });
    }
})


router.get('/userplaylists', auth.verifyToken, async (req, res) => {
  try {
    const userId = req.user
    const playlistUser = await playlistServices.getplaylists(userId);
    console.log(playlistUser);
    res.json({ playlistSongs: playlistUser })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})














router.post("/addsong", auth.verifyToken, async (req, res) => {
    try {
      const song = req.body.song;
      const userId = req.user
  
      const updatedUser = await playlistServices.addFavoriteSong(userId, song);
      // console.log(updatedUser);
      res.json({ message: "Song added to favorites successfully.", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router