import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function useUserName() {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        // Try to get user info from localStorage (or adapt to your auth logic)
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                // Handle both direct user object and login API response
                let fullName = "";
                if (Array.isArray(user?.data) && user.data[0]?.personal_info?.full_name) {
                    fullName = user.data[0].personal_info.full_name;
                } else if (user?.personal_info?.full_name) {
                    fullName = user.personal_info.full_name;
                } else if (user?.full_name) {
                    fullName = user.full_name;
                } else if (user?.name) {
                    fullName = user.name;
                }
                setName(fullName);
            } catch {
                setName("");
            }
        }
    }, []);

    return name;
}

export function CRMWelcomeBanner() {
    const userName = useUserName();

    return (
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-xl p-4 mb-6 shadow-sm">
            <Sparkles className="text-blue-500 h-8 w-8 animate-bounce" />
            <div>
                <h2 className="text-xl font-semibold text-blue-700">
                    Hi {userName ? userName : "there"}, welcome to FieldLink!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Your Analytics are all set.<br />
                    Welcome to FieldLink CRM. Track agents, manage tickets, and get real-time insights on your field operations.
                    <span className="font-medium text-blue-600 ml-1">Tip:</span> Use the quick actions below to track tickets, assign visits, or view your field force's activity!
                </p>
            </div>
        </div>
    );
}
