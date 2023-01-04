const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json()); //req.body


function uuidv4() {
    let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    let guid = [u.substr(0, 4), u.substr(8, 4), '3939' + u.substr(13, 3), u.substr(16, 12)].join('-');
    return guid;
    /* return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(10)
     );*/
}

app.get("/getPlayerDetails", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM PLAYER");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/getPlayerDetailsById/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const allTodos = await pool.query("SELECT * FROM PLAYER where player_id=$1", [id]);
        res.json(allTodos.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


app.post("/savePlayerDetails", async (req, res) => {
    try {
        const player = await pool.query("SELECT player_id FROM PLAYER order by player_id desc limit 1");
        console.log(player)
        console.log(player.rows[0].player_id)
        const id= player.rows[0].player_id;
        const player_id = id+1;
        const {player_name, dob, batting_hand, bowling_skill, country} = req.body;
        const dob1=  new Date(dob)

        const results = await pool.query(
            "INSERT INTO player (player_id,player_name,dob,batting_hand, bowling_skill, country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            [player_id, player_name, dob1, batting_hand, bowling_skill, country]
        );
        const op =  await pool.query("SELECT * FROM player WHERE Player_Id= $1",[player_id])
        res.json(op);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});


    }
});

app.listen(3001, () => {
    console.log("server has started on port 3001");
});

