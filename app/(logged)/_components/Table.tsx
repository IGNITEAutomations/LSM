export function Table({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <table className={"w-full"}>
            {children}
        </table>
    )
}

export function THead({headers, empty = false, headerAlign = "center"}: {headers: string[], empty?: boolean, headerAlign?: "right" | "left" | "center"}) {
    return (
        <thead>
            <tr className={"h-12 text-sm text-blue-1001 border-b border-b-gray-200"}>
                {empty ? null :
                    <th className={"w-[20%] pl-2 text-left"}>Students</th>
                }
                {headers.map((header, index) => (
                    <th className={`font-semibold h-12 ${headerAlign === "center" ? "text-center" : headerAlign === "left" ? "text-left" : "text-right"}`} key={index}>{header}</th>)
                )}
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

export function TRow({children, onClick = () => {}, clickEnable = false, enableColor = false}: Readonly<{children: React.ReactNode, onClick?: () => void, clickEnable?: boolean, enableColor?: boolean}>) {
    return (
        <tr className={`odd:bg-[#F2F8FF] even:bg-white text-sm h-12 ${enableColor ? "hover:bg-gray-100 transition-colors duration-300" : "" }  ${clickEnable ? "cursor-pointer" : ""}`} onClick={onClick}>
            {children}
        </tr>)
}

export function TCell({children, className}: Readonly<{children: React.ReactNode, className?: string}>) {
    return (
        <td className={`text-center ${className}`}>
            <div className={"flex justify-center items-center"}>
                {children}
            </div>
        </td>
    )
}

export function TableSkeleton({headerName = "", headers, nCols, nRows}: {headerName?: string, headers?: string[], nCols?: number, nRows?: number}) {

    if (headerName && nCols) {
        const headers =  [...Array(nCols)].map((_, i) => (`${headerName} ${i+1}`))
        return (
            <Table>
                <THead headers={headers}/>
                <TBody>
                    {[...Array(nRows)].map((_, i) => (
                            <TRow key={i}>
                                {[...Array(nCols+1)].map((_, j) => (
                                    <TCell key={j}><div className={"w-full h-8 flex justify-center items-center"}><div className={"w-[80%] h-4 animate-pulse bg-gray-200 rounded-3xl"}/></div></TCell>
                                ))}
                            </TRow>
                        ))
                    }
                </TBody>
            </Table>
        )
    } else if (headers) {
        return (
            <Table>
                <THead empty={true} headers={headers}/>
                <TBody>
                    {[...Array(nRows)].map((_, i) => (
                            <TRow key={i}>
                                {headers.map((_, j) => (
                                    <TCell key={j}><div className={"w-full h-8 flex justify-center items-center"}><div className={"w-[80%] h-4 animate-pulse bg-gray-200 rounded-3xl"}/></div></TCell>
                                ))}
                            </TRow>
                        ))
                    }
                </TBody>
            </Table>
        )
    }


}