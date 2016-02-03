
    

    // Wait for device API libraries to load
    //
    //document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database
    //
    function checkTB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS USERS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (nombre, edad)');
        
        //tx.executeSql('INSERT INTO USERS (nombre, edad) VALUES ("Jacel", 24)');
        //tx.executeSql('INSERT INTO USERS (nombre, edad) VALUES ("Omar", 29)');
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM USERS', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        //console.log("USERS table: " + len + " rows found.");
        $("#tb-users").html("");
        for (var i=0; i<len; i++){
            //console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
            renderUser( results.rows.item(i) );
        }
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
        console.log(err);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(checkTB, errorCB, successCB);
    }


    // render user
    function renderUser(user)
    {
        var tr = $("<tr>")
                    .append( $("<td>").append(user.nombre) )
                    .append( $("<td>").append(user.edad) );
        $("#tb-users").append( tr );            
    }

    function addUser()
    {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(addRecord, errorCB, successCB);

    }

    function addRecord(tx)    
    {
        var nombre = $("#nombre").val();
        var edad = $("#edad").val();
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (nombre, edad)');        
        tx.executeSql('INSERT INTO USERS (nombre, edad) VALUES ("'+nombre+'", '+edad+')');

    }

