export function AdminSection({children, className=""}: {children: React.ReactNode, className?: string}) {
    return (
        <section className={`grow bg-white rounded-2xl flex flex-col w-full mt-8 px-10 py-10 gap-5 ${className}`}>
            {children}
        </section>
    )
}

export function AdminPage({children, className=""}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={`flex flex-col w-full grow overflow-y-auto px-10 ${className}`}>
            {children}
        </div>
    )
}