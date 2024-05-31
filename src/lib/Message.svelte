<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import identity from "../identity";
    import base_url from "../config";

    export let sender: any;
    export let display_sender: boolean;

    onMount(() => {
        const scrolldiv = document.getElementById('scroll');
        const last = scrolldiv?.children[0].children[1].children[0].lastElementChild;
        last?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })
</script>

{#if $identity.id === sender.id}
    <div class="flex flex-row justify-end mt-{display_sender ? 4:2}">
        <div>
            <div class="break-all max-w-xl min-w-12 bg-primary text-white text-justify" style="padding: 10px; border-radius: 5px">
                <slot />
            </div>
        </div>
    </div>
{:else}
    <div class="flex flex-row justify-start mt-{display_sender ? 4:2}">
        <div>
            {#if display_sender}
                <div class="flex flex-row justify-start mb-2 gap-2 items-end pr-2">
                    <img src="{base_url}/users/{sender.id}/image" alt="{$identity.username}"class="rounded-full w-6 h-6" />
                    <p class="text-sm text-muted-foreground">{sender.username}</p>
                </div>
            {/if}
            <div class="break-all max-w-xl min-w-12 bg-accent text-justify" style="padding: 10px; border-radius: 5px">
                <slot />
            </div>
        </div>
    </div>
{/if}
