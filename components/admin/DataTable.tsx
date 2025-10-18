
import React from 'react';
import { EditIcon, DeleteIcon } from './AdminIcons';

interface Column<T> {
    header: string;
    accessor: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

function DataTable<T>({ columns, data, onEdit, onDelete }: DataTableProps<T>) {
    return (
        <div className="bg-white dark:bg-[#111] rounded-lg border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/40 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                    <tr>
                        {columns.map(col => (
                            <th key={col.header} className="px-6 py-3 font-semibold">{col.header}</th>
                        ))}
                        {(onEdit || onDelete) && <th className="px-6 py-3 font-semibold text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            {columns.map(col => (
                                <td key={col.header} className="px-6 py-4 whitespace-nowrap">{col.accessor(item)}</td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end space-x-4">
                                        {onEdit && (
                                            <button onClick={() => onEdit(item)} className="text-blue-500 hover:text-blue-700">
                                                <EditIcon />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-700">
                                                <DeleteIcon />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
