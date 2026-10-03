const express = require("express")
const mysql= require("mysql")
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())


const db=mysql.createConnection({
	user:"root",
	host:"localhost",
	password:"password",
	database:"web_nikki"
})







const sql=`SELECT *
FROM journal
WHERE owner_ID = ?`
app.get ("/fetch_journals",(req,res)=>{
	db.query(sql, [req.query.user_id],
	(err,result)=>{
		if(err){
			console.log(err)
		} else{
			res.send(result)
		} 
	})
})
app.post('/edit_journal',(req,res)=>{
	console.log("hey senpai eric! editting !")
  const journal_name=req.body.journal_name
  const journal_desc=req.body.journal_desc
  const editDate=req.body.editDate
  const ID=req.body.ID
  db.query(`
  	UPDATE journal
  	SET journal_name=?,
  	    journal_desc=?,
  	    editDate=?
  	WHERE ID=?
  	`,
  	[journal_name,journal_desc,editDate,ID],
  	(err,result)=>{
  	if(err){
		console.log(err)
	} else{
		res.send("Values inserted")
	}
  	})
})
app.post('/create_journal',(req,res)=>{
console.log(req.body)
  const journal_name=req.body.journal_name
  const journal_desc=req.body.journal_desc
  const createDate=req.body.createDate
  const editDate=req.body.editDate
  const owner_ID=req.body.owner_ID
  db.query("INSERT INTO journal (journal_name,journal_desc,owner_ID,createDate,editDate) VALUES (?,?,?,?,?)",
  [journal_name,journal_desc,owner_ID,createDate,editDate],
  (err,result)=>{
	if(err){
		console.log(err)
	} else{
		res.send("Values inserted")
	}
} )
})
app.delete('/delete_journal',(req,res)=>{
	console.log("hi eric >~< (we deleting)")
	console.log(req.query.ID)
	db.query(`DELETE FROM journal WHERE ID=?`,[req.query.ID],(err,result)=>{
		if(err){
			console.log(err)
		} else{
			res.send("Values inserted")
		}
	})
})




app.listen(3001)