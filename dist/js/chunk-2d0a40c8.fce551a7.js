(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a40c8"],{"057d":function(t,n,e){"use strict";e.r(n);var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("a-navigation",{attrs:{list:[{name:t.$t("Accounts"),link:""},{name:t.$t("accountGroups"),link:""}],isBack:{flag:!1,link:""}}}),e("a-card",[e("a-table",{attrs:{bordered:"",columns:t.columns,pagination:t.accountGroupsPagination,"data-source":t.account_groups,loading:t.loading,"row-key":function(t){return t.guid}},on:{change:t.getAccountGroups},scopedSlots:t._u([{key:"created_at",fn:function(n){return e("span",{},[t._v(" "+t._s(t._f("moment")(n.created_at,t.$dateFormat)))])}},{key:"actions",fn:function(n){return e("span",{staticClass:"span"},[e("delete-btn",{on:{confirm:function(e){return t.deleteMerchantUsers(n)}}}),e("edit-btn",{on:{click:function(e){return t.$router.push({name:"edit-merchant",params:{id:n.guid}})}}})],1)}}])})],1)],1)},o=[],a=e("5530"),i=(e("d3b7"),e("a434"),e("c740"),e("5880")),s={data:function(){return{loading:!1,columns:[{title:this.$t("created_at"),scopedSlots:{customRender:"created_at"},key:"created_at",customCell:this.onRowClick},{title:this.$t("Name"),dataIndex:"name",key:"name",customCell:this.onRowClick},{title:this.$t("Description"),dataIndex:"description",key:"description",customCell:this.onRowClick}],account_groups:[]}},computed:Object(a["a"])({},Object(i["mapGetters"])(["accountGroupsPagination"])),methods:{onRowClick:function(t,n){return{on:{click:function(t){}}}},getAccountGroups:function(t){var n=this;this.loading=!0;var e={pagination:t};this.$store.dispatch("getAccountGroups",e).then((function(t){n.account_groups=t.account_groups})).finally((function(){n.loading=!1}))},deleteMerchantUsers:function(t){var n=this;this.$store.dispatch("deleteMerchantUsers",t.guid).then((function(e){n.account_groups.splice(n.account_groups.findIndex((function(n){return n.guid===t.guid})),1),n.$message.success("Merchant deleted successfully")}))}},mounted:function(){var t={current:1,pageSize:10};this.getAccountGroups(t)}},u=s,r=e("2877"),d=Object(r["a"])(u,c,o,!1,null,null,null);n["default"]=d.exports}}]);