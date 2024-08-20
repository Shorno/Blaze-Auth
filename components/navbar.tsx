import Link from "next/link"

export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between px-6 bg-background">
            <Link href="/" className="text-lg font-semibold" prefetch={false}>
                Home
            </Link>
            <nav className="flex items-center gap-4">
                <Link href={"/login"} className="text-sm font-medium text-muted-foreground hover:text-foreground" prefetch={false}>
                    Login
                </Link>
                <Link
                    href={"/signup"}
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 py-1 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    prefetch={false}
                >
                    Sign Up
                </Link>
            </nav>
        </header>
    )
}