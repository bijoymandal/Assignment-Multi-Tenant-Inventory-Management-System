export default function CommonTable({
    title,
    columns,
    data,
    loading,
    error,
    renderRow
}) {
    return (
        <div className="bg-white rounded shadow p-4">
            <h1 className="text-xl font-bold mb-4">{title}</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && data.length === 0 && (
                <p className="text-gray-500">No records found</p>
            )}

            {!loading && data.length > 0 && (
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} className="p-2 text-left border-b">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, i) => renderRow(item, i))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
