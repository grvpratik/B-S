"use client";
import React from "react";
import ReactQuill from "react-quill";


import 'react-quill/dist/quill.snow.css';


const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, false] }],
		[
			{ font: [] },
			{
				size: [
					"8px",
					"10px",
					"11px",
					"12px",
					"13px",
					"14px",
					"15px",
					"16px",
					"18px",
					"24px",
					"36px",
					"48px",
				],
			},
		],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "color", "image"],
		[{ "code-block": true }],
		["clean"],
	],
};
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

const Editor = () => {
	return (
	
			<ReactQuill
				theme="snow"
				modules={modules}
				formats={formats}
				
			/>
		
	);
};

export default Editor;
