import {createRootRoute, Outlet} from '@tanstack/react-router';
import {AppShell} from "@mantine/core";

import {Navigation} from "@/components";

export const Route = createRootRoute(({
    component: Component,
}));

function Component(): JSX.Element {
    return (<AppShell
        header={{ height: 55 }}
        padding={'sm'}
    >
        <AppShell.Header withBorder={false}>
            <Navigation />
        </AppShell.Header>
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    </AppShell>);
}