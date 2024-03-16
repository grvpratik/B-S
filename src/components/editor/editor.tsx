"use client";
import { uploadToAws } from "@/lib/aws";
import React, { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }: any) => {
	const QuillRef = useRef<ReactQuill>(null);

	const imageHandle = useCallback(() =>{
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files ? input.files[0] : null;
			

			const quillObj = QuillRef.current?.getEditor();
			const range = quillObj?.getSelection();

			if (file) {
				const url = await uploadToAws(file);

				url && quillObj?.insertEmbed(range.index, "image", url);
			}
		};
	},[]);


	const modules = useMemo(
  
		() => ({
			toolbar: {
				container: [
					[{ header: [2, 3, 4, false] }],
					["bold", "italic", "underline", "blockquote"],
					[{ color: [] }],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					["link", "image"],
					["clean"],
				],
				handlers: {
					image: imageHandle,
				},
			},
			clipboard: {
				matchVisual: true,
			},
		}),
		[imageHandle]
	);
	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"link",
		"indent",
		"image",
		"code-block",
		"color",
	];

	return (
		<ReactQuill
			ref={(element) => {
				if (element !== null) {
					QuillRef.current = element;
				}
			}}
			value={value}
			theme="snow"
			modules={modules}
			formats={formats}
			onChange={onChange}
		/>
	);
};

export default Editor;
