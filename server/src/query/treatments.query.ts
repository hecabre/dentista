//Querys de sql para tratamientos
export const insertTratamientoSQL = `
  INSERT INTO tratamientos (Fecha, pacientes_telefono, Procedimineto, Observaciones, MedicamentoRecetado, CitasFaltenate)
  VALUES (?, ?, ?, ?, ?, ?)
`;
export const updateTratamientoSQL = `
  UPDATE tratamientos
  SET Procedimineto = ?, Observaciones = ?, MedicamentoRecetado = ?, CitasFaltenate = ?
  WHERE Fecha = ? AND pacientes_telefono = ?
`;
export const selectSuministroSQL = `
    SELECT * from tratamientos
`;
