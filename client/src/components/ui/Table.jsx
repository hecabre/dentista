import { useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { Card, Input } from "@material-tailwind/react";

export function Table({
  headers = [],
  displayHeaders = [],
  TABLE_ROWS = [],
  onEdit,
  showEditColumn = true, // Nueva prop con valor por defecto "true"
}) {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredRows = TABLE_ROWS.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 flex w-full">
        <Input
          type="text"
          placeholder="Buscar..."
          value={filterValue}
          onChange={handleFilterChange}
          className="p-2 text-sapphire-500 font-poppins-regular focus:font-poppins-regular"
        />
      </div>
      <table className="min-w-full bg-sapphire-50">
        <thead>
          <tr className="bg-sapphire-500">
            {displayHeaders.map((header, index) => (
              <th key={index} className="p-4 border-b border-sapphire-400">
                <Typography
                  variant="small"
                  color="white"
                  className="font-poppins-semibold"
                >
                  {header}
                </Typography>
              </th>
            ))}
            {showEditColumn && (
              <th className="p-4 border-b border-sapphire-400">
                <Typography
                  variant="small"
                  color="white"
                  className="font-poppins-semibold"
                >
                  Acciones
                </Typography>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredRows.length > 0 ? (
            filteredRows.map((row, rowIndex) => {
              const isLast = rowIndex === filteredRows.length - 1;
              const rowClasses = isLast
                ? "p-4"
                : "p-4 border-b border-sapphire-100 bg-sapphire-50 hover:bg-sapphire-100 transition duration-300 ease-in-out";

              return (
                <tr key={rowIndex}>
                  {headers.map((header, index) => (
                    <td key={index} className={rowClasses}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-poppins-regular text-sapphire-700"
                      >
                        {row[header]}
                      </Typography>
                    </td>
                  ))}
                  {showEditColumn && (
                    <td className={rowClasses}>
                      <Typography
                        as="button"
                        variant="small"
                        color="sapphire-500"
                        className="font-poppins-bold hover:text-sapphire-700"
                        onClick={() => onEdit(row)}
                      >
                        Editar
                      </Typography>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={headers.length + (showEditColumn ? 1 : 0)}
                className="text-center p-4 text-sapphire-600 font-poppins-regular flex items-center justify-center w-full"
              >
                <Spinner className="text-center" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
