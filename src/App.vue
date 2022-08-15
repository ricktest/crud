<template>
    
    <!-- <Register :isRegister="isRegister"  :show="show" @register="register" @dilog="dilog"/>
    <Login :isLogin="isLogin" :msg="msgText" :show="show2" @login="login" @dilog="loginDilog" @msg="msg" @index="index" @name="getName"/> -->
    <router-view name="login" :msg="msgText" :show="show2" @login="login" @dilog="loginDilog" @msg="msg" @index="index" @name="getName">
    </router-view>
    <router-view name="register" :msg="msgText" :show="show2" @login="login" @dilog="loginDilog" >
    </router-view>
    <router-view name="Index"  :name="name" >
    </router-view>
   
    
  <!-- <el-table :data="tableData" border show-summary style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="amount1" sortable label="Amount 1" />
    <el-table-column prop="amount2" sortable label="Amount 2" />
    <el-table-column prop="amount3" sortable label="Amount 3" />
  </el-table> -->
    
</template>

<script>
import Register from './components/Register.vue';
import Login from './components/Login.vue';

export default {
  data () {
  
    return {
      isRegister:true,
      isLogin:false,
      show:false ,
      show2:false,
      indexPage:false,
      msgText:'',
      name:'',
    }
  },
  components: { Register,Login },
  methods:{
    register(){
      this.isLogin =true;
      this.isRegister = false;
       
    },
    dilog(show){
      this.show =show;
     
    },
    loginDilog(show){
      this.show2 = show;
    },
    login(){
      this.isLogin =false;
      this.isRegister = true;
    },
    msg(msg){
      console.log(msg);
      this.msgText = msg;
    },
    index(){
      this.isLogin = false;
      this.indexPage =true;
    },
    getName(name){
      
      this.name = name;
    },
   
    logout(){
       this.indexPage =false;
       this.isLogin = true;
    },

  },
  async created() {
      // const checkLogin = await this.fetchData('http://127.0.0.1:5173/getMyData',{});
      // console.log(checkLogin);
      // if(Object.keys(checkLogin.data).length===0){
        
      // }
  },
 
}
</script>

<style lang="scss" scoped>

</style>