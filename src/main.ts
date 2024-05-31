import { io } from "socket.io-client"
import url from "./config";

import './app.css'
import App from './App.svelte'

const socket = io(url, {
  path: '/ws/socket.io',
  transports: ["websocket"]
});

const app = new App({
  target: document.getElementById('app')!,
})

export { socket }
export default app
