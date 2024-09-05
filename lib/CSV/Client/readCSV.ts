function cleanCsvData(data: string[][], expectedHeaders: string[]): string[][] {
    if (!data || data.length === 0) {
        throw new Error("The CSV file is empty.")
    }
    const cleanRegExp = /[\n\r\t]/g;
    const headers = data[0].map(item => item.replace(cleanRegExp, ""));

    const headersCols = expectedHeaders.map(header => {
        const index = headers.indexOf(header);
        if (index === -1) {
            throw new Error(`La columna "${header}" no se encontró en el archivo`);
        }
        return index;
    });

    const matrix: string[][] = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const newRow = headersCols.map(colPos => row[colPos].replace(cleanRegExp, ""));
        if (newRow.some(value => value === "")) {
            throw new Error(`Algunos campos de la fila ${i} están vacios`);
        }
        matrix.push(newRow);
    }
    return matrix;
}

export default function readCSV(event: ProgressEvent<FileReader>, expectedHeaders: string[], onSave: (data: string[][]) => void) {
    const text = event.target?.result as string;
    const splitRows = text.split('\n')
    const delimiters = [",", ";", "\t"]
    const counts = delimiters.map(delimiter => ({
        delimiter, count: (splitRows[0].match(new RegExp(`\\${delimiter}`, 'g')) || []).length
    }));
    const selectedDelemiter = counts.reduce((prev, current) => (current.count > prev.count ? current : prev)).delimiter;

    const rows = splitRows.map((row) => row.split(selectedDelemiter));
    onSave(cleanCsvData(rows, expectedHeaders))
}

