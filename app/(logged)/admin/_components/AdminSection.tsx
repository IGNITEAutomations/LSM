export default function AdminSection({children}: {children: React.ReactNode}) {
    return (
        <section className={"h-full bg-white rounded-2xl flex flex-col w-full mt-8 px-10 py-10 gap-5"}>
            {children}
        </section>
    )
}