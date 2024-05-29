import { io } from "socket.io-client"

import './app.css'
import App from './App.svelte'

const socket = io("http://localhost:3000", {
  path: '/ws/socket.io',
  transports: ["websocket"]
});

const app = new App({
  target: document.getElementById('app')!,
})

export { socket }
export default app
