const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, "lkofazyhbclddoikksuer4547841refdèreeççàzL11e034046e8553c57LE_JOUR_DIT J'EN PREND_L'ENGAGEMENT_12555685798*ldslkjkwxgbjdhcbhjbsnds_njkjkjwxri54d5fhf556df6588653sdsdsxc-_ççà&kgjénnxcifkjf");
        const userId = decodedtoken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'user id non valable'
        }else{
            next()
        }
        
    } catch (error) {
        res.statut(401).json({error: error | "requete non authentifiée"})
    }
}