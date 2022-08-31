const Controller = require('../controller')

module.exports = new class HomeController extends Controller {
     indexPage(req,res){
        res.status(200).send("This is index Page")
    }
}
