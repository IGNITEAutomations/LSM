type ChallengesTable = {
    matrix: any[][],
    header: string[]
}

export default function MentionsTable() {
    //const students = ["Pol Albarran", "Maria Cantudo", "Jan Aguadé", "Maria Ferrero"]
   // const challenges = 4
    const header = ["Metion 1", "Mention 2", "Mention 3"]
    const matrix = [[]]
    return (
        <table className={"w-full"}>
            <thead>
            <tr className={"h-10 text-sm text-blue-1001 border-b border-b-gray-200"}>
                <th className={"w-[20%] pl-2 text-left"}>Students</th>
                {header.map((title, index) => {
                    return (<th className={"font-semibold"} key={index}>{title}</th>)
                })}
            </tr>
            </thead>
            <tbody>
            {matrix.map((student) => {
                return (<tr key={student[0]} className={"odd:bg-white even:bg-[#F2F8FF] text-sm h-10"}>
                        <td className={"pl-2"}>{student[0]}</td>
                        {student.slice(1).map((value, index) => {
                            return (<td key={index} className={"text-center"}><input type={"checkbox"} className={"h-4 w-4"} checked={value}/></td>)
                        })}
                    </tr>)
            })}
            </tbody>
        </table>
    )
}