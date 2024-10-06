const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FHWjc0alpBUWFuRkJZRGdVckUrZ3kyTmVJRHRwNzNweHNWWmVXUkhsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1YzOW0yMnQya21zWFZEUTlyY3dFYTYvRURodElmaDJFeTZWVnR4ZmpIMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUDJTTzBsbCsrRk5vdVJZNHBmRHNmZUs1c0xzVFRDZmx1b1E5cWRVVTNjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTnVVSXVzclZTWVNsY21GUG5YR01lRDZOZFFHU1FJZTN5YzJiSFZDT1hFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1BSmx3Ykd5bmJTdzhDTzlTZCswNSsrVjczZHJrM3IrbUpQc1dBeFpXMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBJVndSdjFRWWsybitJcUxPYkpIaUY2TmxBSXo0MlMrMjZNd2FZQVhaekU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUhubVNWWkFMN3JiM1NnMDFPWU84MHovRHpMVnduazFheEErS29yQTFrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmQ4UTN2WFlQUzN6WGxLNU15UDlpWjdKc1VXSkd2R2t1KzFhZ1RuS2xIYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5leDcyRTJHdXozaUhxQVRaT2RCUXdrd0loemF4dHVsMjJlR01KQ2hIbnp2d2NERytFVEthZW8za2x0cVhzUTN1bFVJYnd1YThhVTZ0R3ZPaVI4SWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJuaFhqVUVvL29lSUNBWWd3RWs3VjZsVlFrcCtkemNwVTZOSG84MUVuZFBZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfX1ZPYkVxZ1RMbXk0RmhfMDFGclpRIiwicGhvbmVJZCI6IjRjYzdlZjI3LWM2M2UtNDM1ZC1iZDNkLWEyZGMyMTk4YjBiMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0OFV5NzlqUzlDT0dPU3ZzZUhEV04vaHR6UHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUo0dktrUWVISGc5OUNGcUFMbWdna2N2REYwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkQ0MzYyWVZYIiwibWUiOnsiaWQiOiIyNDIwNTU2MTc1NjA6OTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t1RjVaUUZFSmVhaTdnR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBxTk1pZ2ZLUUZmUHVuYkZ4amdPZlg2MU82Q1k3L2o5azRNSzQrUXU1V0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjU2a0lDKzhCUjFPR01VMjVwV3VuS2tQK3lXdy9Cd21wVUpOVTI5OXpYbktJd2dCSERtMWJ1eW5LUlZmTWRtdStoUkUveUN2TnVvTG5lT3Q4YTF4OENnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0bkdYS3p0OS9sNFZjQjNZaEsxSjNmQ2JWNXNPRlhQWFo4R1B3KzFwaldmSTVtaXlCMTZrM2d4OHM3cTQvNzk4dDZJWVBKcEJMYXFQSWprMnlOQTNnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MjA1NTYxNzU2MDo5MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUNmpUSW9IeWtCWHo3cDJ4Y1k0RG4xK3RUdWdtTy80L1pPREN1UGtMdVZpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MjM2ODM4fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "💀ᡃ⃢⃟🇨🇬𝘾𝙊𝙉𝙁𝙐𝘾𝙄𝙐𝙎🇨🇬ᡃ⃢⃟⃢💀)",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "242055617560",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '4',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://brel_database_user:GIURl9Eo4XmK2qAIwYM4JfS0LJ4Tp6cn@dpg-crdo0sggph6c73ehu2eg-a.oregon-postgres.render.com/brel_database" : "postgresql://brel_database_user:GIURl9Eo4XmK2qAIwYM4JfS0LJ4Tp6cn@dpg-crdo0sggph6c73ehu2eg-a.oregon-postgres.render.com/brel_database",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
