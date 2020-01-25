const androidRouter=require('express').Router();
const shortid=require('shortid');

const { connection }=require('../db/database');

androidRouter.post('/netinfo', (request, response)=>
{
    let { address, latitude, logitude,sim_info }=request.body;
    const state=JSON.parse(address).mAdminArea;
    sim_info=JSON.parse(sim_info);
    for(let i=0;i<sim_info.length;i++)
    {
        const id=shortid.generate();
        net_info_arr = [];
        net_info_arr.push(id);
        net_info_arr.push(state);
        net_info_arr.push(latitude);
        net_info_arr.push(logitude);
        net_info_arr.push(sim_info[i].cellType);
        net_info_arr.push(sim_info[i].operatorName);
        net_info_arr.push(sim_info[i].cellSignalStrength.mSignalStrength);
        net_info_arr.push(sim_info[i].cellSignalStrength.mBitErrorRate);
        net_info_arr.push(sim_info[i].cellSignalStrength.mTimingAdvance);
        const sqlQuery="insert into netinfo(id, state, latitude, longitude, sim1opname, sim1nettype, sim1dbm, sim1asu, timingAdvance) values (?,?,?,?,?,?,?,?,?)";
        connection.query(sqlQuery,net_info_arr,(err, result)=>
        {
            if(err)
            {
                console.log(err);
            }

            console.log(result);
        })

    }
})

androidRouter.post('/signup', function(request, response)
{
    // console.log(request.body);
    // const { user }=request.body;
    // const info=JSON.parse(user);
    // console.log(info);
    response.status(200).send({ code:200 })
})

androidRouter.get('/signup', function(request, response)
{
    response.status(200).send({ code:200 });
})

module.exports={
    androidRouter
}