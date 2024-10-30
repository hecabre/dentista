//Querys de sql para suministro
export const insertSuministroSQL = `
  INSERT INTO suministro (Nombre, Cantidad, Caducidad, Estado, ID_Suministro, vigente)
  VALUES (?, ?, ?, ?, ?, ?)
`;

export const updateSuministroSQL = `
  UPDATE suministro
  SET Nombre = ?, Cantidad = ?, Caducidad = ?, Estado = ?, vigente = ?
  WHERE ID_Suministro = ?
`;

export const selectSuministroSQL = `
    SELECT * from suministro
`;
