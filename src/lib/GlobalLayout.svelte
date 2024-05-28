<script lang="ts">
    import CircleUser from "lucide-svelte/icons/circle-user";
    import Menu from "lucide-svelte/icons/menu";
    import MessagesSquare from "lucide-svelte/icons/messages-square";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";

    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    import identity, { logout } from "../identity";
    import { toggleMode } from "mode-watcher";
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
        <div class="flex h-full max-h-screen flex-col gap-2">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <a href="/" class="flex items-center gap-2 font-semibold">
                    <MessagesSquare class="h-6 w-6" />
                    <span class="">NChat</span>
                </a>
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

            <div class="w-full flex-1" />
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
                            variant="secondary"
                            size="icon"
                    >
                        <CircleUser class="h-5 w-5" />
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>My account: {$identity.username}</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </header>

        <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <slot />
        </main>
    </div>
</div>
