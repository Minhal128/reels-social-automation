import { io } from 'socket.io-client'

// A localhost URL baked into a deployed build (or no URL) means "same origin": the reverse proxy routes /socket.io
// to the API. Without this, production clients polled http://localhost:3000 in an endless reconnect loop.
const configuredUrl = process.env.NEXT_PUBLIC_SOCKET_URL
const isDeployedPage = typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname)
const SOCKET_URL = isDeployedPage && /\/\/(localhost|127\.0\.0\.1)[:/]/.test(configuredUrl || '') ? undefined : configuredUrl

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['polling', 'websocket'], 
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 45000, 
  forceNew: true,
  upgrade: true,
  rememberUpgrade: true,
})
