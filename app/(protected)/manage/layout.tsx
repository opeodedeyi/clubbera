// if user is credible then continue else throw an error
import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
    title: "Clubbera | Manage Account",
    description: "Take Control of your account anc communities",
};

export default function ManageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
