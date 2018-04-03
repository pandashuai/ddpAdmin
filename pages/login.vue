<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 填写用户名和密码时注意周围。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'login',
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let token = await this.$store.dispatch('login/auth/login', {user: this.ruleForm.username, password: this.ruleForm.password});
                        if(token){
                            this.$logc.cookie.set('ddp_token', token);
                            return this.$router.push('/');
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: absolute;
        width:100%;
        height:100%;
        left: 0;
        right: 0;
         background: #324157;
    }
    .ms-title{
        text-align: center;
        font-size:30px;
        color: #324157;
        margin-bottom: 15px;

    }
    .ms-login{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 215px;
        margin: -150px 0 0 -190px;
        padding: 15px 40px 40px 40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>