import Header from "@/app/(logged)/_components/header";
import "./style.css";
import Footer from "@/app/(logged)/_components/footer";

export default function RootLayout(
    {children}: Readonly<{
        children: React.ReactNode
    }>) {
    return (<main className={"flex flex-col max-w-screen min-h-screen w-screen bg-white px-10"}>
        <Header/>
        <section className={"flex flex-col h-full mb-10 px-20 py-14 w-full bg-gray-100 rounded-lg overflow-hidden"}>
            {children}
        </section>
        <Footer/>
    </main>);
}
