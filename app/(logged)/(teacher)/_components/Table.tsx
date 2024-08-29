export function Table({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <table className={"w-full"}>
            {children}
        </table>
    )
}

export function THead({numCols, headers}: {numCols: number, headers: string[]}) {
    return (
        <thead>
            <tr className={"h-12 text-sm text-blue-1001 border-b border-b-gray-200"}>
                <th className={"w-[20%] pl-2 text-left"}>Students</th>
                {headers.map((header, index) => {
                    return (<th className={"font-semibold"} key={index}>{header}</th>)
                })}
            </tr>
        </thead>
    )
}

export function TBody({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

export function TRow({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <tr className={"odd:bg-white even:bg-[#F2F8FF] text-sm h-12"}>
            {children}
        </tr>)
}

export function TCell({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <td className={"text-center"}>
            {children}
        </td>
    )
}