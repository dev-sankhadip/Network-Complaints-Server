const androidRouter=require('express').Router();
const shortid=require('shortid');

const { connection }=require('../db/database');

androidRouter.post('/signup', function(request, response)
{
    const { user }=request.body;
    const info=JSON.parse(user);
    console.log(info);
    const { contactNumber, email, name, password }=info;
    const sqlQuery="select * from info where email = ?";
    connection.query(sqlQuery,[email],(err, result)=>
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ response_code:500 });
        }
        if(result.length>0)
        {
            response.status(409).send({ response_code:409 });
        }
        else
        {
            const uid = shortid.generate();
            const sqlSignupQuery="insert into info(userid, name, email, number, password) values(?,?,?,?,?)";
            connection.query(sqlSignupQuery,[uid, name, email, contactNumber, password],(err, result1)=>
            {
                if(err)
                {
                    console.log(err);
                    response.status(500).send({ response_code:500 });
                    return;
                }
                response.status(200).send({ response_code:200 })
            })
        }
    })
})


androidRouter.post('/login',(request, response)=>
{
    const { email, password }=request.body;
    const sqlLoginQuery="select * from info where email = ?";
    connection.query(sqlLoginQuery,[email],(err, result)=>
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ response_code:500 })
            return;
        }
        if(result.length>0)
        {
            if(result[0].password===password)
            {
                response.status(200).send({ user_id:result[0].userid, name:result[0].name });
            }
            else
            {
                response.status(401).send({ response_code:401 });
            }
        }
        else
        {
            response.status(404).send({ response_code:404 })
        }
    })
})

androidRouter.post('/netinfo', (request, response)=>
{
    let { device_report, user_id }=request.body;
    device_report=JSON.parse(device_report);
    let { locationData:{ latitude, longitude }, simInfoList }=device_report;
    const sqlNetinfoQuery="insert into netinfo(id, userid, latitude, longitude, asuLevel, strength, networkType, operatorName, submissionDate) values(?,?,?,?,?,?,?,?,?)";
    simInfoList.map((sim)=>
    {
        const id=shortid.generate();
        connection.query(sqlNetinfoQuery,[id, user_id, latitude, longitude, sim.asuLevel, sim.signalStrength, sim.networkType, sim.operatorName, new Date().toDateString()],(err, result)=>
        {
            if(err)
            {
                console.log(err);
                response.status(500).send({ response_code:500 });
            }
        })
    })
    response.status(200).send({ response_code:200 });
})

androidRouter.post('/requests',(request, response)=>
{
    const { user_id }=request.body;
    const sqlGetDataQuery="select * from netinfo where userid = ?";
    connection.query(sqlGetDataQuery,[user_id],(err, result)=>
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ response_code:500 });
            return;
        }
        response.status(200).send({ result,response_code:200 });
    })
})

module.exports={
    androidRouter
}
