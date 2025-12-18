## Unlock GNOME via HTTP request

This simple server script listens for HTTP requests to unlock the GNOME screen. Simply start the server and send a request with the correct token to unlock the screen. Tested on Ubuntu 20.4 - Ubuntu 25.10

_Note: You might need to allow incoming connections on your firewall for the specified port._

```bash
$ sudo ufw enable && sudo ufw allow 1234
```

_Note: Add your port, host and token to the `.env` file before starting the server._

```bash
# .env
PORT=1234
HOST=192.168.1.10
TOKEN=YOUR_SECRET_TOKEN_HERE
```

### Example

```bash
# Start the server
$ pnpm start
➜ Listening on: http://localhost:3000/ (all interfaces)

# Send unlock request
$ curl "http://localhost:3000/unlock?token=YOUR_SECRET_TOKEN_HERE"
```
