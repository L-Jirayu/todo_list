const express = require('express')
const mysql = require('mysql');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list',
    port: '3306'
})

connection.connect((err) => {
    if(err){
        console.log('Error connecting ',err)
        return;
    }
    console.log('MySQL connect success')

})




//--------------------------------------------------------API(CRUD)----------------------------------------------------------------//

app.post("/create", async (req, res) => {
    const {meg} = req.body;

    try{
        connection.query(
            "INSERT INTO user(message) VALUES(?)",
            [meg],
            (err, results, fields) => {
                if(err){
                    console.log("Error", err)
                    return res.status(400).send();
                }
                return res.status(201).json({message: "Success"});
            }
        )
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
})


app.get("/read", async (req, res) => {
    try{
        connection.query("SELECT * FROM user", (err, results, fields) => {
            if (err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } 
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
})


app.patch("/update/:message", async (req, res) => {
    const message = req.params.message;
    const new_edit = req.body.new_edit;

    try{
        connection.query("UPDATE user SET message = ? WHERE message = ?", [new_edit, message], (err, results, fields) => {
            if (err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        })
    } 
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
})


app.delete("/delete/:message", async (req, res) => {
    const message = req.params.message;

    try{
        connection.query("DELETE FROM user WHERE message = ?", [message], (err, results, fields) => {
            if (err){
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0){
                return res.status(404).json(results);
            }
            return res.status(200).json(results);
        })
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})




app.listen(3000, () => console.log('Server is running on port 3000'));
