// Consultas SQL para la tabla de "suministros_tratamiento"
export const INSERT_TREATMENT_SUPPLY_SQL = `
  INSERT INTO suministros_tratamiento 
  (cita_empleado_numss, cita_fecha, cita_hora, procedimiento_cod_procedimiento)
  VALUES (?, ?, ?, ?);
`;

export const UPDATE_TREATMENT_SUPPLY_SQL = `
  UPDATE suministros_tratamiento 
  SET procedimiento_cod_procedimiento = ?
  WHERE cita_empleado_numss = ? AND cita_fecha = ? AND cita_hora = ?;
`;


export const SELECT_ALL_TREATMENT_SUPPLIES_SQL = `
  SELECT * FROM suministros_tratamiento;
`;
