<script context="module">
    import { writable } from 'svelte/store';

    function ModalController() {
        const { subscribe, __unused, update } = writable(false);

        return {
            subscribe,
            open() {
                update((v) => { v = false; return v });
                update((v) => { v = true; return v });
            },
            close() {
                update((v) => { v = false; return v });
            }
        };
    }

    export const controller = new ModalController();
</script>

<script lang="ts">
    import { get } from "svelte/store";
    import { toast } from "svelte-sonner";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    import api from "../../api";
    import identity from "../../identity";
    import base_url from "../../config";

    let files: any;
    async function changeProfilePicture() {
        try {
            let form_data = new FormData();
            form_data.append('file', files[0]);
            console.log(files[0]);

            const request = new Request(`${base_url}/users/${get(identity).id}/image`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: form_data
            });

            const response = await api.request(request);

            // update image dynamically
            const url = `${base_url}/users/${get(identity).id}/image`;
            const images = document.body.querySelectorAll(`img[src='${url}']`);
            for (let i = 0; i < images.length; i++) { images[i].src = url }

            controller.close();
            toast.success('Votre photo de profil à bien été modifiée');
        } catch (e) {
            toast.error('une erreur est survenue');
            console.log(e);
        }
    }
</script>

<Dialog.Root open={$controller}>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Edit profile picture</Dialog.Title>
            <Dialog.Description>
                Change your profile picture here.
            </Dialog.Description>
        </Dialog.Header>

        <form on:submit|preventDefault={changeProfilePicture}>
            <div class="items-center gap-4 mb-4">

                <input
                        class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        type="file"
                        bind:files={files}
                        accept=".jpg,.jpeg"
                        required
                />

            </div>

            <Dialog.Footer>
                <Button type="submit">Save</Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
