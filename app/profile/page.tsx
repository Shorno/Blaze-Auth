import {verifySession} from "@/lib/auth";

export default async function ProfilePage() {
    const {isAuthenticated, userId, email}: any = await verifySession();


    return (
        <div className={"bg-slate-700 h-[calc(100vh-64px)] text-white flex items-center justify-center"}>
           <div className={"flex flex-col"}>
               <h1>Profile Page</h1>
               {isAuthenticated ? "Authenticated" : "Not Authenticated"}
           </div>
        </div>
    );
}