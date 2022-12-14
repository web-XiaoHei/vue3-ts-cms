export const modelConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
    },
    {
      field: 'password',
      type: 'input',
      label: '密码',
      placeholder: '请输入密码',
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
    },
  ],
  colLayout: {
    span: 24,
  },
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px',
  },
};
