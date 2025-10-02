const net = require('net')
const http = require('http')

const PORT = 6010 // Common port for GPS trackers, adjust if needed for EV02
const HEALTH_PORT = 3000 // Port for health check endpoint

// Helper function to log with timestamp
function logWithTime(message) {
    const timestamp = new Date().toLocaleString()
    console.log(`[${timestamp}] ${message}`)
}

function logErrorTime(message) {
    const timestamp = new Date().toLocaleString()
    console.error(`[${timestamp}] ${message}`)
}

const server = net.createServer((socket) => {
    logWithTime(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`)

    socket.on('data', (data) => {
        const message = data.toString().trim()
        logWithTime('Received data: ' + message)

        // Parse EV02 GPS data format here
        // EV02 typically sends data in format like: IMEI,latitude,longitude,speed,etc.
        // Example parsing (adjust based on actual protocol):
        try {
            const parts = message.split(',')
            if (parts.length > 1) {
                const imei = parts[0]
                const lat = parseFloat(parts[1])
                const lng = parseFloat(parts[2])
                logWithTime(`Parsed - IMEI: ${imei}, Lat: ${lat}, Lng: ${lng}`)
                // TODO: Store in database or process further
            }
        } catch (error) {
            logErrorTime('Error parsing data:', error.message)
        }

        // Acknowledge receipt
        socket.write('ACK\n')
    })

    socket.on('end', () => {
        logWithTime('Client disconnected')
    })

    socket.on('error', (err) => {
        logErrorTime('Socket error:', err.message)
    })
})

server.listen(PORT, () => {
    logWithTime(`GPS Tracker TCP Server listening on port ${PORT}`)
})

// HTTP server for health checks
const httpServer = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok' }))
    } else {
        res.writeHead(404)
        res.end()
    }
})

httpServer.listen(HEALTH_PORT, () => {
    logWithTime(`Health check server listening on port ${HEALTH_PORT}`)
})