// - env הכרת מנגון קובץ מוסתר
require("dotenv").config();

//התחברות לDB
require("./DL/db").connect();


const
    express = require("express"),            //ייבוא ספריית express
    app = express(),                         //אתחול express למשתנה שיתחיל את השרת
    PORT = process.env.PORT || 5001,         //הגדרת פורט
    cors = require("cors")

app.use(express.json())
app.use(cors())



app.use('/api/users', require('./Router/user.route'))
app.use('/api/playlist', require('./Router/playlist.route'))
app.use('/api/favorite', require('./Router/favorite.route'))


//האזנה
app.listen(PORT, () => {
    console.log("💻💻💻server is up");
});
