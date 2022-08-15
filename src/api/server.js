import  express  from 'express'
import  {checkAccount,insertMember,checkLogin}  from './checkAccount.js'
import  cookieParser  from 'cookie-parser'
import  {tableData}  from './memberData.js'
//const express = require('express')
const app = express()
app.use(cookieParser())
const port = 3000
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.cookies);
  next();
});
app.post('/checkAccount',checkAccount);
app.post('/insertMember',insertMember);
app.post('/checkLogin',checkLogin);

app.post('/deleteItem',(req,res)=>{
  tableData[req.cookies.account].splice(req.body.index, 1);
  tableData[req.cookies.account].forEach((element,index) => {
    element.id = index;
  });
  res.send({status:'ok',msg:'成功',data:{account:req.cookies.account,name:req.cookies.name,tableData:tableData[req.cookies.account]}})
});

app.post('/addItem',(req,res)=>{

  const id = tableData[req.cookies.account].length;
  const data = {
    id:id,
    date:req.body.date,
    name:req.body.name,
    amount1:req.body.amount1,
    amount2:req.body.amount2,
    amount3:req.body.amount3,
  };
  tableData[req.cookies.account].push(data);
  res.send({status:'ok',msg:'成功',data:{account:req.cookies.account,name:req.cookies.name,tableData:tableData[req.cookies.account]}})
});

app.get('/getMyData',(req,res)=>{
  if(req.cookies){
    res.send({status:'ok',msg:'成功',data:{account:req.cookies.account,name:req.cookies.name,tableData:tableData[req.cookies.account]}})
  }else{
    res.redirect('http://127.0.0.1:5173/#/login');
  }

});

app.get('/logout',(req,res)=>{
  res.clearCookie('account');
  res.clearCookie('name');
  res.redirect('http://127.0.0.1:5173/#/login');
  return;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





