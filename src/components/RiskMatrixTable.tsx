const matrix = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 5],
  [3, 3, 4, 5, 5],
  [3, 4, 5, 5, 5],
  [4, 5, 5, 5, 5],
]

function RiskMatrixTable() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Matriz de risco</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-slate-700">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-100 p-2 text-left font-semibold">Impacto / Probabilidade</th>
              {matrix[0].map((_, index) => (
                <th key={index} className="border border-slate-200 bg-slate-100 p-2 text-center font-semibold">
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border border-slate-200 bg-slate-50 p-2 text-left font-semibold">
                  {rowIndex + 1}
                </th>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className={`border border-slate-200 p-2 text-center ${
                      cell >= 4 ? 'bg-red-100 text-red-700' : cell >= 3 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiskMatrixTable
