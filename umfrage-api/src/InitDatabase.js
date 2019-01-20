


export const initDatabase = (pool, fs) => { 
    //read SQL instructions for creating the tables
    let databaseTableCreating = fs.readFileSync('databasecreatetables.txt').toString();

    //read SQL instructions for filling up data
    let databaseCreateTestUsers = fs.readFileSync('databasecreatetestusers.txt').toString();


    pool.query(databaseTableCreating) 
	
    .then((result) => {
    console.log(result);
    console.log('Database and table created');
    })

    .then(() => {
    pool.query(databaseCreateTestUsers)
    })
    .then((result) => {
    console.log(result);
    console.log('Testuser created');
    })
    .catch((err) => {
        console.log(err);
    });

}