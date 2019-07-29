<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='2'
      @current-change='changeCurrentPage'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [{ username: '王小虎',
        mobile: '13512341234',
        email: '123456@qq.com'
      }],
      // total
      total: 0,
      // 当前页
      pagenum: 1
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.total = res.data.data.total
          this.tableData = res.data.data.users
          this.pagenum = res.data.data.pagenum
        }
      })
    },
    changeCurrentPage (curpage) {
      console.log(curpage)
      this.getUsersData(curpage)
    }
  }
}
</script>

<style>
</style>
