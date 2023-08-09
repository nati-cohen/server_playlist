const userModel = require("../DL/model/user");
const songModel = require("../DL/model/song");


async function addFavoriteSong(userId, song) {
    try {
        const songExists = await songModel.findOne({ id: song.id });

        if (!songExists) {
            // יצירת השיר במידה והוא לא קיים בטבלת songs
            const newSong = await songModel.create({
                id: song.id,
                thumbnail: song.thumbnail,
                title: song.title,
                duration_formatted: song.duration_formatted,
                url: song.url,
            });

            // השיר כעת נוסף למערך המועדפים של המשתמש
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error("User not found.");
            }

            user.favorite.push(newSong._id);
            await user.save();
        } else {
            // במידה והשיר כבר קיים, רק נוסיף את ה-Id שלו למערך המועדפים של המשתמש
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error("User not found.");
            }

            if (!user.favorite.includes(songExists._id)) {
                user.favorite.push(songExists._id);
                await user.save();
            } else {
                console.log("The song is already marked as a favorite song")
            }
            return user;
        }
    } catch (error) {
        console.error("Error adding song to favorites:", error);
        throw Error("Error adding song to favorites: " + error.message);
    }
}



async function removeFavoriteSong(userId, songId) {
    try {
        // Find the song by its ID

        const song = await songModel.findOne({ id: songId })

        if (!song) {
            throw new Error("Song not found.");
        }
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        if (user.favorite.includes(song._id)) {
            user.favorite.pull(song._id);
            await user.save();
        } else {
            console.log("Song is not in favorites.");
        }

        return user;
    } catch (error) {
        console.error("Error removing song from favorites:", error);
        throw new Error("Error removing song from favorites: " + error.message);
    }
}


// הפונקציה להצגת השירים האהובים של המשתמש
async function getFavoriteSongs(userId) {
  try {
    // מציאת המשתמש לפי ה-Id
    const user = await userModel.findById(userId).populate('favorite');

    if (!user) {
      throw new Error("User not found.");
    }

    const favoriteSongs = user.favorite;

    return favoriteSongs;
  } catch (error) {
    throw new Error("Error getting favorite songs: " + error.message);
  }
}



module.exports = { addFavoriteSong, removeFavoriteSong, getFavoriteSongs }