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

### Lock screen

```bash
# Send lock request
$ curl "http://localhost:3000/lock?token=YOUR_SECRET_TOKEN_HERE"
```

## Install as systemd service

1. Create a new `.service` file in `/etc/systemd/system` and give it correct permissions.

```bash
sudo touch /etc/systemd/system/http-gnome-screen-lock-server.service
sudo chmod 644 /etc/systemd/system/http-gnome-screen-lock-server.service
```

2. Add this content to `http-gnome-screen-lock-server.service`

````
[Unit]
Description=HTTP GNOME Screen Lock/Unlock Service
After=network.target

[Service]
Type=simple
User=martins
Environment="USER=martins"
WorkingDirectory=/home/martins/Programming/screen-unlock
ExecStart=/home/martins/.local/share/pnpm/pnpm run start
Restart=always

[Install]
WantedBy=multi-user.target
````

3. Reload systemd services and enable the new service

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now http-gnome-screen-lock-server.service
```

You can see the stdout/stderr using systemd's `journalctl`

```bash
sudo journalctl -u http-gnome-screen-lock-server.service -f
```
