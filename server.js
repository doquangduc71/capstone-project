let express =  require('express');
let app = express();
app.use(express.static(__dirname+'/dist/capstone-project'));
app.get('/*',(req,resp)=>{
    resp.sendFile(__dirname+'/dist/capstone-project/index.html');
});
app.listen(process.env.PORT || 4200);