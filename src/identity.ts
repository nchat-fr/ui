import { writable } from "svelte/store";
import {toast} from "svelte-sonner";

const identity = writable({
    id: null,
    username: null,
    mail: null
})

async function logout() {
    const response = await fetch("http://localhost:3000/auth/", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status === 500) { toast.error("Une erreur inconnue est survenue..."); return; }
    location.reload();
}

export { logout };
export default identity;