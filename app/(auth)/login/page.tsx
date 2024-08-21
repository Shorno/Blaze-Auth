import LoginForm from "@/components/login-form";

export default function LoginPage() {
    return (
        <>
            <div className={"bg-slate-700 h-[calc(100vh-64px)] flex items-center justify-center"}>
                <LoginForm/>
            </div>
        </>
    )
}