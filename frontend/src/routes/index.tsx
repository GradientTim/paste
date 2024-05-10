import { Box, Container } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { BrowseContent } from "@/components";

export const Route = createFileRoute("/")({
	component: Component,
});

function Component(): JSX.Element {
	return (
		<Container size={"md"}>
			<Box h={"calc(100vh - 5rem)"}>
				<BrowseContent />
			</Box>
		</Container>
	);
}
