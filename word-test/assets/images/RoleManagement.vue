<template>
  <div class="role-management">
    <template>
      <!-- tabs分页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="main-pane" label="角色权限管理" name="first">
          <el-row :gutter="30">
            <el-col :span="6" class="main-pane-l">
              <div class="content">
                <div class="content-title">
                  <i class="q-icon"></i>广州科创空间信息科技有限公司
                </div>
                <div class="content-introduce">
                  <span class="mgr40">部门：6</span><span>角色：16</span>
                </div>
                <div class="department">
                  <el-collapse v-model="activeNames" @change="handleChange">
                    <div
                      class="collapse-par"
                      v-for="list in departmentData"
                      :key="list.id"
                    >
                      <el-collapse-item :name="list.name">
                        <template slot="title">
                          {{ list.name }}
                        </template>
                        <div
                          class="collapse-box"
                          v-for="item in list.children"
                          :key="item"
                        >
                          {{ item }}
                        </div>
                      </el-collapse-item>
                      <div class="collapse-edit-box">
                        <el-dropdown trigger="click" @command="handleCommand">
                          <span
                            :class="[
                              'el-dropdown-link',
                              { active: dropDownActiveName === list.name }
                            ]"
                            @click="linkClick(list.department)"
                          >
                            <i class="el-icon-more"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              icon="el-icon-edit-outline"
                              :command="{
                                parId: list.parent_id,
                                id: list.id,
                                action: 'edit',
                                name: list.name
                              }"
                              >编辑部门</el-dropdown-item
                            >
                            <el-dropdown-item
                              icon="el-icon-plus"
                              :command="{
                                id: list.id,
                                action: 'add',
                                supName: list.name
                              }"
                              >添加子部门</el-dropdown-item
                            >
                            <el-dropdown-item
                              icon="el-icon-close"
                              :command="{ id: list.id, action: 'del' }"
                              >删除部门</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                  </el-collapse>
                  <el-button size="medium" @click="addDepartmentDialog = true"
                    >添加部门</el-button
                  >
                </div>
              </div>
              <el-dialog
                :visible.sync="addDepartmentDialog"
                :center="true"
                @close="handleDialogClose('add-department-form')"
              >
                <div slot="title" class="dialog-title">
                  添加部门
                </div>
                <el-form :model="addDepartmentForm" ref="add-department-form">
                  <el-form-item
                    label="上级部门："
                    label-width="104px"
                    v-if="addDepartmentForm.parent_id"
                  >
                    <el-input
                      v-model="addDepartmentForm.supName"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="部门名称："
                    label-width="104px"
                    prop="name"
                  >
                    <el-input
                      v-model="addDepartmentForm.name"
                      placeholder="请输入部门名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="fix-footer-btn">
                    <el-button
                      class="cancel"
                      @click="handleDialogClose('add-department-form')"
                      >取消</el-button
                    >
                    <el-button
                      size="medium"
                      @click="branchHandle('add-department-form')"
                      >确认</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog>
              <!-- <el-dialog :visible.sync="addSubDepartmentDialog" :center="true">
                <div slot="title" class="dialog-title">
                  添加部门
                </div>
                <el-form :model="addSubDepartmentForm" ref="add-sub-department-form">
                  <el-form-item label="上级部门：" label-width="104px">
                    <el-input
                      v-model="addSubDepartmentForm.supName"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="部门名称：" label-width="104px">
                    <el-input
                      v-model="addSubDepartmentForm.name"
                      placeholder="请输入部门名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="" label-width="104px">
                    <el-button
                      class="cancel"
                      @click="addSubDepartmentDialog = false"
                      >取消</el-button
                    >
                    <el-button
                      size="medium"
                      @click="branchHandle('add-sub-department-form', 'add-sub')"
                      >确认</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog> -->
            </el-col>
            <el-col :span="18">
              <div class="m-table">
                <div class="table-tools" @click="changeShow">
                  <el-button size="medium" v-if="isShow === 'table'">
                    添加角色</el-button
                  >
                  <div v-else class="callback">
                    <i class="el-icon-back mgr5"></i>返回
                  </div>
                </div>
                <!-- table表格 -->
                <template v-if="isShow === 'table'">
                  <el-table
                    ref="multipleTable"
                    :data="roleManagement"
                    row-key="id"
                    style="width: 100%"
                    :default-sort="{ prop: 'id', order: 'ascending' }"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column
                      type="selection"
                      width="80"
                      label="全选"
                    ></el-table-column>
                    <el-table-column type="index" label="序号" width="60">
                    </el-table-column>
                    <el-table-column
                      label="角色名称"
                      width="150"
                      prop="name"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column
                      label="角色权限"
                      min-width="250"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <template v-for="list in scope.row.menus">
                          <template v-for="(item, index) in list">
                            <el-tag
                              size="mini"
                              :key="item.id"
                              :type="getTagType(index)"
                              >{{ item.name }}</el-tag
                            >
                          </template>
                        </template>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" min-width="200" align="left">
                      <template slot-scope="scope">
                        <el-button
                          @click="updateRoleMenu(scope.row.id)"
                          type="text"
                          >修改权限</el-button
                        >
                        <el-button type="text" @click="deleleRole(scope.row.id)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    background
                    layout="total, prev, pager, next"
                    @current-change="currentChange"
                    :page-size="pages.pageSize"
                    :total="pages.total"
                    prev-text="上一页"
                    next-text="下一页"
                  >
                  </el-pagination>
                </template>
                <template v-else>
                  <el-form :model="roleForm">
                    <el-form-item
                      class="fix-role-name"
                      label="角色名称："
                      label-width="104px"
                    >
                      <el-input
                        v-model="roleForm.name"
                        autocomplete="off"
                        placeholder="请输入新成员角色名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="部门：" label-width="104px">
                      <template>
                        <el-select
                          v-model="roleForm.value"
                          placeholder="请选择部门"
                        >
                          <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </template>
                    </el-form-item>
                    <el-form-item
                      class="fix-select"
                      label="权限菜单："
                      label-width="104px"
                    >
                      <template>
                        <el-checkbox-group
                          v-model="checkedMenu"
                          @change="handleCheckedCitiesChange"
                        >
                          <template v-for="menu in roleMenu">
                            <div class="fix-add-space" :key="menu.name">
                              <el-checkbox
                                :label="menu.name"
                                :key="menu.name"
                              ></el-checkbox>
                            </div>
                            <template>
                              <el-checkbox
                                v-for="item in menu.list"
                                :label="item"
                                :key="item"
                                >{{ item }}</el-checkbox
                              >
                            </template>
                          </template>
                        </el-checkbox-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="" label-width="104px">
                      <el-button
                        class="cancel"
                        @click="dialogFormVisible = false"
                        >取消</el-button
                      >
                      <el-button
                        size="medium"
                        @click="dialogFormVisible = false"
                        >确认</el-button
                      >
                    </el-form-item>
                  </el-form>
                </template>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
import Data from '@/utils/Data.js'
import {
  getBranchList,
  addBranch,
  deleteBranch,
  editBranch,
  getRoleList
} from '@/api/settings/role.js'
export default {
  data() {
    return {
      roleManagement: Data.roleManagement,
      isShow: 'table',
      activeName: 'first',
      addDepartmentDialog: false,
      addDepartmentForm: {
        id: '',
        name: '',
        parent_id: '',
        supName: '',
        action: ''
      },
      pages: {
        total: 100,
        pageSize: 10
      },
      dialogFormVisible: false,
      updateForm2: {
        name: '',
        value: ''
      },
      options1: [
        {
          value: '选项1',
          label: '产品部'
        },
        {
          value: '选项2',
          label: '开发部'
        }
      ],
      dialogFormVisible2: false,
      // 选中的表格行
      multipleSelection: [],
      // collapse
      activeNames: [],
      departmentData: [],
      dropDownActive: false,
      dropDownActiveName: '',
      // 添加角色表单
      checkedMenu: ['我的专利', '专利检索'],
      lastCheckedMenu: ['我的专利', '专利检索'],
      roleMenu: [
        {
          name: '专利',
          list: ['我的专利', '专利检索', '专利申请', '专利审查']
        },
        {
          name: '商标',
          list: ['我的商标', '商标检索', '商标申请', '商标审查']
        }
      ],
      roleForm: {
        name: '',
        checked: []
      }
    }
  },
  created() {
    this.getBranch()
    this.getRole()
  },
  computed: {
    roleMainMenu() {
      return this.roleMenu.map((item) => {
        return item.name
      })
    }
  },
  methods: {
    getRole() {
      getRoleList().then((res) => {
        console.log(res)
        if (res.code === 0 && res.data) {
          this.roleManagement = res.data
        }
      })
    },
    handleDialogClose(formName) {
      for (const key in this.addDepartmentForm) {
        this.addDepartmentForm[key] = ''
      }
      this.addDepartmentDialog = false
    },
    getBranch() {
      getBranchList().then((res) => {
        if (res.code === 0 && res.data) {
          console.log(res)
          this.departmentData = res.data
        }
      })
    },
    branchHandle(formName) {
      if (this.addDepartmentForm.action === 'edit') {
        editBranch({
          name: this.addDepartmentForm.name,
          id: this.addDepartmentForm.id
        }).then((res) => {
          console.log(res)
          if (res.code === 0 && res.data) {
          }
        })
      } else {
        addBranch({
          name: this.addDepartmentForm.name,
          parent_id: this.addDepartmentForm.parent_id
        }).then((res) => {
          console.log(res)
          if (res.code === 0 && res.data) {
            // 重新获取部门数据 调用关闭dialog函数
            this.getBranch()
            this.handleDialogClose(formName)
          }
        })
      }
    },
    handleClick() {},
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    currentChange(page) {
      console.log(page)
    },
    handleChange(val) {
      console.log(val)
    },
    deleleRole(id) {
      console.log('删除角色', id)
    },
    updateRoleMenu(id) {
      console.log('更新角色权限', id)
      this.isShow = 'form'
    },
    handleCommand(comData) {
      console.log(comData)
      if (comData.action === 'edit') {
        this.addDepartmentForm.action = 'edit'
        this.addDepartmentForm.id = comData.id
        this.addDepartmentForm.name = comData.name
        this.addDepartmentDialog = true
      } else if (comData.action === 'del') {
        deleteBranch(comData.id).then((res) => {
          console.log(res)
          if (res.code === 0 && res.data) {
            this.$message({
              message: '成功删除部门！',
              type: 'success'
            })
            this.getBranch()
          }
        })
      } else {
        this.addDepartmentForm.parent_id = comData.id
        this.addDepartmentForm.supName = comData.supName
        this.addDepartmentDialog = true
      }
    },
    linkClick(name) {
      // this.dropDownActiveName = name
      // console.log('linkClick')
      // console.log(this.dropDownActiveName)
      // this.addSubDepartmentForm.supName = name
    },
    getTagType(index) {
      const tagType = ['', 'success', 'info', 'warning', 'danger']
      const length = tagType.length
      return tagType[index % length]
    },
    changeShow() {
      this.isShow === 'table' ? (this.isShow = 'form') : (this.isShow = 'table')
    },
    setRoleMennu(type, key) {
      for (const item of this.roleMenu) {
        console.log(item)
        if (item.name === key) {
          console.log('有值')
          if (type === 'add') {
            for (const val of item.list) {
              if (!this.checkedMenu.includes(val)) {
                this.checkedMenu.push(val)
              }
            }
          } else {
            for (const val of item.list) {
              const index = this.checkedMenu.indexOf(val)
              index !== -1 && this.checkedMenu.splice(index, 1)
            }
          }
        }
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      console.log(this.lastCheckedMenu)
      console.log(this.roleMainMenu)
      const length = value.length
      const lastLength = this.lastCheckedMenu.length
      const isAdd = length > lastLength
      if (isAdd) {
        const addVaule = value.slice(length - 1)
        console.log('添加', addVaule)
        this.setRoleMennu('add', addVaule[0])
      } else {
        const removeValue = this.lastCheckedMenu.filter((item) => {
          return !this.checkedMenu.includes(item)
        })
        console.log('删除', removeValue)
        this.setRoleMennu('', removeValue[0])
      }
      this.lastCheckedMenu = value
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/styles/variables.scss';
// 通用样式
.el-tabs /deep/ {
  // tab-pane之间有间距
  margin-right: 20px;
  margin-bottom: 20px;
  // 文字居中限制
  .el-tabs__header {
    text-align: center;
    // 宽度
    .el-tabs__item {
      width: 120px;
      // 有下划线则不需要
      // padding-left: 0;
      // padding-right: 0;
    }
  }
  // 激活的文字
  .el-tabs__item.is-active {
    color: $c-one;
  }
  // tabs下划线
  .el-tabs__active-bar {
    background-color: $c-one;
  }
  // tabs缩进
  .el-tabs__nav-scroll {
    padding-left: 20px;
  }
  // 修改tab-pane文字大小
  .el-tabs__item {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }
  // tabs整个下划线
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
// 分页
.el-pagination /deep/ {
  margin: 30px 0px;
  text-align: center;
  .btn-next,
  .btn-prev {
    padding: 0 10px;
  }
}
// 表格
.el-table /deep/ {
  .has-gutter tr th {
    background-color: $c-four;
    font-weight: normal;
  }
  th {
    padding: 0;
    border: none;
    font-size: 12px;
    border-spacing: 0;
    > .cell {
      height: 37px;
      line-height: 37px;
    }
  }
  .has-gutter .el-checkbox__input:after {
    position: absolute;
    content: '全选';
    margin-left: 3px;
    margin-top: 1px;
    font-size: 12px;
    color: #909399;
  }
}
// 下拉菜单文字居中
.el-select-dropdown__item {
  text-align: center;
}
// dialog样式
.el-dialog__wrapper /deep/ {
  // 为了dialog居中
  text-align: center;
  .el-dialog {
    display: inline-block;
    width: auto;
    // 头部间隔
    .el-dialog__header {
      padding: 30px 0;
      font-size: 18px;
      // 关闭按钮
      .el-dialog__headerbtn {
        font-size: 18px;
      }
    }
    .el-dialog__body {
      padding: 0 20px 0;
      // form中form-item
      .el-form-item {
        margin-bottom: 20px;
        // form中label
        .el-form-item__label {
          padding: 0 20px 0 0;
        }
      }
      .el-input__inner {
        width: 376px;
        height: 38px;
        line-height: 38px;
        padding-left: 12px;
      }
      .fix-footer-btn {
        text-align: center;
      }
    }
  }
}
// 通用样式 end
.role-management /deep/ {
  overflow: hidden;
  background-color: $cf;
  .main-pane-l {
    padding-left: 15px;
  }
  // .main-pane-l content
  .content {
    position: relative;
    margin-left: 20px;
    padding-bottom: 228px;
    padding-left: 30px;
    border: 1px solid $ce;
    .el-button {
      position: absolute;
      bottom: 20px;
    }
    .content-title {
      line-height: 40px;
      color: $text-primary;
    }
    .content-introduce {
      padding-left: 30px;
      line-height: 30px;
      color: $text-regular;
    }
  }
}
.m-table /deep/ {
  .table-tools {
    margin-bottom: 15px;
  }
  .el-tag {
    margin-right: 4px;
    margin-bottom: 4px;
  }
  .fix-role-name {
    .el-input__inner {
      width: 222px;
    }
  }
  .fix-sup {
  }
  .fix-sub {
    padding-left: 2em;
  }
  // 返回按钮
  .callback {
    display: inline-block;
    font-size: 16px;
    line-height: 30px;
    color: #999;
    cursor: pointer;
  }
  .callback:hover {
    color: #333;
  }
}
.department /deep/ {
  // display: flex;
  padding-right: 60px;
  .collapse-par {
    position: relative;
  }
  .collapse-edit-box {
    position: absolute;
    top: 0;
    right: -20px;
  }
  .el-dropdown {
    width: 40px;
    height: 48px;
    text-align: center;
    line-height: 48px;
  }
  .el-dropdown-link {
    .el-icon-more {
      padding: 5px;
      border-radius: 5px;
      transform: rotate(90deg);
      color: #999;
    }
  }
  .el-dropdown-link:focus,
  .el-dropdown-link:hover {
    outline: none;
    .el-icon-more {
      color: #000;
    }
  }
}
.el-collapse /deep/ {
  border: none;
  .el-collapse-item__header {
    border-bottom: none;
    padding-left: 68px;
    color: $c9;
    &::before {
      content: '';
      position: absolute;
      margin-left: -38px;
      width: 16px;
      height: 16px;
      background-image: url('../../assets/images/settings/role-management.png');
    }
    &.is-active {
      color: #07bec5;
    }
    &.is-active::before {
      background-image: url('../../assets/images/settings/role-management-active.png');
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 35px;
    }
  }
  .el-collapse-item__header:hover {
    color: #666;
  }
  // 下拉盒子控制
  .el-collapse-item__content {
    padding-left: 68px;
    .collapse-box {
      color: $c9;
    }
  }
}
.q-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  line-height: 20px;
  background: url('../../assets/images/nav/enterprise-active.png');
}
.q-icon:before {
  content: '\3000';
}
.el-dialog__wrapper /deep/ {
  .el-dialog {
    .el-dialog__body {
      color: red;
      .fix-select {
        .el-form-item__content {
          width: 376px;
        }
      }
    }
  }
}
</style>
