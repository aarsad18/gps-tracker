# GPS Tracker TCP Server

A Node.js TCP server for receiving data from EV02 GPS trackers.

## Installation

1. Clone or download the project.
2. Run `npm install` (no dependencies required for basic functionality).

## Usage

Start the server:

```bash
npm start
```

The server will listen on port 5001 for incoming TCP connections from GPS trackers.

## PM2 Process Management

To run the server with PM2 for production:

```bash
npm run pm2:start
```

Other PM2 commands:

- `npm run pm2:stop` - Stop the server
- `npm run pm2:restart` - Restart the server
- `npm run pm2:delete` - Delete the PM2 process
- `npm run pm2:logs` - View logs

## Data Format

The server expects data in CSV-like format from the EV02 tracker, e.g.:

```
IMEI,latitude,longitude,speed,direction,time
```

Adjust the parsing logic in `server.js` based on the exact protocol used by your EV02 device.

## Configuration

- Port: Change `PORT` in `server.js` if needed.
- Parsing: Modify the `socket.on('data')` handler to match your device's data format.

## License

ISC