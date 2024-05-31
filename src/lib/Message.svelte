<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import identity from "../identity";

    export let sender: any;
    export let message: string;

    onMount(() => {
        const scrolldiv = document.getElementById('scroll');
        const last = scrolldiv?.children[0].children[1].children[0].lastElementChild;
        last?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        last?.children[0].children[0].innerHTML.replace("\n", "<br />")
    })
</script>

{#if $identity.id === sender.id}
    <div class="flex flex-row justify-end mb-4">
        <div>
            <p class="break-all max-w-xl bg-primary text-white text-justify" style="padding: 10px; border-radius: 5px">
                {@html message}
            </p>
        </div>
    </div>
{:else}
    <div class="flex flex-row justify-start mb-4">
        <div>
            <p class="break-all max-w-xl bg-accent text-white text-justify" style="padding: 10px; border-radius: 5px">
                {@html message}
            </p>
        </div>
    </div>
{/if}
