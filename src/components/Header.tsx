import Image from "next/image";

export default function Header() {
    return (
        <header className="w-full h-16 flex items-center justify-between px-8 bg-[#fff] dark:bg-[#111] border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                <Image src="/white-label/logo.svg" alt="Logo" width={40} height={40} />
                <span className="font-bold text-xl text-foreground">FieldLink CRM</span>
            </div>
            <div className="flex items-center gap-4">
                {/* Placeholder for user info, settings, etc. */}
                <span className="text-foreground">Welcome, User</span>
            </div>
        </header>
    );
}
