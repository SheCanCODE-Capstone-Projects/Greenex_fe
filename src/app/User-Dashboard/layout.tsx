"use client";

import RoleGuard from "@/components/auth/RoleGuard";

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["CITIZEN"]}>
            {children}
        </RoleGuard>
    );
}
