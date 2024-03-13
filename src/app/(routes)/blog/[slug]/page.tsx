'use client'
import React, { useState } from 'react'


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import Editor from '@/components/editor/editor';


const formSchema = z.object({
	title: z.string().min(2).max(50),
	slug: z.string().min(2).max(50),
	bannerImage: z.string().min(2).max(50),
    discription: z.string().min(2).max(250),
    content:z.string()
});





const BlogDetails = () => {

    const [title, setTitle] = useState("")
    
    const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
            title: "",
            slug: "",
            bannerImage: "",
            discription: "",
            content:""
            
		},
    });
    console.log(title)
      function onSubmit(values: z.infer<typeof formSchema>) {
				// Do something with the form values.
				// ✅ This will be type-safe and validated.
				console.log(values);
			}
  return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 container"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="the title of the post.." {...field} />
								</FormControl>
								<FormDescription>This is the title of the post</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="slug here.." {...field} />
								</FormControl>
								<FormDescription>this is the slug of the post</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="discription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discription</FormLabel>
								<FormControl>
									<Textarea
										placeholder="some short discription of the post.."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									this is the discription of the post
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<Textarea
										placeholder="here goes the main content of the post"
										{...field}
									/>
								
								</FormControl>
								<FormDescription>
									this is the content of the post
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}

export default BlogDetails