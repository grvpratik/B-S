import axios from "axios";
import { error } from "console";

interface ImageBlob extends Blob {
	name: string;
}
const POST_HEADER = {
	headers: {
		"Content-Type": "application/json",
	},
};
export async function uploadToAws(file: ImageBlob) {
	
	const postData = {
		fileName: file.name,
		contentType: file.type,
		fileSize: file.size,
	};
	try {
		const response = await axios.post(
			process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
			postData,
			POST_HEADER
		);

		if (response.data.success) {
			const { url, publicUrl } = response.data;
console.log(url,publicUrl)
		console.log(url,publicUrl)
			const responseUpload = await axios.put(url, file, {
				headers: {
					"Content-type": file.type,
				},
			});

			if (responseUpload.status === 200) {
				console.log("File uploaded successfully:", responseUpload.data.url);
				return publicUrl;
			} else {
				throw new Error("Upload failed");
			}
		} else {
			
			throw new Error("Failed to get upload URL");
		}
	} catch (error) {
		console.error("Error uploading file:", error);
		return;
		// Handle the error here, for example, you can show a message to the user
	}
}
