<script lang="ts">
    import { get } from "svelte/store";
    import identity from "../identity";

    import Paperclip from "lucide-svelte/icons/paperclip";
    import Mic from "lucide-svelte/icons/mic";
    import CornerDownLeft from "lucide-svelte/icons/corner-down-left";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area";

    import { controller as header } from "$lib/GlobalLayout.svelte";
    import { socket } from "../main";
    import Message from "$lib/Message.svelte";
    header.setTitle("Global Chat");

    let messages: any = [];
    socket.on('message', function(payload) {
        messages = [...messages, payload]
    })

    let message: any = null;
    async function sendMessage() {
        socket.emit('message', message);
        message = null;
    }

    async function keydown(e: any) {
        if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('submitForm')?.click();
        }
    }
</script>

<div style="height: calc( 100vh - 250px )" id="scroll">
    <ScrollArea class="w-full h-full p-4">
        {#each messages as message}
            <Message sender={message.identity} message={message.message} />
        {/each}
    </ScrollArea>
</div>

<form
        class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        on:submit|preventDefault={sendMessage}
>
    <Label for="message" class="sr-only">Message</Label>
    <Textarea
            id="message"
            placeholder="Type your message here..."
            class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            on:keydown={keydown}
            bind:value={message}
            required
    />
    <div class="flex items-center p-3 pt-0">
        <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
                <Button variant="ghost" size="icon" builders={[builder]} disabled>
                    <Paperclip class="size-4" />
                    <span class="sr-only">Attach file</span>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Attach File</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
                <Button variant="ghost" size="icon" builders={[builder]} disabled>
                    <Mic class="size-4" />
                    <span class="sr-only">Use Microphone</span>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Use Microphone</Tooltip.Content>
        </Tooltip.Root>
        <Button type="submit" id="submitForm" size="sm" class="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft class="size-3.5" />
        </Button>
    </div>
</form>