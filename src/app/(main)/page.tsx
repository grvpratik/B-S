import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const MainPage = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen gap-4">
			<h1>Home</h1>
			<Button><Link href={'/blog'}>blog</Link></Button>
			<Button><Link href={'/scrap'}>Scrap</Link></Button>
		</div>
	);
};

export default MainPage;
