// Consultas SQL para la tabla de "pacientes"
export const INSERT_PATIENT_SQL = `
  INSERT INTO pacientes 
  (nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, genero, telefono, dominio, rfcletras, rfcnumeros)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export const UPDATE_PATIENT_SQL = `
  UPDATE pacientes 
  SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, fechaNacimiento = ?, genero = ?, dominio = ?, rfcletras = ?, rfcnumeros = ?
  WHERE telefono = ?;
`;

export const SELECT_PATIENT_BY_TELEFONO_SQL = `
  SELECT * FROM pacientes 
  WHERE telefono = ?;
`;

export const SELECT_ALL_PATIENTS_SQL = `
  SELECT 
    nombre, 
    apellidoPaterno, 
    apellidoMaterno, 
    fechaNacimiento, 
    genero, 
    CONCAT("55", telefono) as telefono,
    dominio,
    CONCAT(rfcletras, rfcnumeros) AS rfc
  FROM pacientes;
`;
