<script setup>
import { ref, reactive } from 'vue'
const emit = defineEmits(['login', 'register','dilog']);
let centerDialogVisible = ref(false);

defineProps({
  isRegister: Boolean,
  show:Boolean,
  msg:String

})

const checkAccount = async (rule, value, callback)=>{
    const data = {
      account:value
    };

    const optionData = {
      body: JSON.stringify(data), 
      method: 'POST',
    };
  const checkAcount = await fetchData('http://127.0.0.1:5173/checkAccount',optionData);
  if(checkAcount.status !=='ok'){
    callback(new Error('帳號重複請重新輸入'));
  }

  //callback(new Error('帳號重複請重新輸入'));
}
// 表单元素
const dom = ref(null)
// 校验规则
const rules = {
      
  account: [
    {required: true, message: '請輸入帳號', trigger: 'blur' },
    {validator:checkAccount, trigger: 'blur'}
    ],
  name: [
    {required: true, message: '請輸入名字', trigger: 'blur' }
    ],
   pwd: [
        {required: true, message: '請輸入密碼', trigger: 'blur' },
        {min:3,max:10,message: '長度在3到10字元',trigger: 'blur'}
       ]
}
// 绑定数据
const form = reactive({
  name:'',
  account: '',
  pwd:''
})

// 测试方法
const onSubmit = () => {
      
  console.log('提交数据', form)
  // 开始校验
  dom.value.validate( async valid => {
    console.log('校验结果', valid)
   if (valid) {
         
      const data = {
        account:form.account,
        pwd:form.pwd,
        name:form.name
      };

      const optionData = {
        body: JSON.stringify(data), 
        method: 'POST',
      };

      const insertMemberData = await fetchData('http://127.0.0.1:5173/insertMember',optionData);
      if(insertMemberData.status==='ok'){
       //centerDialogVisible = ref(true);;
       emit('dilog',true)
        //emit('register',false);
      }
      console.log(insertMemberData);
      console.log('submit!')

    } else {
      console.log('error submit!')
      return false
    }
   
  })
}

const accept = ()=>{
    emit('dilog',false)
    window.location.href ='/#/login';
}
const login = ()=>{
    emit('register',false);
}
async function fetchData(url,option){
  option.headers =  {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  }
  const res = await fetch(url,option);
  return res.json();
}

</script>

<template >

<el-form ref="dom" :model="form" :rules="rules" :label-width="'15%'" >
<el-row :gutter="10">
    <el-col :span="10" :offset="12">註冊</el-col>
</el-row>
<el-row :justify="'center'" :align="'middle'"  >
      <el-col :lg="6" :xs="24">
          <el-form-item label="名字:" prop="name">
            <el-input v-model="form.name"   />
          </el-form-item>
      </el-col>
  </el-row>
  <el-row :justify="'center'" :align="'middle'"  >
      <el-col :lg="6" :xs="24">
          <el-form-item label="帳號:" prop="account">
            <el-input v-model="form.account"   />
          </el-form-item>
      </el-col>
  </el-row>
  <el-row :justify="'center'" :align="'middle'"  >
      <el-col :lg="6" :xs="24">
        <el-form-item label="密碼:" prop="pwd">
          <el-input v-model="form.pwd"  type="password" />
        </el-form-item>
      </el-col>
  </el-row>
  
    <el-form-item >
        <el-col :span="2" :offset="8"><el-button type="primary" @click="onSubmit">註冊</el-button></el-col>
        <el-col :span="11"><el-link type="primary" href="#/login">已有帳號，按此登入</el-link></el-col>
    </el-form-item>
      
</el-form>
<el-dialog v-model="show" title="提示框" width="30%" center>
    <span>註冊成功</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="accept">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
