(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-994a13e8"],{"7bec":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("a-navigation",{attrs:{list:[{name:t.$t("Список пользователей"),link:""}],isBack:{flag:!1,link:""}}},[s("a-button",{staticStyle:{float:"right"},attrs:{type:"primary",icon:"plus"},on:{click:function(e){return t.$router.push("/system/system-users/new-user")}}},[t._v("Создать пользователь")])],1),s("a-card",[s("a-row",[s("a-col",{attrs:{span:"auto"}},[s("a-table",{attrs:{loading:t.loading,columns:t.columns,"data-source":t.sysUser,pagination:t.pagination},on:{change:t.getPagination},scopedSlots:t._u([{key:"name",fn:function(e){return s("span",{},[s("a-row",{attrs:{type:"flex",gutter:16}},[s("a-col",{attrs:{type:"flex",span:"auto"}},[s("a-avatar",{attrs:{size:50},domProps:{textContent:t._s(e.name.substring(0,1).toUpperCase())}})],1),s("a-col",{attrs:{type:"flex",span:"auto"}},[s("h3",[t._v(t._s(e.name))]),s("a-tag",{attrs:{color:"green"}},[t._v(t._s(e.phone))])],1)],1)],1)}},{key:"created_at",fn:function(e){return s("span",{},[t._v(t._s(t._f("moment")(t.$date(e.created_at),t.$dateTimeFormat)))])}},{key:"action",fn:function(e){return s("span",{},[s("a-col",{attrs:{span:"auto"}},[s("a-row",{attrs:{type:"flex",gutter:[8]}},[s("a-col",{attrs:{span:"auto"}},[s("delete-btn",{on:{confirm:function(s){return t.deleteSystemUser(e.id)}}})],1),s("a-col",{attrs:{span:"auto"}},[s("edit-btn",{on:{click:function(s){return t.$router.push("/system/system-users/"+e.id)}}})],1),s("a-col",{attrs:{span:"auto"}},[s("icon-btn",{attrs:{icon:"lock",tooltip:t.$t("button.preview")},on:{click:function(s){return t.setupPassword(e)}}})],1)],1)],1)],1)}}],null,!0)})],1)],1)],1)],1)},a=[],r=s("5530"),o=(s("d81d"),{data:function(){return{loading:!1,sysUser:[],pagination:{current:1,showQuickJumper:!0},columns:[{title:"Системный пользователь",key:"name",scopedSlots:{customRender:"name"}},{title:this.$t("table.created_at"),key:"created_at",scopedSlots:{customRender:"created_at"}},{title:this.$t("table.actions"),key:"action",scopedSlots:{customRender:"action"}}]}},methods:{getPagination:function(t){this.$router.push({path:this.$route.fullPath,query:{page:t.current,limit:10}}),this.getSystemUsers(this.$route.query),this.pagination.current=t.current},setupPassword:function(t){},getSystemUsers:function(t){var e=this;this.loading=!0,this.$store.dispatch("getSystemUsers",t).then((function(t){e.loading=!1,e.sysUser=t.system_users.map((function(t){return Object(r["a"])(Object(r["a"])({},t),{},{key:t.id})})),e.pagination=Object(r["a"])(Object(r["a"])({},e.pagination),{},{total:parseInt(t.count)})}))},deleteSystemUser:function(t){var e=this;this.$store.dispatch("deleteSystemUser",t).then((function(s){e.$deleteFromList(e.sysUser,t),e.$alertMessage("success","Deleted","System user deleted successfully",e)}))}},created:function(){this.getSystemUsers(this.$route.query),this.pagination.current=parseInt(this.$route.query.page)||1}}),i=o,c=(s("c966"),s("2877")),u=Object(c["a"])(i,n,a,!1,null,"6dcd01b3",null);e["default"]=u.exports},c966:function(t,e,s){"use strict";s("cdcd")},cdcd:function(t,e,s){}}]);