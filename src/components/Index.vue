<template>

    <el-row>
      <el-container >
        <el-header >
          <el-row :justify="'center'" :align="'middle'"  >
          
            <el-col :lg="6" :xs="24" >
              <div ref="name"></div>
            </el-col>
            <el-button type="primary" @click="logout">登出</el-button>
          </el-row>
        </el-header>
        <el-main>
            <el-table :data="table2" border show-summary style="width: 100%">
                <el-table-column prop="date" label="date" width="180" 
                column-key="date"
                :filters="filters"
                :filter-method="filterHandler"
                />
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="amount1" sortable label="Amount 1" />
                <el-table-column prop="amount2" sortable label="Amount 2" />
                <el-table-column prop="amount3" sortable label="Amount 3" />
                <el-table-column label="Operations">
                    <template #default="scope">
                        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>  
        </el-main>
              <el-form
   ref="dom" :model="formLabelAlign" :rules="rules"
    label-width="100px"
 
    style="max-width: 460px"
  >
    <el-form-item label="date" prop="date">
      <el-input  v-model="formLabelAlign.date" />
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input  v-model="formLabelAlign.name"/>
    </el-form-item>
    <el-form-item label="Amount 1" prop="amount1">
      <el-input  v-model="formLabelAlign.amount1"/>
    </el-form-item>
    <el-form-item label="Amount 2" prop="amount2">
      <el-input  v-model="formLabelAlign.amount2"/>
    </el-form-item>
    <el-form-item label="Amount 3" prop="amount3">
      <el-input  v-model="formLabelAlign.amount3"/>
    </el-form-item>
  </el-form>
  <el-button style="max-width: 460px" class="mt-4"  @click="onAddItem">Add Item</el-button>
      </el-container>

    </el-row>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    data () {
        const formLabelAlign = reactive({
            date: '',
            name: '',
            amount1: '',
            amount2: '',
            amount3: '',
        });
        const rules = {
      
            date: [
                {required: true, message: '請輸入日期', trigger: 'blur' },
                ],
            
            name: [
                {required: true, message: '請輸入名字', trigger: 'blur' },
                ],
            amount1: [
                {required: true, message: '請輸入amount1', trigger: 'blur' },
                ],
            amount2: [
                {required: true, message: '請輸入amount2', trigger: 'blur' },
                ],
            amount3: [
                {required: true, message: '請輸入amount3', trigger: 'blur' },
                ]
        }

        return {
            name:'',
            table2:[],
            filters:[
                { text: '2022/07', value: '2022/07' },
                { text: '2022/08', value: '2022/08' },
                { text: '2022/09', value: '2022/09' },
                { text: '2022/10', value: '2022/10' },
            ],
            formLabelAlign,
            rules
        }
    },
    psops:{
        tableData:Array
    },
   
    methods:{

        logout(){
            window.location.href = 'http://127.0.0.1:5173/logout';
        },
       
        async fetchData(url,option){
            option.headers =  {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            }
            const res = await fetch(url,option);
            return res.json();
        },
        filterHandler(value,row,column){
            //console.log(row.date);
            const property = column['property']
            return row[property] === value
        },
        handleEdit (index,row){
            console.log(index,row);
        },
        async handleDelete (index,row){
            
            const index2 = this.table2.findIndex((el)=>el.id===row.id);
            const optionData = {
                body: JSON.stringify({index:index2}), 
                method: 'POST',
            };
            const tableData = await this.fetchData('http://127.0.0.1:5173/deleteItem',optionData);
            this.table2 = tableData.data.tableData;
            console.log(tableData);
        },
        onAddItem (){

            this.$refs.dom.validate( async valid => {
                //console.log('校验结果', valid)
                //console.log(this.formLabelAlign);
                if(valid){
                    const data = {
                        date:this.formLabelAlign.date,
                        name:this.formLabelAlign.name,
                        amount1:this.formLabelAlign.amount1,
                        amount2:this.formLabelAlign.amount2,
                        amount3:this.formLabelAlign.amount3,
                    };

                    const optionData = {
                        body: JSON.stringify(data), 
                        method: 'POST',
                    };
                    const addItems = await this.fetchData('http://127.0.0.1:5173/addItem',optionData);
                    this.table2 = addItems.data.tableData;
                    console.log(addItems);
                }
               
            });
            
            //  this.table2.push({
            //     date: '',
            //     name: 'Tom',
            //     state: 'California',
            //     city: 'Los Angeles',
            //     address: 'No. 189, Grove St, Los Angeles',
            //     zip: 'CA 90036',
            // })
        },
       
    },
    async mounted(){
        const checkLogin = await this.fetchData('http://127.0.0.1:5173/getMyData',{});
        
        if(Object.keys(checkLogin.data).length===0){
            window.location.href = '/#/login';
        }else{
            this.name = checkLogin.data.name;
            this.$refs.name.innerHTML = this.name+'，你好';
            this.table2 = checkLogin.data.tableData;
            
        }
    },
   
}
</script>

<style lang="scss" scoped>

</style>