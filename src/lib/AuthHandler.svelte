<script lang="ts">
    import identity from "../identity";
    import { get } from "svelte/store";
    import { toast } from "svelte-sonner";
    import axios from "axios";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let displayRegisterMenu = false;
    const instance = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })

    async function handleAuth() {
        const response = await fetch("http://localhost:3000/auth/", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.status === 403) { return; }
        if (response.status === 500) { toast.error("An unexpected error occured..."); return; }

        identity.set(await response.json());
    }

    let mail: null;
    let password: null;
    let username: null;

    async function login() {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail: mail, password: password
            })
        });

        if (response.status === 403) { toast.error("Invalid credentials"); return; }
        if (response.status === 500) { toast.error("An unexpected error occured..."); return; }

        identity.set(await response.json());
        toast.success(`Logged as : ${get(identity).username}`)
    }

    async function register() {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail: mail, password: password, username: username
            })
        });

        if (response.status === 409) { toast.error("An account with this email already exists"); return; }
        if (response.status === 500) { toast.error("An unexpected error occured..."); return; }

        displayRegisterMenu = false;
        password = null;
    }
</script>

{#await handleAuth() then _}
    {#if $identity.id === null}
        {#if displayRegisterMenu === false}
            <form on:submit|preventDefault={login} class="h-screen flex items-center justify-center">
                <Card.Root class="mx-auto max-w-sm">
                    <Card.Header>
                        <Card.Title class="text-2xl">Login</Card.Title>
                        <Card.Description>Enter your email below to login to your account</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" bind:value={mail} required />
                            </div>
                            <div class="grid gap-2">
                                <div class="flex items-center">
                                    <Label for="password">Password</Label>
                                </div>
                                <Input id="password" type="password" bind:value={password} required />
                            </div>
                            <Button type="submit" class="w-full">Login</Button>
                        </div>
                        <div class="mt-4 text-center text-sm">
                            Don&apos;t have an account?
                            <span class="underline clickable" on:click={() => { displayRegisterMenu = true; password = null }}>Sign up</span>
                        </div>
                    </Card.Content>
                </Card.Root>
            </form>
        {:else}
            <form on:submit|preventDefault={register} class="h-screen flex items-center justify-center">
                <Card.Root class="mx-auto max-w-sm">
                    <Card.Header>
                        <Card.Title class="text-2xl">Register</Card.Title>
                        <Card.Description>Enter your informations below to create your account</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" bind:value={mail} required />
                            </div>
                            <div class="grid gap-2">
                                <Label for="username">Username</Label>
                                <Input id="username" type="text" placeholder="superHero12" bind:value={username} required />
                            </div>
                            <div class="grid gap-2">
                                <div class="flex items-center">
                                    <Label for="password">Password</Label>
                                </div>
                                <Input id="password" type="password" bind:value={password} required />
                            </div>
                            <Button type="submit" class="w-full">Register</Button>
                        </div>
                        <div class="mt-4 text-center text-sm">
                            Already have an account?
                            <span class="underline clickable" on:click={() => { displayRegisterMenu = false; password = null }}>Login</span>
                        </div>
                    </Card.Content>
                </Card.Root>
            </form>
        {/if}
    {:else}
        <slot />
    {/if}
{:catch e}
    <div class="h-screen flex flex-col items-center justify-center">
        Une erreur est survenue
        <h1 class="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-3xl">
            LE SERVEUR EST EN MAINTENANCE
        </h1>
    </div>
{/await}

<style>
    .clickable {
        cursor: pointer;
    }
</style>