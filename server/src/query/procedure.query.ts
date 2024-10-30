//Querys de sql para procedimientos
export const insertProcedimientoSQL = `
  INSERT INTO procedimiento (monto, procedimiento, cod_procedimiento)
  VALUES (?, ?, ?)
`;

export const updateProcedimientoSQL = `
  UPDATE procedimiento
  SET monto = ?, procedimiento = ?
  WHERE cod_procedimiento = ?
`;
export const selectProcedimientoSQL = `
  SELECT * FROM procedimiento
`;
