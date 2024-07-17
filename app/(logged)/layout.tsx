import Header from "@/app/(logged)/_components/header";
import "./style.css";

export default function RootLayout(
    {children}: Readonly<{
        children: React.ReactNode
    }>) {
    return (
        <main className={"flex flex-col max-w-screen max-h-screen bg-gray-100 min-h-screen w-screen px-20"}>
            <Header/>
            <section className={"flex flex-col flex-1 mb-10 px-10 py-8 w-full bg-white rounded-xl"}>
                {children}
            </section>
        </main>);
}
