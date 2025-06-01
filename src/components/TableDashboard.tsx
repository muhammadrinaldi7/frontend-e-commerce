import { ReactNode } from "react";

interface TableColumn {
  key: string;
  label: string;
}

interface TableDashboardProps<T> {
  columns: TableColumn[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
}

export default function TableDashboard<T>({
  columns,
  data,
  renderRow,
}: TableDashboardProps<T>) {
  return (
    <table className="min-w-full divide-y-2 divide-gray-200">
      <thead className="text-left">
        <tr className="*:font-medium *:text-gray-900">
          {columns.map((col) => (
            <th key={col.key} className="px-3 py-2 whitespace-nowrap">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
        {data.map((item, index) => (
          <tr key={index} className="*:text-gray-900 *:first:font-medium">
            {renderRow(item, index)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
