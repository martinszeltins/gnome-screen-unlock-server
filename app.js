import 'dotenv/config'
import { H3, getQuery, serve } from 'h3'
import { exec } from 'node:child_process'

const PORT = 3000
const TOKEN = process.env.TOKEN

const app = new H3()

app.get('/unlock', (event) => {
    const { token } = getQuery(event)

    if (token !== TOKEN) return

    exec('loginctl unlock-session', error => {
        if (error) {
            console.error(error)
        }
    })

    return
})

serve(app, { port: PORT, hostname: '0.0.0.0' })
