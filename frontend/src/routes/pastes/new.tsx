import { Box } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { CodeEditor } from "@/components";

export const Route = createFileRoute("/pastes/new")({
	component: Component,
});

function Component(): JSX.Element {
	return (
		<Box mih={"calc(100vh - 5rem)"} h={"100%"}>
			<CodeEditor id={"new"} isNew={true} />
		</Box>
	);
}
