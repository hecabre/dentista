export const LOGIN_SQL = `
      SELECT User 
      FROM mysql.user 
      WHERE User = ? AND authentication_string = PASSWORD(?);
    `;
