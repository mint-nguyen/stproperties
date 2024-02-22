"use client";
import {
	Flex,
	Card,
	CardBody,
	Button,
	Text,
	ButtonGroup,
	CardFooter,
	Divider,
	Heading,
	Stack,
	Image,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Task = {
	id: string;
	propertyName: string;
	description: string;
	images: string[];
	cleaningDate: string;
};

export default function Home() {
	const router = useRouter();

	const [tasks, setTasks] = useState([]);

	axios
		.get("http://localhost:3000/tasks")
		.then(function (response) {
			setTasks(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});

	if (!tasks.length) {
		return (
			<div>
				<Text>No tasks found, try creating a task</Text>

				<Button color="teal" onClick={() => router.push("/add-task")}>
					Create task
				</Button>
			</div>
		);
	}

	return (
		<Grid templateColumns="repeat(5, 1fr)" gap={6}>
			{tasks.map((task: Task) => {
				return (
					<GridItem key={task.description}>
						<Card maxW="sm">
							<CardBody>
								<Image
									src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Stack mt="6" spacing="3">
									<Heading size="md">{task.propertyName}</Heading>
									<Text>{task.description}</Text>
									<Text color="blue.600" fontSize="2xl">
										{new Date(task.cleaningDate).toLocaleDateString("en-US")}
									</Text>
								</Stack>
							</CardBody>
						</Card>
					</GridItem>
				);
			})}
		</Grid>
	);
}
