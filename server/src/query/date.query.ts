//Querys de sql para citas
export const insertCitaSQL = `
  INSERT INTO cita (empleado_numss, telefono, fecha, hora, estado, ano_cita, num_cita)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

export const updateCitaSQL = `
  UPDATE cita
  SET telefono = ?, estado = ?, ano_cita = ?, num_cita = ?
  WHERE empleado_numss = ? AND fecha = ? AND hora = ?
`;
export const selectCitaSQL = `
  SELECT * FROM cita
`;
export const selectCitaByEmpleadoSQL = `
  SELECT * FROM cita
  WHERE empleado_numss = ?
`;
