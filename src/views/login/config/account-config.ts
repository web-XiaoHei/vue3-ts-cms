// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名必传',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必传',
      trigger: 'blur',
    },
    {
      // pattern:
      //   /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
      // message:
      //   '密码最少6位,包括至少1个大写字母,1个小写字母,1个数字,1个特殊字符',
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur',
    },
  ],
};
