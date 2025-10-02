const net = require('net')

const PORT = 6010 // Common port for GPS trackers, adjust if needed for EV02

const server = net.createServer((socket) => {
    console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`)

    socket.on('data', (data) => {
        const message = data.toString().trim()
        console.log('Received data:', message)

        // Parse EV02 GPS data format here
        // EV02 typically sends data in format like: IMEI,latitude,longitude,speed,etc.
        // Example parsing (adjust based on actual protocol):
        try {
            const parts = message.split(',')
            if (parts.length > 1) {
                const imei = parts[0]
                const lat = parseFloat(parts[1])
                const lng = parseFloat(parts[2])
                console.log(`Parsed - IMEI: ${imei}, Lat: ${lat}, Lng: ${lng}`)
                // TODO: Store in database or process further
            }
        } catch (error) {
            console.error('Error parsing data:', error.message)
        }

        // Acknowledge receipt
        socket.write('ACK\n')
    })

    socket.on('end', () => {
        console.log('Client disconnected')
    })

    socket.on('error', (err) => {
        console.error('Socket error:', err.message)
    })
})

server.listen(PORT, () => {
    console.log(`GPS Tracker TCP Server listening on port ${PORT}`)
})