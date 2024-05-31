<script context="module">
    import { writable } from 'svelte/store';

    function HeaderController() {
        const { subscribe, __unused, update } = writable({
            title: 'Untitled'
        });

        return {
            subscribe,
            setTitle(title) {
                update((v) => {
                    v.title = title;
                    return v;
                });
            }
        };
    }

    export const controller = new HeaderController();
</script>

<script lang="ts">
    import Menu from "lucide-svelte/icons/menu";
    import MessagesSquare from "lucide-svelte/icons/messages-square";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import Radio from "lucide-svelte/icons/radio"

    import ModalController from "$lib/modals/index.svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    import { get } from "svelte/store";
    import identity, { logout } from "../identity";
    import base_url from "../config";
    import { socket } from "../main";
    import { toggleMode } from "mode-watcher";
    import { controller as ChangeProfilePictureModalController } from "$lib/modals/ChangeProfilePictureModal.svelte";

    let clients = {};

    socket.emit("auth", get(identity))
    socket.on('clients', (c) => { clients = c });
</script>

<ModalController />

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
        <div class="flex h-full max-h-screen flex-col gap-2">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
                <a href="/" class="flex items-center gap-2 font-semibold">
                    <MessagesSquare class="h-6 w-6" />
                    <span class="">NChat</span>
                </a>

                <div class="flex flex-row gap-2 items-center">
                    {Object.keys(clients).length}
                    <Radio class="h-4 w-4" style="color: red"/>
                </div>
            </div>
            <div class="flex-1">
                <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
                </nav>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <header class="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
            <Sheet.Root>
                <Sheet.Trigger asChild let:builder>
                    <Button
                            variant="outline"
                            size="icon"
                            class="shrink-0 md:hidden"
                            builders={[builder]}
                    >
                        <Menu class="h-5 w-5" />
                        <span class="sr-only">Toggle navigation menu</span>
                    </Button>
                </Sheet.Trigger>
                <Sheet.Content side="left" class="flex flex-col">
                    <nav class="grid gap-2 text-lg font-medium">
                        <a href="/" class="flex items-center gap-2 text-lg font-semibold">
                            <MessagesSquare class="h-6 w-6" />
                            <span class="sr-only">NChat</span>
                        </a>
                    </nav>
                </Sheet.Content>
            </Sheet.Root>

            <div class="w-full flex-1">
                <h1 class="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
                    {$controller.title}
                </h1>
            </div>
            <Button on:click={toggleMode} variant="outline" size="icon">
                <Sun
                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button
                            builders={[builder]}
                            variant="ghost"
                            size="icon"
                    >
                        <img src="{base_url}/users/{$identity.id}/image" alt="{$identity.username}"class="rounded-full" />
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>My account: {$identity.username}</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item on:click={() => {ChangeProfilePictureModalController.open()}}>Change profile picture</DropdownMenu.Item>
                    <DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </header>

        <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <slot />
        </main>
    </div>
</div>
