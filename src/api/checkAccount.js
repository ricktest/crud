import  {member,tableData}  from './memberData.js'

const checkAccount =(req, res)=>{
    const accountData = member.find(element => element.account === req.body.account);
    if(accountData){
        res.send({status:'001',msg:'已有相同帳號',});
        return;
    }
    res.send({status:'ok',msg:'成功'})
    return;
}

const insertMember = (req, res)=>{
    const accountData = member.find(element => element.account === req.body.account);
    if(accountData){
        res.send({status:'001',msg:'已有相同帳號',});
        return;
    }
    let data = {
        account:req.body.account,
        pwd:req.body.pwd,
        name:req.body.name,
    };
    let str = req.body.account;
  
    tableData[req.body.account] = [];
    member.push(data);
    console.log(member);
    res.send({status:'ok',msg:'成功'})
    return;
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
const checkLogin = (req, res)=>{
    const accountData = member.find(element => element.account === req.body.account);
    if(accountData && accountData.pwd === req.body.pwd){
        
        accountData.isLogin = true;
        res.cookie('account', accountData.account);
        res.cookie('name', accountData.name);
        res.send({status:'ok',msg:'登入成功',data:accountData});

        return;
    }
    res.send({status:'002',msg:'帳號密碼錯誤',});
    return;
}
export  {checkAccount,insertMember,checkLogin};