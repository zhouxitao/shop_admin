// import axios from 'axios'
export default {
  data () {
    return {
      userData: [{
        username: '王小虎',
        mobile: '13512341234',
        email: '123456@qq.com'
      }],
      // total
      total: 0,
      // 当前页
      pagenum: 1,
      // 3-1搜索用户
      searchUser: '',
      // 新增用户名显示状态
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 新增用户校验规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名长度在3-5个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '用户名长度在6-12个字符之间', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]
      },
      value1: true
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 1-获取全部数据
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.total = res.data.data.total
          this.userData = res.data.data.users
          this.pagenum = res.data.data.pagenum
        }
      })
    },
    // 2-当前页改变，翻页
    changeCurrentPage (curpage) {
      // console.log(curpage)
      this.getUsersData(curpage, this.searchUser)
    },
    // 3-搜索框
    search () {
      // console.log(this.searchUser)
      this.getUsersData(1, this.searchUser)
    },
    // 4-显示对话窗口
    showAddUser () {
      this.dialogAddUserVisible = true
    },
    // 5-添加用户
    addUser () {
      this.$axios.post('users', this.addUserForm, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        if (res.data.meta.status === 401) {
          this.$message({
            message: '错误的token令牌',
            type: 'error',
            duration: 800
          })
        } else if (res.data.meta.status === 201) {
          this.dialogAddUserVisible = false
          this.$message({
            message: '恭喜你！添加成功',
            type: 'success',
            duration: 800
          })
          // 页面刷新一次
          this.getUsersData(1)
        }
      })
    },
    // 6-关闭对话框，清空内容
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 7-修改状态，change方法为开关自带
    changeState (row) {
      console.log(row)
      let id = row.id
      let state = row.mg_state
      this.$axios
        .put(`users/${id}/state/${state}`, null, {
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        }).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '设置成功',
              type: 'success',
              duration: 800
            })
          }
        })
    },
    // 8-删除单个列表
    delUser (id) {
      console.log(id)

      this.$axios.delete(`users/${id}`, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
        }
        this.getUsersData(1, this.searchUser)
      })
    }
  }
}
