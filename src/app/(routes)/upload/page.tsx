"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
	const [file, setFile] = useState<File | null>(null);
	const [publicImgUrl, setPublicImgUrl] = useState<string>('')
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!file) {
			toast.error("Please select a file to upload.");
			return;
		}

		setUploading(true);

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fileName: file.name,
						contentType: file.type,
						fileSize: file.size,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to get pre-signed URL.");
			}

			const { url,publicUrl } = await response.json();

			// const formData = new FormData();
			// formData.append("file", file);
			const options = { headers: { "Content-Type": file.type } };

			const uploadResponse = await await axios.put(
				url,
				file,
				options
			);

			if (uploadResponse.status === 200) {
				setPublicImgUrl(publicUrl)
				toast.success("Upload successful!");
				
			} else {
				throw new Error("Upload failed.");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Upload failed.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<main>
			<h1>Upload a File to S3</h1>
			<form onSubmit={handleSubmit}>
				<input
					id="file"
					type="file"
					onChange={(e) => {
						const files = e.target.files;
						if (files) {
							setFile(files[0]);
						}
					}}
					accept="image/png, image/jpeg"
				/>
				<button type="submit" disabled={uploading}>
					{uploading ? "loading.." : "Submit"}
				</button>
			</form>{publicImgUrl &&<Image src={publicImgUrl} alt="" width={2000} height={2000}/>
			}
			

			
		</main>
	);
}
// Object.entries(fields).forEach(([key, value]) => {
// 	formData.append(key, value as string);
// });
