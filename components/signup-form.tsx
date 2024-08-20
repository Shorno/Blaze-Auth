"use client"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm, useWatch} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/validation/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import {useEffect, useState} from "react";
import {checkEmailAvailability, checkUsernameAvailability} from "@/helper/authHelper";

export default function SignupForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        }
    });
    const {control} = form;


    const email = useWatch({control, name: "email"});
    const username = useWatch({control, name: "username"});
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");


    useEffect(() => {
        checkUsernameAvailability(username, setUsernameError);
    }, [username]);


    useEffect(() => {
        checkEmailAvailability(email, setEmailError);
    }, [email]);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {username, email, password} = values


        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {username, email, password,},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }


    return (
        <Card className="w-96 mx-auto">
            <CardHeader>
                <CardTitle
                    className={"text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600"}>
                    Blaze Auth
                </CardTitle>
                <CardDescription className={"text-center text-md"}>Setup web authentication without
                    hassle.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage>{emailError}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage>{usernameError}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Retype your password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className={"w-full"} type="submit">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    )
}
