let mysql = require('mysql');

console.log('Get connection ...');

let connection = mysql.createConnection({
  database: 'testnodejs',
  host: 'localhost',
  user: 'root',
  password: 'root'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  // Supprimer une table Employées existante
  let sql1 = 'DROP TABLE IF EXISTS Employes ';

    connection.query(sql1, function (err, results) {
        if (err) throw err;
        console.log('Table Employes dropped');

        // Créer une table Employes
        let sql2 ='CREATE TABLE Employes (' +
        'Id INT AUTO_INCREMENT PRIMARY KEY,' +
        'FirstName VARCHAR(255),' +
        'LastName VARCHAR(255),' +
        'Hire_date DATE' +
        ')';

        connection.query(sql2, function (err, results) {
        if (err) throw err;
        console.log('Table Employes created');

        // Données à insérer
        let firstNames = ["John", "Jack", "Paul"];
        let lastNames = ["Hikes", "Smith", "Gates"];
        let hireDates = ["22/10/2001", "11/11/2000", "12/12/1990"];

        // Insérer des données à la table Employes
        for (let i = 0; i < firstNames.length; i++) {
            let sql3 = `INSERT INTO Employes (FirstName, LastName, Hire_date) 
            VALUES ("${firstNames[i]}", "${lastNames[i]}", STR_TO_DATE("${hireDates[i]}", "%d/%m/%Y"))`;

            connection.query(sql3, function (err, results) {
            if (err) throw err;
            console.log("Données insérées!");
            });
        }

        connection.end();
        });
    });
});
