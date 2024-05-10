import { Box } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { CodeEditor } from "@/components";

export const Route = createFileRoute("/pastes/$id")({
	component: Component,
});

function Component(): JSX.Element {
	const { id } = Route.useParams();

	return (
		<Box mih={"calc(100vh - 5rem)"} h={"100%"}>
			<CodeEditor id={id} isNew={id === "new"} />
		</Box>
	);
}
