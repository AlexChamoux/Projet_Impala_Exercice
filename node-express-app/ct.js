module.exports = function(dbConnection) {
    let createRestaurants ='CREATE TABLE IF NOT EXISTS restaurants (Id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100),city VARCHAR(100), nbcouverts INT(10),terrasse VARCHAR(3), parking VARCHAR(3))';

    dbConnection.query(createRestaurants, function (err, results) {
        if (err) throw err;
        console.log('Table restaurants créées');

        let createEmployes ='CREATE TABLE IF NOT EXISTS employes (Id INT(11) AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), hire_date DATE, restaurant_id INT)';

        dbConnection.query(createEmployes, function (err, results) {
            if (err) throw err;
            console.log('Table employes créées');    
        });
    });
};