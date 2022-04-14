module.exports = {
  //Connection options
  connection: {
    host: "host",
    port: 21,
    user: "user",
    password: "password"
  },

  //Path options 
  sourcePath: "./dist/",
  remotePath: "public_html/my-project/",
  //include: ["**/*"],
  //exclude: ["**/_*"],
  //replace: false,

  //Local backups config
  //saveLocalBackups: true,
  //backupsLocalDirectory: "./backups/",

  //Remote backups config
  //saveRemoteBackups: true,
  //backupsRemoteDirectory: "backups" //Will be resolved from the remotePath

  //Cleaning options
  //cleanRemoteDirectory: true,
  //excludeFromCleaning: ["database.db"]

  //Logger function
  //logger: (message) => {}
};