import { ChallengeDataRow } from "@/hooks/ChallengesProvider";
import { Table, TBody, TCell, THead, TRow } from "@/app/(logged)/_components/Table";

type ChallengesTableProps = {
  matrix: ChallengeDataRow[];
  headers: string[];
  onChange: (row: number, col: number, value: boolean) => void;
};

export default function ChallengesTable({ matrix, headers, onChange }: ChallengesTableProps) {
  return (
    <Table>
      <THead headers={headers} />
      <TBody>
        {matrix?.map((row, rowIndex) => (
          <TRow key={rowIndex}>
            <TCell>
              <p className="w-full text-left pl-2">{row.student.displayName}</p>
            </TCell>
            {row.challenges.map((challenge, colIndex) => (
              <TCell key={colIndex}>
                <div
                  onClick={() => onChange(rowIndex, colIndex, !challenge.value)}
                  className={`h-6 w-6 flex items-center justify-center cursor-pointer ${
                    challenge.value ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {challenge.value ? "❌" : "✔️"}
                </div>
              </TCell>
            ))}
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}
