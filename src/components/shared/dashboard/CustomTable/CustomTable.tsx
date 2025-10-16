//Types
export type Column<T> =
  | {
      header: string;
      accessor: keyof T;
      cell?: (row: T) => React.ReactNode;
    }
  | {
      header: string;
      accessor?: never;
      cell: (row: T) => React.ReactNode;
    };

export interface ITableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const CustomTable = <T extends object>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-b-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#E3E3E3]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-2 text-left text-base text-[#1E1E1E] font-semibold tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-[#1E1E1E]"
                >
                  {column.cell
                    ? column.cell(row)
                    : "accessor" in column && column.accessor
                    ? String(row[column.accessor] ?? "")
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
