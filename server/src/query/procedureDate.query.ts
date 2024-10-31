// Consultas SQL para la tabla de "procedimientos_cita"
export const INSERT_PROCEDURE_DATE_SQL = `
  INSERT INTO procedimiento_cita 
  (cita_empleado_numss, cita_fecha, cita_hora, procedimiento_cod_procedimiento)
  VALUES (?, ?, ?, ?);
`;

export const UPDATE_PROCEDURE_DATE_SQL = `
  UPDATE procedimiento_cita 
  SET cita_fecha = ?, cita_hora = ?, procedimiento_cod_procedimiento = ?
  WHERE cita_empleado_numss = ? AND cita_fecha = ? AND cita_hora = ?;
`;

export const SELECT_PROCEDURE_DATE_BY_EMPLEADO_SQL = `
  SELECT * FROM procedimiento_cita 
  WHERE cita_empleado_numss = ?;
`;

export const SELECT_ALL_PROCEDURE_DATES_SQL = `
  SELECT 
    pc.cita_empleado_numss AS cita_empleado_numss,
    pc.cita_fecha AS cita_fecha,
    pc.cita_hora AS cita_hora,
    p.procedimiento AS procedimiento,
    p.monto AS monto
  FROM 
    procedimiento_cita pc
  JOIN 
    procedimiento p ON pc.procedimiento_cod_procedimiento = p.cod_procedimiento;
`;
