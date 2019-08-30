const app = require('./app')

const nodePort = process.env.NODE_PORT || 5000

app.listen(nodePort, () => {
    console.log(`Server is up on port ${nodePort}`)
})