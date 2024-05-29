<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner";
    import AuthHandler from "$lib/AuthHandler.svelte";
    import GlobalLayout from "$lib/GlobalLayout.svelte";
</script>

<ModeWatcher />
<Toaster richColors />

<AuthHandler>
    <GlobalLayout>

    </GlobalLayout>
</AuthHandler>