let mysql = require('mysql');

console.log('Get connection ...');

let connection = mysql.createConnection({
  database: 'testnodejs',
  host: "localhost",
  user: "root",
  password: "root"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql_template = "Select * FROM employes WHERE Hire_Date > ? ";

   let replaces = ['1995-11-20'];
   sql = mysql.format(sql_template, replaces);


   connection.query(sql, function(err, rows, fields) {
        if (err) throw err;

//>>>> Ecrire ici la boucle qui permet d’afficher dans la console le résultat de recherche (utiliser console.log())

    rows.forEach((employee, index) => {
        console.log(`Employé ${index + 1}:`);
        console.log(`Id: ${employee.Id}`);
        console.log(`FirstName: ${employee.FirstName}`);
        console.log(`LastName: ${employee.LastName}`);
        console.log(`Hire_date: ${employee.Hire_date}`);
        console.log("------------------------");
    });

    connection.end();
    });
});