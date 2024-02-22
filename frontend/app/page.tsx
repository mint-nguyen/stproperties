"use client";
import {
	Card,
	CardBody,
	Button,
	Text,
	Heading,
	Stack,
	Image,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
		<div className="p-10">
			<Button
				color="teal"
				onClick={() => router.push("/add-task")}
				marginBottom={5}>
				Create task
			</Button>

			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				{tasks.map((task: Task) => {
					return (
						<GridItem key={task.description}>
							<Card maxW="sm">
								<CardBody>
									<Carousel>
										{task.images.map((image: string) => {
											return (
												<Image
													key={image}
													src={image}
													borderRadius="lg"
													alt={image}
												/>
											);
										})}
									</Carousel>

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
		</div>
	);
}
