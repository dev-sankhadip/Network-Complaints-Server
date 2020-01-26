const androidRouter=require('express').Router();
const shortid=require('shortid');

const { connection }=require('../db/database');

androidRouter.post('/netinfo', (request, response)=>
{
    console.log(request.body);
    // let { address, latitude, logitude,sim_info }=request.body;
    // const state=JSON.parse(address).mAdminArea;
    // sim_info=JSON.parse(sim_info);
    // for(let i=0;i<sim_info.length;i++)
    // {
    //     const id=shortid.generate();
    //     net_info_arr = [];
    //     net_info_arr.push(id);
    //     net_info_arr.push(state);
    //     net_info_arr.push(latitude);
    //     net_info_arr.push(logitude);
    //     net_info_arr.push(sim_info[i].cellType);
    //     net_info_arr.push(sim_info[i].operatorName);
    //     net_info_arr.push(sim_info[i].cellSignalStrength.mSignalStrength);
    //     net_info_arr.push(sim_info[i].cellSignalStrength.mBitErrorRate);
    //     net_info_arr.push(sim_info[i].cellSignalStrength.mTimingAdvance);
    //     const sqlQuery="insert into netinfo(id, state, latitude, longitude, sim1opname, sim1nettype, sim1dbm, sim1asu, timingAdvance) values (?,?,?,?,?,?,?,?,?)";
    //     connection.query(sqlQuery,net_info_arr,(err, result)=>
    //     {
    //         if(err)
    //         {
    //             console.log(err);
    //         }

    //         console.log(result);
    //     })
    // }
})

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


module.exports={
    androidRouter
}
