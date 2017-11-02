<template>
    <div class="login-container">
        <Modal v-model="dialogVisible"
               :mask-closable="false"
               :closable="false">
            <h3 slot="header" style="text-align: center">登录</h3>
            <i-form ref="model" :model="model" :rules="ruleValidate" :label-width="70">
                <Form-item label="用户名" prop="username">
                    <i-input type="text" v-model="model.username" placeholder="请输入用户名"></i-input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <i-input type="password" v-model="model.password" placeholder="请输入密码"></i-input>
                </Form-item>
                <i-button type="primary" long @click="login" :loading="isLoading">登录</i-button>
            </i-form>
            <template slot="footer"></template>
        </Modal>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                dialogVisible: true,
                isLoading: false,
                model: {
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        created: function () {
        },
        methods: {
            login(){
                let self = this;
                self.$refs['model'].validate((valid) => {
                    if (valid){
                        console.log('表单验证通过');
                        self.isLoading = true;
                        axios.post('api/auth/login', {
                            username: self.model.username,
                            password: self.model.password
                        }).then(response => {
                            self.isLoading = false;
                            console.log(response);
                            window.uploadHeaders.Authorization = window.axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                            self.model.dialogVisible = false;
                            self.$store.dispatch('fetchUser');
                            self.$store.dispatch('fetchUserPermissions');
                            self.$router.push(self.$store.state.authRedirectUrl);
                        }).catch(error => {
                            self.isLoading = false;
                            console.log(error);
                            self.$Notice.error({
                                title: '错误',
                                desc: error
                            });
                        })
                    }else{
                        console.log('表单验证失败');
                    }
                })
            }
        }
    }
</script>