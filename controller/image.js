const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '8ad7cdf237624fa99aaaa120427ac015'
});

const handleApiCall=(req,res)=>{
 app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data=>{
 	res.json(data);
 })
 .catch(err=>res.status(400).json('unable to get Api'));
}

const handleImageUpdate=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('unable to get entries'));

}
module.exports ={
	handleImageUpdate:handleImageUpdate,
	handleApiCall:handleApiCall
};
