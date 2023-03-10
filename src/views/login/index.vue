<!--
 * @LastEditTime: 2023-03-10 16:51:45
 * @Descripttion: 
-->
<template>
  <div id="login">
    <el-form ref="ruleFormRef" label-position="right" label-width="100px" :model="loginForm" style="max-width: 460px" status-icon :rules="rules">
      <el-form-item label="账号" prop="accout">
        <el-input v-model="loginForm.accout" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { doLogin } from '@/apis/user';
import { useUserStore } from '@/stores/index';
import { useRouter } from 'vue-router';
const loginForm = reactive({
  accout: '',
  password: '',
  type: '',
});
const userStore = useUserStore();
console.log(userStore);

const router = useRouter();
//#region 校验
const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  accout: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
});
//#endregion

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      doLogin(loginForm.accout, loginForm.password).then(
        (result) => {
          const { data, message, success } = result;
          if (!success) {
            return;
          }
          if (data.userInfo) {
            userStore.$patch({
              name: data.userInfo.name,
              userId: data.userInfo.userId,
              roleIdStr: data.userInfo.roleIdStr,
              headerImgUrl: data.userInfo.headerImgUrl,
              token: data.accessToken || null,
              expiresIn: data.expiresIn,
            });
            router.push({ name: 'home' });
          }
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>
<style lang="less" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
