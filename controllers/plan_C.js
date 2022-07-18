const User = require('../models/user_Schema');
const Plan = require('../models/plan_Schema');
const Util = require('../utils/planObj');

// Handler for purchase plane
exports.purchasePlane = async(req, res)=>{
    const planId = req.body.planId;
    
    try{

        let duration, price, device;
        let flag = false;
        for(let key in Util){
            if(key == planId){
                duration = Util[key].duration;
                price = Util[key].price;
                device = Util[key].device;
                flag = true;
            }
        }
        if(flag == false){
            res.status(404).send({
                message : 'this plan is not valid !'
            });
            return;
        }
        const ResBody = {
            planId : planId,
            price : price,
            duration : duration,
            price : price
        };
        // who purches the plan
        const userId = req._id;
        const plans = await Plan.create(ResBody);
        // saving which user purches the plan
        plans.userId = userId;
        await plans.save();
        // saving and attaching the planId with user model
        let user = await User.findOne({_id: userId})
        user.userPlane = plans._id;
        await user.save();

        res.status(201).send(plans);

    }catch(err){
        console.log(err);
        res.status(500).send({
            message : 'Internal error while plan purches !'
        });
    }

}

// Handler for Cancel the plan

exports.cancelPlan = async(req, res)=>{
    const userId = req._id;
    try{
        let users = await User.findById(userId);

        if(users.userPlane == null){
            res.status(404).send({
                message : 'you have no any plan !'
            });
            return;
        }
        await Plan.deleteOne({userId : userId});

        users.userPlane = null;
        users.save();
        res.status(200).send({
            message : ' Your plan is canceled '
        });
        
    }catch(err){
        console.log(err);
        res.status(500).send({
            message : 'Internal error  !'
        });
    }

}