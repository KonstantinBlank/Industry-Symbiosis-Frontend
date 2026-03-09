const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
})


//edit to change http --> https
// const fs = require('fs')

// module.exports = {
//     devServer: {
//         https: {
//           key: fs.readFileSync('./certs/example.com+5-key.pem'),
//           cert: fs.readFileSync('./certs/example.com+5.pem'),
//         },
//         // public: 'https://localhost:8080/'
//     }
// }

