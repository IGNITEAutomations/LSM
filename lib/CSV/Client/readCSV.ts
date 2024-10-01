function transformBoolValues(list: string[]) {
    const trueValues = new Set(["verdadero", "true"]);
    const falseValues = new Set(["falso", "false"]);

    return list.map(value => {
        const lowerValue = value.toLowerCase();
        if (trueValues.has(lowerValue)) {
            //console.log("VALUE: ", lowerValue)
            return "true";
        }
        if (falseValues.has(lowerValue)) {
            // console.log("VALUE: ", lowerValue)
            return "false";
        }
        return value;
    });
}

function cleanCsvData(data: string[][], expectedHeaders: string[]): any[][] {
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

    const matrix: (string | boolean)[][] = [];
    for (let i = 1; i < data.length; i++) {
        try {
            const row = data[i];
            const newRow: string[] = headersCols.map(colPos => row[colPos].replace(cleanRegExp, ""));
            if (newRow.some(value => value === "")) {
                console.warn(`Algunos campos de la fila ${i} están vacios`)
                //throw new Error(`Algunos campos de la fila ${i} están vacios`);
            }
            const transformedRow = transformBoolValues(newRow)

            console.log("transformedRow")

            if (transformedRow.every(value => value === "")) {
                return matrix
            }
            matrix.push(transformedRow);
        } catch (error) {
            console.error(error)
        }

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

