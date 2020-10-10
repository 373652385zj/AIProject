<template>
    <div class="test3">
        <div class="title2">
            <h3>用户管理</h3>
        </div>
        <div class="aline"></div>
        <div class="cont1">
            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ 用户管理</Divider>

                <br>
                <br>
                <Table :loading="loading"  border :columns="columns12" :data="userDataArray"
                       style="width: 400px;margin-left: 20px;" v-cloak>
                    <template slot-scope="{ row }" slot="username">
                        <strong>{{ row.username }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="showEditUser(index)">修改
                        </Button>
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
            </div>
            <br>
            <Button type="primary" style="margin-left: 415px;" @click="showAddModal()">添加管理员</Button>
            <Modal @on-cancel="handleClear" :closable="false" title="新增管理员" v-model="showAdd" width="400">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80"
                      style="padding-right: 30px">
                    <FormItem label="账号" prop="addUsername">
                        <Input type="text" v-model="formCustom.addUsername"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="passwd">
                        <Input type="password" v-model="formCustom.passwd"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="passwdCheck">
                        <Input type="password" v-model="formCustom.passwdCheck"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
                    <Button @click="handleClear" style="margin-left: 8px">取消</Button>
                </div>
            </Modal>
            <Modal @on-cancel="handleClear" :closable="false" title="修改账号信息" v-model="showEdit" width="400">
                <Form ref="editFormCustom" :model="editFormCustom" :rules="ruleCustom" :label-width="80"
                      style="padding-right: 30px">
                    <FormItem label="账号" prop="editUsername">
                        <Input type="text" v-model="editFormCustom.editUsername"></Input>
                    </FormItem>
                    <FormItem label="旧密码" prop="oldPasswd">
                        <Input type="password" v-model="editFormCustom.oldPasswd"></Input>
                    </FormItem>
                    <FormItem label="新密码" prop="newPasswd">
                        <Input type="password" v-model="editFormCustom.newPasswd"></Input>
                    </FormItem>
                    <FormItem label="确认新密码" prop="newPasswdCheck">
                        <Input type="password" v-model="editFormCustom.newPasswdCheck"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="handleEdit('editFormCustom')">修改</Button>
                    <Button @click="handleClear" style="margin-left: 8px">取消</Button>
                </div>
            </Modal>
            <div class="word">
                <Divider orientation="left" style="font-weight: bold">▷ 登陆超时</Divider>
            </div>
            <div class="father">
                <label>超过时间(分钟)</label>
                    <Input prop="timeoutCheck" type="number" v-model="timeout" placeholder="请输入分钟" style="margin-right: 50px;width: 250px"/>
                <br>
                <br>

                <Button type="primary" style="margin-left: 390px;" @click="sumbitLoginTimeout()">保存</Button>

            </div>
        </div>
    </div>
</template>

<script>
    import http from "@/config/http";

    export default {
        data() {
            const validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    callback();
                }
            };
            const validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else {
                    if (this.editFormCustom.newPasswdCheck !== '') {
                        this.$refs.editFormCustom.validateField('newPasswdCheck');
                    }
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateNewPassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.editFormCustom.newPasswd) {
                    callback(new Error('两次密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateUsername = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            return {
                value11: '',
                columns12: [
                    {
                        title: '用户名',
                        slot: 'username',
                        width: 100
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: 150
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                userDataArray: [],
                formCustom: {
                    oldPasswd: '',
                    newPasswd: '',
                    passwd: '',
                    passwdCheck: '',
                    newPasswdCheck: '',
                    addUsername: ''
                },
                oldIndex: 0,
                editFormCustom: {
                    editUsername: '',
                    oldPasswd: '',
                    newPasswd: '',
                    newPasswdCheck: ''
                },
                ruleCustom: {
                    oldPasswd: [
                        {validator: validateOldPass, trigger: 'blur'}
                    ],
                    newPasswd: [
                        {validator: validateNewPass, trigger: 'blur'}
                    ],
                    passwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPasswdCheck: [
                        {validator: validateNewPassCheck, trigger: 'blur'}
                    ],
                    passwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ],
                    addUsername: [
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    editUsername: [
                        {validator: validateUsername, trigger: 'blur'}
                    ]
                },
                showAdd: false,
                showEdit: false,
                timeout: 5,
                loading: true
            }
        },
        methods: {
            getAllUserArray(){
                let url = this.selectAllUserUrl;
                let data = {};
                this.$curl.post(url, data).then(res => {
                    if (res.code == 200) {
                        this.userDataArray = res.data;
                        for (let i = 0; i < this.userDataArray.length; i++) {
                            this.userDataArray[i].type = this.userDataArray[i].type==0?"超级管理员":"管理员";
                        }
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.warning(err.msg);
                });
            },
            getLoginTimeout(){
                let url = this.selectLoginTimeoutUrl;
                let data = {};
                this.$curl.post(url, data).then(res => {
                    if (res.code === 200) {
                        this.timeout = res.data / 60;
                    } else {
                        this.$Message.warning(res.msg)
                    }
                }, err => {
                    this.$Message.error(err)
                })
            },
            showEditUser(index) {
                this.editFormCustom.editUsername = this.userDataArray[index].username;
                this.oldIndex = index;
                this.showEdit = true
            },
            remove(index) {
                let url = this.deleteUserUrl;
                let data = {username: this.userDataArray[index].username};
                this.$curl.post(url, data).then(res => {
                    if (res.code == 200) {
                        // this.userDataArray.splice(index, 1);
                        this.getAllUserArray();
                        this.$Message.success(res.msg);
                    } else {
                        this.$Message.warning(res.msg);
                    }
                }, err => {
                    this.$Message.error(err);
                });
            },
            showAddModal() {
                this.showAdd = true;
            },
            handleSubmit(formCustom) {
                this.$refs[formCustom].validate((valid) => {
                    if (valid) {
                        let url = this.addUserUrl;
                        let data = {
                            username: this.formCustom.addUsername,
                            password: this.formCustom.passwd
                        };
                        this.$curl.post(url, data).then(res => {
                            if (res.code == 200) {
                                // this.userDataArray.push({
                                //     username: this.formCustom.addUsername,
                                //     type: "管理员"
                                // });
                                this.getAllUserArray();
                                this.$Message.success(res.msg);
                                this.showAdd = false;
                                this.handleClear();
                            } else {
                                this.$Message.warning(res.msg);
                            }
                        }, err => {
                            this.$Message.error(err);
                        });

                    } else {
                        this.$Message.error('信息不完整!');
                    }
                })
            },
            handleEdit(formCustom) {
                this.$refs[formCustom].validate((valid) => {
                    if (valid) {
                        let url = this.editUserUrl;
                        let data = {
                            oldUsername: this.userDataArray[this.oldIndex].username,
                            oldPassword: this.editFormCustom.oldPasswd,
                            newUsername: this.editFormCustom.editUsername,
                            newPassword: this.editFormCustom.newPasswd
                        };
                        this.$curl.post(url, data).then(res => {
                            if (res.code == 200) {
                                // this.userDataArray[this.oldIndex].username = this.editFormCustom.editUsername;
                                this.getAllUserArray();
                                this.$Message.success(res.msg);
                                this.showEdit = false;
                                this.handleClear();
                            } else {
                                this.$Message.warning(res.msg);
                            }
                        }, err => {
                            this.$Message.error(err);
                        });
                    } else {
                        this.$Message.error('信息不完整!');
                    }
                });
            },
            sumbitLoginTimeout() {
                if (this.timeout < 5){
                    this.$Message.warning("超时时间最短不小于 5 分钟");
                    this.getLoginTimeout();
                    return ;
                }
                if (this.timeout > 1440){
                    this.$Message.warning("超时时间最长不超过 1440 分钟");
                    this.getLoginTimeout();
                    return ;
                }
                let url = this.updateLoginTimeoutUrl;
                let data = {timeout: parseInt(this.timeout)};
                this.$curl.post(url, data).then(res => {
                   if (res.code === 200) {
                       this.$Message.success(res.msg);
                       this.getLoginTimeout();
                   } else {
                       this.$Message.warning(res.msg)
                   }
                }, err => {
                    this.$Message.error(err)
                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleClear() {
                this.showEdit = false;
                this.showAdd = false;
                this.formCustom = {};
                this.editFormCustom = {};
            }
        },
        created() {
            let url = this.selectAllUserUrl;
            let data = {};
            this.$curl.post(url, data).then(res => {
                if (res.code === 200) {
                    this.userDataArray = res.data;
                    for (let i = 0; i < this.userDataArray.length; i++) {
                        this.userDataArray[i].type = this.userDataArray[i].type===0?"超级管理员":"管理员";
                    }
                    this.loading = false;
                } else {
                    this.$Message.warning(res.msg);
                }
            }, err => {
                this.$Message.error(err.msg);
            });

            url = this.selectLoginTimeoutUrl;
            data = {};
            this.$curl.post(url, data).then(res => {
                if (res.code == 200) {
                    this.timeout = res.data / 60;
                } else {
                    this.$Message.warning(res.msg)
                }
            }, err => {
                this.$Message.error(err)
            });
        },
        mixins: [http]
    }
</script>

<style type="text/css">
    [v-cloak] {
        display: none;
    }
</style>
