(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5018dfee"],{"106c":function(t,n,e){"use strict";e("e978")},"69ef":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("a-navigation",{attrs:{list:[{name:t.$t("Константы")}],isBack:{flag:!1,link:"/installments"},noBorder:""}},[e("a-button",{staticStyle:{float:"right"},attrs:{type:"primary",icon:"plus"},on:{click:function(n){return t.$router.push("/settings/constants/list/new")}}},[t._v(t._s(t.$t("button.create")))])],1),e("a-card",{staticClass:"no-space-tab"},[e("a-card",[e("a-table",{attrs:{columns:t.columns,"data-source":t.constants,"row-key":function(t){return t.guid},pagination:t.pagination,loading:t.spinning,bordered:"",rowClassName:function(t){return"done"===t.status?"table-row-green":""}},on:{change:t.getPagination},scopedSlots:t._u([{key:"customer.birthday",fn:function(n){return e("span",{},[t._v(" "+t._s(t._f("moment")(n.customer.birthday,t.$dateFormat))+" ")])}},{key:"created_at",fn:function(n){return e("span",{},[t._v(" "+t._s(t._f("moment")(n.created_at,t.$dateTimeFormat))+" ")])}},{key:"pos_agent",fn:function(n){return e("span",{},[t._v(" "+t._s(n.pos_agent.first_name+" "+n.pos_agent.last_name)+" "),e("br"),t._v(" "+t._s(n.pos_agent.phone_number)+" ")])}},{key:"merchant_branch",fn:function(n){return e("span",{},[t._v(" "+t._s(n.merchant.merchant.name+" /  "+n.merchant.merchant_branch.name)+" ")])}},{key:"contract_number",fn:function(n){return e("span",{},[t._v(" "+t._s(n.contract_number.slice(3))+" ")])}},{key:"amount_per_month",fn:function(n){return e("span",{},[t._v(" "+t._s(t.$moneyFormat(n.amount_per_month))+" ")])}},{key:"installment_amount",fn:function(n){return e("span",{},[t._v(" "+t._s(t.$moneyFormat(n.installment_amount))+" ")])}},{key:"status",fn:function(n){return e("span",{},[e("a-tag",{attrs:{color:t.getStatusColor(n.status)}},[t._v(t._s("done"===n.status?"Проверено":t.$t(n.status)))])],1)}},{key:"scoring_status",fn:function(n){return e("span",{},[e("a-tag",{attrs:{color:t.getStatusColor(n.scoring_status)}},[t._v(t._s(n.scoring_status))])],1)}},{key:"actions",fn:function(n){return e("span",{},[e("delete-btn",{on:{confirm:function(e){return t.deleteConstant(n)}}})],1)}}])})],1)],1)],1)},s=[],r=e("5530"),o=(e("d3b7"),{data:function(){return{spinning:!1,vis:!1,rules:{date:[{required:!0,message:"Пожалуйста, введите дату",trigger:"blur"}]},pagination:{current:1,showQuickJumper:!0},constants:[],columns:[{title:this.$t("Created_at"),scopedSlots:{customRender:"created_at"},key:"created_at",customCell:this.onRowCLickFunc},{title:this.$t("name"),dataIndex:"name",key:"name",customCell:this.onRowCLickFunc},{title:this.$t("key"),dataIndex:"data.key",key:"key",customCell:this.onRowCLickFunc},{title:this.$t("value"),dataIndex:"data.value",key:"value",customCell:this.onRowCLickFunc}]}},watch:{"$route.query":{handler:function(){var t=null;this.$isEmptyObj(this.$route.query)?t={limit:10,page:1}:(t=this.$route.query,this.pagination.current=parseInt(this.$route.query.page)),this.getConstants(t)}}},methods:{onRowCLickFunc:function(t,n){var e=this;return{on:{click:function(n){e.$router.push({name:"settings-constants-list-update",params:{id:t.id}})}}}},getStatusColor:function(t){var n;switch(t){case"closed":n="cyan";break;case"done":n="green";break;case"reject":n="red";break;case"new":n="green";break;case"pending":n="orange";break;case"passed":n="#87d068";break;case"not-passed":n="red";break;case"accept_by_customer":n="purple";break;case"scoring_failed":n="red";break;default:n=""}return n},getPagination:function(t){this.$router.push({path:this.$router.fullPath,query:Object(r["a"])(Object(r["a"])({},this.$route.query),{},{page:t.current})}),this.pagination.current=t.current},getConstants:function(t){var n=this;this.spinning=!0,this.$store.dispatch("getConstants",t).then((function(t){n.constants=t.constants||[];var e=Object(r["a"])({},n.pagination);e.total=t.count,n.pagination=e})).finally((function(){n.spinning=!1})).catch((function(t){n.$alertMessage(t.response.data.message)}))},deleteConstant:function(t){var n=this;this.$store.dispatch("deleteConstant",t.id).then((function(t){n.$alertMessage("success","Deleted","Constant has been deleted successfully",n)})).catch((function(t){t.response.data&&n.$alertMessage(t.response.data.message)})).finally((function(){n.getConstants(n.$route.query)}))}},created:function(){var t=null;this.$isEmptyObj(this.$route.query)?t={limit:10,page:1}:(t=this.$route.query,this.pagination.current=parseInt(this.$route.query.page)),this.getConstants(t)}}),i=o,c=(e("106c"),e("2877")),u=Object(c["a"])(i,a,s,!1,null,"c456daba",null);n["default"]=u.exports},e978:function(t,n,e){}}]);