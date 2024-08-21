"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {useForm, useWatch} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "@/validation/signupSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function LoginForm() {
    const [serverError, setServerError] = useState("");
    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const {control, formState: {isSubmitting}} = form;

    const email = useWatch({control, name: "email"});
    const password = useWatch({control, name: "password"});


    const router = useRouter()

    useEffect(() => {
        setServerError("");
    }, [email, password]);

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const {email, password} = values;
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            }, {withCredentials: true});
            console.log("response data", response.data)
            if (response.status === 200) {
                router.push("/")
            }
        } catch (error: any) {
            setServerError(`${error.response.data.error.details} `);
            console.log(error.response.data.error.details)
        }
    }

    return (
        <>

            <Card className="w-96 mx-auto">
                <CardHeader>
                    <CardTitle
                        className={"text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600"}>
                        Blaze Auth
                    </CardTitle>
                    <CardDescription className={"text-center text-md"}>Login in to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage></FormMessage>
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

                            {serverError && <FormMessage>{serverError}</FormMessage>}
                            <Button className={"w-full"} type="submit"
                                    disabled={isSubmitting}>
                                {isSubmitting ? <Loader className={"animate-spin"}/> : "Login"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center gap-2">
                    Don&apos;t have an account? <Link href={"/signup"} className="text-blue-500 hover:underline">Sign
                    Up</Link>
                </CardFooter>
            </Card>

        </>
    )
}