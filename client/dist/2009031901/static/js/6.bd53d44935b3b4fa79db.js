(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/x4J":function(e,t,o){"use strict";var i=o("wX1l");o.n(i).a},RRhU:function(e,t,o){"use strict";o.r(t),o("KEZ+"),o("oYx3");var i={name:"roleManage",data:function(){return{tableData:[],dialogFormVisible:!1,dialogFormVisible2:!1,form:{name:"",describe:"",status:!0,permission:[]},formLabelWidth:"120px",defaultProps:{children:"children",label:"name",id:"name"},selectRoleId:"",selectData:[],filterText:""}},methods:{handleEdit:function(e,t){for(var o in t)this.form[o]=t[o];this.form.status="启用"===t.status,this.dialogFormVisible=!0},addRole:function(){this.form={name:"",describe:"",status:!0},this.dialogFormVisible=!0},addRoleSubmit:function(){var e=this,t=this;if(!this.form.name)return t.$message({showClose:!0,message:"角色名称不能为空",type:"error"}),!1;this.$request.fetchAddRole(this.form).then((function(o){t.$message({showClose:!0,message:o.data.message,type:"success"}),e.dialogFormVisible=!1,e.getList()})).catch((function(e){console.log(e)}))},rolePermissionSubmit:function(){var e=this,t={selectPermission:e.$refs.permission.getCheckedKeys(),rid:e.selectRoleId};this.$request.fetchRolePermissions(t).then((function(t){e.$restBack(t.data,(function(){e.dialogFormVisible2=!1,e.getList()}))})).catch((function(e){console.log(e)}))},roleEdit:function(e,t){console.log(e,t),this.selectRoleId=t.id,this.selectData=t.permission?t.permission.split(","):[],this.dialogFormVisible2=!0},setRoleData:function(){var e=this;this.$request.fetchSearchRolePermissions({rid:this.selectRoleId}).then((function(t){e.$refs.permission.setCheckedKeys([]);var o=t.data.data.permissionPage+","+t.data.data.permissionButton;e.$refs.permission.setCheckedKeys(o.split(","))}))},handleDelete:function(e,t){var o=this;this.$request.fetchDelRole({id:t.id}).then((function(e){console.log(e),o.$message({showClose:!0,message:e.data.message,type:"success"}),o.getList()})).catch((function(e){console.log(e)}))},getList:function(){var e=this;this.$request.fetchGetRoleList().then((function(t){console.log(t);for(var o=0;o<t.data.rows.length;o++)t.data.rows[o].status?t.data.rows[o].status="启用":t.data.rows[o].status="禁用";e.tableData=t.data.rows})).catch((function(e){console.log(e)}))},filterNode:function(e,t){return!e||-1!==t.name.indexOf(e)}},watch:{filterText:function(e){this.$refs.permission.filter(e)}},computed:{roleTree:function(){for(var e=this.$store.getters.roleData,t=0;t<e.length;t++)"/404"===e[t].redirect&&e.splice(t,1);return e}},mounted:function(){this.getList()}},s=(o("/x4J"),o("KHd+")),l=Object(s.a)(i,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"cardshadow roleListTable"},[o("div",[o("el-button",{directives:[{name:"role-btn",rawName:"v-role-btn",value:"btn_100002",expression:"'btn_100002'"}],attrs:{type:"primary",icon:"el-icon-circle-plus-outline",size:"mini",plain:""},on:{click:e.addRole}},[e._v("新增")])],1),e._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[o("el-table-column",{attrs:{type:"index"}}),e._v(" "),o("el-table-column",{attrs:{property:"name",label:"角色名"}}),e._v(" "),o("el-table-column",{attrs:{property:"describe",label:"角色描述"}}),e._v(" "),o("el-table-column",{attrs:{prop:"status",label:"状态","filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{attrs:{type:"启用"===t.row.status?"primary":"danger","disable-transitions":""}},[e._v(e._s(t.row.status)+"\n        ")])]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"mini",disabled:"超级管理员"==t.row.name},on:{click:function(o){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n        ")]),e._v(" "),o("el-button",{attrs:{size:"mini",disabled:"超级管理员"==t.row.name},on:{click:function(o){return e.roleEdit(t.$index,t.row)}}},[e._v("权限分配\n        ")]),e._v(" "),o("el-button",{attrs:{size:"mini",type:"danger",disabled:"超级管理员"==t.row.name},on:{click:function(o){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),o("el-dialog",{staticClass:"dialog1",attrs:{title:"角色信息",width:"700px",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{attrs:{model:e.form}},[o("el-form-item",{attrs:{label:"角色名称","label-width":e.formLabelWidth}},[o("el-input",{attrs:{maxlength:"8","show-word-limit":"",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"角色描述","label-width":e.formLabelWidth}},[o("el-input",{attrs:{maxlength:"15","show-word-limit":"",autocomplete:"off"},model:{value:e.form.describe,callback:function(t){e.$set(e.form,"describe",t)},expression:"form.describe"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"是否开启","label-width":e.formLabelWidth}},[o("el-switch",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.addRoleSubmit}},[e._v("确 定")])],1)],1),e._v(" "),o("el-dialog",{staticClass:"dialog2",attrs:{title:"权限分配",visible:e.dialogFormVisible2},on:{opened:e.setRoleData,"update:visible":function(t){e.dialogFormVisible2=t}}},[o("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),o("el-tree",{ref:"permission",attrs:{data:e.roleTree,"node-key":"name","show-checkbox":"","check-on-click-node":"","default-expand-all":"","check-strictly":"","expand-on-click-node":!1,"filter-node-method":e.filterNode,props:e.defaultProps}}),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.rolePermissionSubmit}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,"2e9b487e",null);t.default=l.exports},wX1l:function(e,t,o){}}]);
//# sourceMappingURL=6.bd53d44935b3b4fa79db.js.map