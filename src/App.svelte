<script lang="ts">
    import router from 'page'
    import routes from './routes';

    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";

    import AuthHandler from "$lib/AuthHandler.svelte";
    import GlobalLayout from "$lib/GlobalLayout.svelte";

    let page: any = null;
    let params: any = {};

    routes.forEach((route) => {
        router(
            route.path,
            (ctx: any, next: any) => {
                params = { ...ctx.params };
                next();
            },
            () => {
                page = route.component;
            }
        );
    });

    router.start();
</script>

<ModeWatcher />
<Toaster richColors />

<AuthHandler>
    <GlobalLayout>
        <svelte:component this={page} {params} />
    </GlobalLayout>
</AuthHandler>