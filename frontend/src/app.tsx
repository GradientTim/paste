import {
	type MantineColorSchemeManager,
	MantineProvider,
	type MantineThemeOverride,
	createTheme,
	localStorageColorSchemeManager,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { type Root, createRoot } from "react-dom/client";

import { mantineModals } from "@modals/registry.ts";
import { components } from "./mantine.tsx";
import { routeTree } from "./routeTree.gen";

import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/notifications/styles.css";

import "@fontsource-variable/inter";
import "@fontsource/lato";

const queryClient: QueryClient = new QueryClient();

export function App(): JSX.Element {
	const colorSchemeManager: MantineColorSchemeManager =
		localStorageColorSchemeManager({
			key: "gradient.paste.scheme",
		});

	const mantineTheme: MantineThemeOverride = createTheme({
		components: components,
		primaryColor: "violet",
		fontFamily: "'Inter Variable', sans-serif",
		white: "#F5F5F5",
		defaultGradient: {
			from: "violet.8",
			to: "violet.3",
		},
	});

	return (
		<MantineProvider
			theme={mantineTheme}
			colorSchemeManager={colorSchemeManager}
		>
			<Notifications />
			<ModalsProvider modals={mantineModals}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ModalsProvider>
		</MantineProvider>
	);
}

const router = createRouter({ routeTree });
const rootElement: HTMLElement | null = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root: Root = createRoot(rootElement);
	root.render(<App />);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
