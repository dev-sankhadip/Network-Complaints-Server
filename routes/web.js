const webRouter=require('express').Router();

const { connection }=require('../db/database');

webRouter.get('/data', (request, response)=>
{
    const sqlQuery="select * from netinfo";
    connection.query(sqlQuery,(err, result)=>
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:'500' })
        }
        response.status(200).send({ result, code:'200' })
    })
})

webRouter.post('/location',(request, response)=>
{
    const { id }=request.body;
    const sqlQuery="select * from netinfo where id = ?";
    connection.query(sqlQuery,[id], function(err, result)
    {
        if(err)
        {
            response.status(500).send({ code:'500' })
        }
        response.status(200).send({ result, code:'200' })
    })
})

module.exports={
    webRouter
}