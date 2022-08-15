<script setup>
import { ref, reactive } from 'vue'
const emit = defineEmits(['login', 'register','dilog','msg','index','name']);
defineProps({
  isLogin:Boolean,
  show:Boolean,
  msg:String
})

// 表单元素
const dom = ref(null)
const text = ref(null)
// 校验规则
const rules = {
      
  account: [
    {required: true, message: '請輸入帳號', trigger: 'blur' },
    ],
 
  pwd: [
      {required: true, message: '請輸入密碼', trigger: 'blur' },
    ]
}
// 绑定数据
const form = reactive({
  name:'',
  account: '',
  pwd:''
})
const register = ()=>{
  emit('login',false);
}
// 测试方法
const accept = ()=>{
  emit('dilog',false)
  //emit('index',true)
}
const onSubmit = () => {
      
  console.log('提交数据', form)
  // 开始校验
  dom.value.validate( async valid => {
    console.log('校验结果', valid)
   if (valid) {

      const data = {
        account:form.account,
        pwd:form.pwd,
      };

      const optionData = {
        body: JSON.stringify(data), 
        method: 'POST',
      };

      const memberData = await fetchData('http://127.0.0.1:5173/checkLogin',optionData);
      if(memberData.status==='ok'){
        emit('msg',memberData.msg)
        emit('dilog',true)
        emit('name',memberData.name);
        window.location.href = '/';
        dom.value.resetFields();
      }else{
        console.log(memberData);
       
       // console.log(text.value);
        // text.value.innerText = 'asdasd';
        emit('msg',memberData.msg)
        
        emit('dilog',true)
        
      }
      

    } else {
      console.log('error submit!')
      return false
    }
   
  })
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

<el-form ref="dom" :model="form" :rules="rules"  >
  <el-row :gutter="10">
    <el-col :span="10" :offset="12">登入</el-col>
  </el-row>
  <el-row>
      <el-col :span="6" :offset="9" >
          <el-form-item label="帳號:" prop="account">
            <el-input v-model="form.account"   />
          </el-form-item>
      </el-col>
  </el-row>
  <el-row>
      <el-col :span="6" :offset="9">
        <el-form-item label="密碼:" prop="pwd">
          <el-input v-model="form.pwd"  type="password" />
        </el-form-item>
      </el-col>
  </el-row>
    <el-form-item >
      
        <el-col :span="2" :offset="10"><el-button type="primary" @click="onSubmit">登入</el-button></el-col>
        <el-col :span="11"><el-link type="primary" href="#/register">還沒有帳號? 註冊</el-link></el-col>

    </el-form-item>
</el-form>
<el-dialog v-model="show" title="提示框" width="30%" center>
    <span ref="text">{{msg}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="accept">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
