const userModel = require("../DL/model/user");
const songModel = require("../DL/model/song");
const playlistModel = require("../DL/model/playlist");


async function createPlaylist(namePlaylist, userId, song) {

    try {
        const songEx = await songModel.findOne({ id: song.id });
        if (!songEx) {
            // יצירת השיר במידה והוא לא קיים בטבלת songs
            const newSong = await songModel.create({
                id: song.id,
                thumbnail: song.thumbnail,
                title: song.title,
                duration_formatted: song.duration_formatted,
                url: song.url,
            })
        }
        const songExists = await songModel.findOne({ id: song.id });

        const userExists = await userModel.findById(userId);

        if (!userExists) {
            throw new Error("User not found");;
        }

        const newPlaylist = await playlistModel.create({
            name: namePlaylist,
            user: userId,
            songPlaylist: [], // בתחילה ריק
        });
        console.log(newPlaylist);
        newPlaylist.songPlaylist.push(songExists._id);
        await newPlaylist.save();
        userExists.playlist.push(newPlaylist._id);
        await userExists.save();
        // newPlaylist.songPlaylist.push(newSong._id);
        //         await newPlaylist.save();
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        throw Error("Error adding song to playlist: " + error.message);
    }
}


async function getplaylists(userId) {
    try {
        // מציאת המשתמש לפי ה-Id
        const user = await userModel.findById(userId).populate('playlist');

        if (!user) {
            throw new Error("User not found.");
        }

        const playlistSongs = user.playlist;

        return playlistSongs;
    } catch (error) {
        throw new Error("Error getting favorite songs: " + error.message);
    }
}

async function getSongs(playlistId) {
    try {
        const playlist = await playlistModel.findById(playlistId)
        if (!playlist) {
            throw new Error("playlist not found.");
        }
        const songIds = playlist.songPlaylist; // מערך של מזהים של השירים
        const songs = await songModel.find({ _id: { $in: songIds } });
        return songs;
    } catch (error) {
        throw new Error("Error getting playlist songs: " + error.message);
    }
}

// async function getSongs(playlistId) {
//     try {
//         const playlist = await playlistModel.findById(playlistId);
//         if (!playlist) {
//             throw new Error("playlist not found.");
//         }
//         const songIds = playlist.songPlaylist; // מערך המזהים של השירים
//         const songs = await songModel.find({ _id: { $in: songIds } }).populate('song');
//         console.log(songs);
//         return songs;
//     } catch (error) {
//         throw new Error("Error getting playlist songs: " + error.message);
//     }
// }



async function addsongToPlaylist(song, userId, playlistId) {
    try {
        const songEx = await songModel.findOne({ id: song.id });
        if (!songEx) {
            // יצירת השיר במידה והוא לא קיים בטבלת songs
            const newSong = await songModel.create({
                id: song.id,
                thumbnail: song.thumbnail,
                title: song.title,
                duration_formatted: song.duration_formatted,
                url: song.url,
            })
        }
        const songExists = await songModel.findOne({ id: song.id });

        const playlistExists = await playlistModel.findOne({ _id: playlistId })
        
        if (!playlistExists.songPlaylist.includes(songExists._id)) {
        playlistExists.songPlaylist.push(songExists._id);
        await playlistExists.save(); 
        }  
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        throw Error("Error adding song to playlist: " + error.message);
    }
}

// async function addPlaylistSong(userId, song) {
//     try {
//         const songExists = await songModel.findOne({ id: song.id });
//         if (!songExists) {
//             // יצירת השיר במידה והוא לא קיים בטבלת songs
//             const newSong = await songModel.create({
//                 id: song.id,
//                 thumbnail: song.thumbnail,
//                 title: song.title,
//                 duration_formatted: song.duration_formatted,
//                 url: song.url,
//             });

//             const playlist = await playlistModel.findById(playlistId);
//             if (!playlist) {
//                 throw new Error("playlist not found.");;
//             }

//             // מוסיפים את ה-ObjectID של השיר למערך השירים בפלייליסט
//             playlist.song.push(newSong._id);
//             await playlist.save();

//             return res.status(200).json({ message: "Song added to playlist successfully" });
//         } else {
//             // במידה והשיר כבר קיים, רק נוסיף את ה-Id שלו למערך המועדפים של המשתמש
//             const playlist = await playlistModel.findById(playlistId);
//             if (!playlist) {
//               return res.status(404).json({ message: "Playlist not found" });
//             }

//             if (!playlist.song.includes(songExists._id)) {
//                 playlist.song.push(songExists._id);
//                 await playlist.save();
//             } else {
//                 console.log("The song is already marked as a favorite song")
//             }
//             return user;
//         }
//     } catch (error) {
//         console.error("Error adding song to favorites:", error);
//         throw Error("Error adding song to favorites: " + error.message);
//     }
// }


module.exports = { createPlaylist, getplaylists, addsongToPlaylist,  getSongs }