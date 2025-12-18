import 'dotenv/config'
import { H3, getQuery, serve } from 'h3'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

const PORT = process.env.PORT
const HOST = process.env.HOST
const TOKEN = process.env.TOKEN
const USER = process.env.USER || process.env.LOGNAME || 'martins'

async function getSessionId() {
    try {
        const { stdout } = await execAsync(`loginctl list-sessions --no-legend | grep ${USER} | awk '{print $1}' | head -n1`)
        return stdout.trim()
    } catch (error) {
        console.error('Failed to get session ID:', error)
        return null
    }
}

const app = new H3()

app.get('/lock', async (event) => {
    const { token } = getQuery(event)

    if (token !== TOKEN) return

    const sessionId = await getSessionId()
    if (!sessionId) {
        console.error('Could not determine session ID')
        return
    }

    exec(`loginctl lock-session ${sessionId}`, error => {
        if (error) {
            console.error(error)
        }
    })

    return
})

app.get('/unlock', async (event) => {
    const { token } = getQuery(event)

    if (token !== TOKEN) return

    const sessionId = await getSessionId()
    if (!sessionId) {
        console.error('Could not determine session ID')
        return
    }

    exec(`loginctl unlock-session ${sessionId}`, error => {
        if (error) {
            console.error(error)
        }
    })

    return
})

serve(app, { port: PORT, hostname: HOST })
