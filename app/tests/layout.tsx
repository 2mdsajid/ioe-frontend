import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Loksewa Sopan",
    description: "Loksewa Sopan Tests",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-gray-900">
            {children}
        </div>
    );
}
