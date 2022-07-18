const controller = require('../controllers/plan_C');
const loginUser = require('../middlewares/verifyJWT');
module.exports = (ap)=>{

    ap.post('/netflix/v1/users/plan/create',[loginUser.token],controller.purchasePlane);

}