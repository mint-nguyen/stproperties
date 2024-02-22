"use client";
import {
	FormControl,
	FormLabel,
	Input,
	Card,
	CardBody,
	Flex,
	Button,
	FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddTask() {
	const [propertyName, setPropertyName] = useState("");
	const [cleaningDate, setCleaningDate] = useState("");
	const [showCleaningDateError, setShowCleaningDateError] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [description, setDescription] = useState("");
	const [isSubmittable, setIsSubmittable] = useState(false);

	const onBlurCleaningDate = () => {
		if (new Date(cleaningDate) > new Date()) {
			setShowCleaningDateError(false);
		} else {
			setShowCleaningDateError(true);
		}
	};

	const onChangeImages = (curr: any) => {
		setImages(curr.target.value.split(","));
	};

	const router = useRouter();

	const onSubmit = () => {
		axios
			.post("http://localhost:3000/tasks", {
				propertyName: propertyName,
				cleaningDate: cleaningDate,
				description: description,
				images: images,
			})
			.then(function (response) {
				router.push("/");
			})
			.catch(function (error) {
				window.alert(error);
			});
	};

	useEffect(() => {
		if (
			propertyName.length &&
			description.length &&
			new Date(cleaningDate) > new Date() &&
			images.length > 0
		) {
			setIsSubmittable(true);
		} else {
			setIsSubmittable(false);
		}
	}, [propertyName, description, images, cleaningDate]);

	return (
		<Flex align="center" justify="center" w="100%">
			<Card w="50%" minW="350px">
				<CardBody>
					<FormControl isRequired>
						<FormLabel>Property name</FormLabel>
						<Input
							value={propertyName}
							onChange={(curr) =>
								setPropertyName(curr.target.value.trimStart())
							}
							placeholder="Property name"
						/>
						<FormLabel>Cleaning date</FormLabel>
						{showCleaningDateError && (
							<FormHelperText>
								Cleaning date must be in the future
							</FormHelperText>
						)}
						<Input
							value={cleaningDate}
							onChange={(curr) => setCleaningDate(curr.target.value)}
							onBlur={onBlurCleaningDate}
							placeholder="Cleaning date (YYYY-MM-DD)"
						/>
						<FormLabel>Images</FormLabel>
						<FormHelperText>
							If multiple images, separate by commas
						</FormHelperText>
						<Input
							value={images}
							onChange={onChangeImages}
							placeholder="Images"
						/>
						<FormLabel>Description</FormLabel>
						<Input
							value={description}
							onChange={(curr) => setDescription(curr.target.value.trimStart())}
							placeholder="Description"
						/>
					</FormControl>
					<Button
						colorScheme="teal"
						marginTop="20px"
						isDisabled={!isSubmittable}
						onClick={onSubmit}>
						Submit
					</Button>
				</CardBody>
			</Card>
		</Flex>
	);
}
