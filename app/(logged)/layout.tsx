import Header from "@/app/(logged)/_components/header";
import "./style.css";

export default function RootLayout(
    {children}: Readonly<{
        children: React.ReactNode
    }>) {
    return (<main className={"flex flex-col max-w-screen min-h-screen w-screen bg-white px-10"}>
        <Header/>
        <section className={"flex flex-col h-full mb-10 px-20 py-14 w-full bg-gray-100 rounded-lg overflow-hidden"}>
            {children}
        </section>
        <div className={"bg-gray-700 h-20 -mx-20 px-40 flex justify-center items-center text-xs text-white gap-10"}>
            <p>&#169; 2024 IGNITE Serious Play. All rights reserved.</p>
        </div>
    </main>);
}
