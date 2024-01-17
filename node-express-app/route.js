module.exports = function(dbConnection, app) {

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });
    

//Route POST /restaurants
app.post('/restaurants', (req, res) => {
    const { name, city, nbcouverts, terrasse, parking } = req.body;

    if (nbcouverts < 0) {
        return res.status(400).json({ error: "Données invalides pour le restaurant." });
      }

    let sql = `INSERT INTO restaurants (name, city, nbcouverts, terrasse, parking)
    VALUES ("${req.body.name}", "${req.body.city}", "${req.body.nbcouverts}", "${req.body.terrasse}", "${req.body.parking}")`;

    dbConnection.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Valeurs insérées !");
        res.status(200).send("Restaurant ajouté avec succès")
    });
    
});


//Route GET /restaurants
app.get('/restaurants', (req, res) => {
    let sql_template = "SELECT * FROM ??";
    let replaces = ['restaurants'];

    sql = dbConnection.format(sql_template, replaces);

    dbConnection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});


//Route GET /restaurants/:id
app.get('/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);

    let sql_template = "SELECT * FROM ?? WHERE ?? = " + id;
    let replaces = ['restaurants', 'id'];

    sql = dbConnection.format(sql_template, replaces);

    dbConnection.query(sql, function(err, row, fields) {
        if (err) throw err;
        res.send(row);
    });
    res.status(200);
});

//Route PUT /restaurants/:id
app.put('/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);

// Récupérer les nouvelles valeurs depuis le corps de la requête
    let updatedName = req.body.name;
    let updatedCity = req.body.city;
    let updatedNbcouverts = req.body.nbcouverts;
    let updatedTerrasse = req.body.terrasse;
    let updatedParking = req.body.parking;

// Exécuter la requête SQL pour mettre à jour la ressource dans la base de données
    let sql = `UPDATE restaurants SET name = "${updatedName}", city = "${updatedCity}", nbcouverts = "${updatedNbcouverts}", terrasse = "${updatedTerrasse}", parking = "${updatedParking}" WHERE Id = ${id}`;

    dbConnection.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Valeurs mises à jour !");
        res.status(200).send("Valeurs mises à jour");
    });
    
});

//Route DELETE / restaurants/:id
app.delete('/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);

// Éxécuter la requète sql pour supprimer une ligne d'une table
    let sql = `DELETE FROM restaurants WHERE id=${id}`;

    dbConnection.query(sql, function(err) {
        if (err) throw err; 
        console.log("Restaurant supprimé !");

        let deleteEmployesSql = `DELETE FROM employes WHERE restaurant_id=${id}`;
        dbConnection.query(deleteEmployesSql, function(err) {
            if (err) throw err;
            console.log("Employés du restaurant supprimés !");
            res.status(200).json({message: "Restaurant et ses employés supprimés"});
        });
    });
});

//Route POST /restaurants/:idResto/employes
app.post('/restaurants/:idResto/employes', (req, res) => {
    let idResto = parseInt(req.params.idResto);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let hire_date = req.body.hire_date;

    if (!first_name.match(/[a-zA-Z-' ]{3,}/) || !last_name.match(/[a-zA-Z-' ]{3,}/)) {
        return res.status(400).send("Prénom et nom doivent avoir au moins 3 caractères parmi a-z A-Z - et '.");
    }

    let sql = `INSERT INTO employes (first_name, last_name, hire_date, restaurant_id)
    VALUES ("${first_name}", "${last_name}", "${hire_date}", "${idResto}")`;

    //let values = [first_name, last_name, hire_date, idResto]

    dbConnection.query(sql, /*values, */function(err, results) {
        if (err) throw err;
        console.log("Valeurs insérées !");
        res.status(200).send("Employé ajouté avec succès !");
    });
});


//Route GET /restaurants/:idResto/employes
app.get('/restaurants/:idResto/employes', (req, res) => {
    let idResto = parseInt(req.params.idResto);

    let sql_template = `SELECT * FROM ?? WHERE ??="${idResto}"`;
    let replaces = ['employes', 'restaurant_id'];

    sql = dbConnection.format(sql_template, replaces);

    dbConnection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});

//Route GET /restaurants/:idResto/employes/:idEmploye
app.get('/restaurants/:idResto/employes/:id', (req, res) => {
    let idResto = parseInt(req.params.idResto);
    let id = parseInt(req.params.id);

    let sql_template = `SELECT * FROM ?? WHERE ?? = ${idResto} AND ?? = ${id}`;
    let replaces = ['employes', 'restaurant_id', 'id'];

    sql = dbConnection.format(sql_template, replaces);

    dbConnection.query(sql, function(err, row, fields) {
        if (err) throw err;
        res.send(row);
    });
    res.status(200);
});

//Route PUT /restaurants/:idResto/employes/:idEmploye
app.put('/restaurants/:idResto/employes/:id', (req, res) => {
    let idResto = parseInt(req.params.idResto);
    let id = parseInt(req.params.id);

// Récupérer les nouvelles valeurs depuis le corps de la requête
    let updatedFirst_name = req.body.first_name;
    let updatedLast_name = req.body.last_name;
    let updatedHire_date = req.body.hire_date;
    let updatedRestaurant_id = req.body.restaurant_id;

// Exécuter la requête SQL pour mettre à jour la ressource dans la base de données
    let sql = `UPDATE employes SET first_name = "${updatedFirstname}", last_name = "${updatedLastname}", hire_date = STR_TO_DATE("${updatedHire_date}", "%d/%m/%Y"), restaurant_id = "${updatedRestaurant_id}" WHERE Id = ${id} AND restaurant_id=${idResto}`;

    dbConnection.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Valeurs mises à jour !");
        res.status(200).send("Valeurs mises à jour");
    });
    
});

//Route DELETE /restaurants/:idResto/employes/:idEmploye
app.delete('/restaurants/:idResto/employes/:id', (req, res) => {  
    let idResto = parseInt(req.params.idResto);
    let id = parseInt(req.params.id);

// Éxécuter la requète sql pour supprimer une ligne d'une table
    let sql = `DELETE FROM employes WHERE id=${id} AND restaurant_id=${idResto}`;

    dbConnection.query(sql, function(err) {
        if (err) throw err; 
        console.log("Employé supprimé !");
        res.status(200).json({message: "Employé(e) supprimé(e)"});
    });
    
});
};