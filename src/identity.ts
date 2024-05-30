import {get, writable} from "svelte/store";
import { socket } from "./main";
import { toast } from "svelte-sonner";

const _DEFAULT_IDENTITY = {
    id: null,
    username: null,
    mail: null
}

const identity = writable(_DEFAULT_IDENTITY);

async function logout() {
    let _identity = get(identity);

    const response = await fetch("http://localhost:3000/auth/", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status === 500) { toast.error("Une erreur inconnue est survenue..."); return; }
    socket.emit("logout", _identity);
    identity.set(_DEFAULT_IDENTITY);
}

export { logout };
export default identity;