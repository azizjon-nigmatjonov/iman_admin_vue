(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-642e0690"],{c560:function(t,e,a){"use strict";a("c677")},c677:function(t,e,a){},cb23:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-navigation",{attrs:{list:[{name:t.$t("Mudaraba"),link:""}],isBack:{flag:!1,link:"/category/list"},noBorder:""}},[a("div",{staticClass:"inputs"},[a("span",[t._v(t._s(t.$t("payment_type"))+": ")]),a("a-select",{staticClass:"filter__input",attrs:{allowClear:!0},on:{change:t.onStatusChange},model:{value:t.paymentType,callback:function(e){t.paymentType=e},expression:"paymentType"}},t._l(t.paymentTypes,(function(e,s){return a("a-select-option",{key:s,attrs:{value:e.value}},[t._v(" "+t._s(t.$t(e.label))+" ")])})),1),a("span",[t._v(t._s(t.$t("statuses"))+": ")]),a("a-select",{staticClass:"filter__input",attrs:{allowClear:!0},on:{change:t.onStatusChange},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.statusList,(function(e){return a("a-select-option",{key:e.status_id,attrs:{value:e.status}},[t._v(" "+t._s(t.$t(e.status))+" ")])})),1)],1)]),a("a-card",{staticClass:"no-border-card"},[a("a-form-model",{ref:"ruleForm2",attrs:{model:t.form,layout:"inline",rules:t.rules}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("div",[a("a-form-model-item",[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.$t("search"))+":")]),a("a-input",{attrs:{placeholder:t.$t("search")},on:{change:t.filterInput},model:{value:t.search_args,callback:function(e){t.search_args=e},expression:"search_args"}})],1)])],1),a("div",[a("a-form-model-item",{attrs:{prop:"date"}},[a("a-range-picker",{staticStyle:{width:"100%"},attrs:{format:"YYYY-MM-DD","show-time":{hideDisabledOptions:!1}},on:{change:t.filterDate},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1),a("a-form-model-item",[a("a-button",{staticStyle:{float:"right",margin:"3px"},attrs:{type:"primary",loading:t.downloading,icon:"file-excel"},on:{click:t.download}},[t._v(t._s(t.$t("Export to excel")))])],1)],1)])])],1),a("a-card",{staticClass:"no-space-tab"},[a("a-tabs",{attrs:{activeKey:t.type},on:{change:t.onTabChange}},t._l(t.typeList,(function(e){return a("a-tab-pane",{key:e.key,attrs:{tab:t.$t(e.title)}},[a("a-card",[a("a-row",{staticClass:"mb-2",attrs:{type:"flex",justify:"end"}},[a("a-col",{attrs:{span:"auto"}},[t._e()],1)],1),a("a-table",{attrs:{columns:t.columns,"data-source":t.investors,"row-key":function(t){return t.claim_id},size:"middle",pagination:t.paramsPagination,loading:t.loading,bordered:""},on:{change:t.getPagination},scopedSlots:t._u([{key:"payment_type",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e))+" ")])}},{key:"type",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e.type))+" ")])}},{key:"strategy_amount",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$moneyFormat(e.data.strategy&&e.data.strategy.amount))+" ")])}},{key:"created_at",fn:function(e){return a("span",{},[t._v(" "+t._s(t._f("moment")(e.created_at,t.$dateTimeFormat))+" ")])}},{key:"amount",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$moneyFormat(+e.data.amount))+" ")])}},{key:"index",fn:function(e,s,n){return a("span",{},[t._v(" "+t._s(10*(t.paramsPagination.current-1)+n+1)+" ")])}},{key:"residency",fn:function(e){return a("span",{},[t._v(" "+t._s(e?"Резидент":"Нерезидент")+" ")])}},{key:"fullname",fn:function(e,s){return a("span",{},[t._v(" "+t._s((s.investor&&s.investor.passport_data&&s.investor.passport_data.first_name||"")+" "+(s.investor&&s.investor.passport_data&&s.investor.passport_data.last_name||""))+" ")])}},{key:"birth_day",fn:function(e){return a("span",{},[t._v(" "+t._s(t._f("moment")(e.birth_day,t.$dateTimeFormat))+" ")])}},{key:"status",fn:function(e){return a("span",{},[a("a-tag",{attrs:{color:t.getStatusColor(e.status)}},[t._v(t._s(t.$t(e.status)))])],1)}},{key:"actions",fn:function(e){return a("span",{},[a("delete-btn",{on:{confirm:function(a){return t.deleteInvestor(e)}}})],1)}}],null,!0)})],1)],1)})),1)],1)],1)},n=[],i=a("5530"),r=(a("d3b7"),a("99af"),a("5880")),o=a("b047"),c=a.n(o),l=a("c1df"),u=a.n(l),d={watch:{$route:{handler:function(){this.getInvestors(),this.getStatus()},deep:!0}},data:function(){return this.filterInput=c()(this.filterInput,500),{form:{date:void 0},rules:{date:[{required:!0,message:"Пожалуйста, введите дату",trigger:"change"}]},downloading:!1,search_args:"",type:"cash_in",typeList:[{title:"moneyInput",key:"cash_in"},{title:"moneyWWithdrawal",key:"cash_out"}],investors:[],statusList:[],paymentTypes:[{label:"Банковский перевод",value:"bank_transfer"},{label:"Карта",value:"card"}],visible:!1,loading:!1,passport_data:{},selectedInvestors:null,pagination:{current:1,showQuickJumper:!0},status:void 0,paymentType:"",columns:[{title:"№",key:"index",scopedSlots:{customRender:"index"},customCell:this.onRowClick},{title:"Номер запроса",key:"claim_number",dataIndex:"claim_number"},{title:this.$t("Created_at"),scopedSlots:{customRender:"created_at"},key:"created_at",customCell:this.onRowClick},{title:this.$t("investor"),key:"fullname",scopedSlots:{customRender:"fullname"},customCell:this.onRowClick},{title:this.$t("phone_number"),key:"phone_number",dataIndex:"investor.phone_number",customCell:this.onRowClick},{title:this.$t("type"),key:"type",scopedSlots:{customRender:"type"},customCell:this.onRowClick},{title:this.$t("payment_type"),dataIndex:"payment_type",scopedSlots:{customRender:"payment_type"},customCell:this.onRowClick},{title:this.$t("currency"),key:"currency",dataIndex:"data.bank.currency",customCell:this.onRowClick},{title:this.$t("amount_or_precent"),key:"amount",dataIndex:"data.amount",customCell:this.onRowClick},{title:this.$t("strategy_amount"),key:"strategy_amount",scopedSlots:{customRender:"strategy_amount"},customCell:this.onRowClick,width:130},{title:this.$t("Status"),scopedSlots:{customRender:"status"},key:"status",fixed:"right",width:120,customCell:this.onRowClick}]}},computed:Object(i["a"])(Object(i["a"])({},Object(r["mapGetters"])(["claimsParams"])),{},{paramsPagination:function(){return{current:this.claimsParams.page,total:this.claimsParams.total,showQuickJumper:!0}}}),methods:{download:function(t){var e=this;t.preventDefault(),this.$refs.ruleForm2.validate((function(t,a){if(t){e.downloading=!0;var s=e.form.date[0].format("YYYY-MM-DD"),n=e.form.date[1].format("YYYY-MM-DD"),i={begin_date:s,end_date:n};e.type&&(i["type"]=e.type),e.status&&(i["status"]=e.status),e.search_args&&(i["search_args"]=e.search_args),e.paymentType&&(i["paymentType"]=e.paymentType),e.$store.dispatch("getClaimsReports",i).then((function(t){var e=t.filename,a=document.createElement("a");a.href=e,a.setAttribute("download","File"),document.body.appendChild(a),a.click()})).catch((function(t){e.$message.error(t.response.data.error)})).finally((function(){e.downloading=!1}))}}))},onTabChange:function(t){this.type=t,this.status=void 0,this.paymentType="",this.getInvestors(Object(i["a"])(Object(i["a"])({},this.claimsParams),{},{page:1,type:t,status:void 0,payment_type:"",search_args:this.search_args}))},filterInput:function(t){this.getInvestors(Object(i["a"])(Object(i["a"])({},this.claimsParams),{},{page:1,type:this.type,status:this.status,search_args:this.search_args})),this.pagination.current=1},filterDate:function(t){this.getInvestors(Object(i["a"])(Object(i["a"])({},this.claimsParams),{},{page:1,type:this.type,status:this.status,search_args:this.search_args,start_date:t.length?this.form.date[0].format("YYYY-MM-DD"):void 0,end_date:t.length?this.form.date[1].format("YYYY-MM-DD"):void 0})),this.pagination.current=1},getStatus:function(){var t=this;this.$store.dispatch("getStatuses",{is_cash_out:"cash_out"===this.type}).then((function(e){t.statusList=e.statuses}))},onRowClick:function(t,e){var a=this;return{on:{click:function(e){a.$router.push("/mudaraba/".concat(a.type,"/").concat(t.claim_id))}}}},onStatusChange:function(){this.getInvestors(Object(i["a"])(Object(i["a"])({},this.claimsParams),{},{page:1,limit:10,status:this.status,payment_type:this.paymentType,search_args:this.search_args})),this.pagination.current=1},getStatusColor:function(t){var e;switch(t){case"request_sent":e="purple";break;case"confirmed":e="blue";break;case"check_payment_pending":e="orange";break;case"signature_pending":e="yellow";break;case"success":e="green";break;case"paid":e="cyan";break;case"cancelled":e="red";break;default:e=""}return e},getPagination:function(t){var e=Object(i["a"])(Object(i["a"])({},this.claimsParams),{},{page:t.current,limit:10,status:this.status,search_args:this.search_args});this.getInvestors(e),this.pagination.current=t.current},getInvestors:function(t){var e=this;this.getStatus(),this.loading=!0;var a=Object(i["a"])({},t);"cash_in"===this.type?a.type="cash_in":"cash_out"===this.type&&(a.type="cash_out"),this.$store.dispatch("getMudarabaApplications",a).then((function(t){e.investors=t.claims;var a=Object(i["a"])({},e.pagination);a.total=t.count,e.pagination=a,e.loading=!1})).catch((function(t){e.$alertMessage(t.response.data.message),e.loading=!1}))},deleteInvestor:function(t){var e=this;this.$store.dispatch("deleteInvestor",t.id).then((function(a){e.$deleteFromList(e.investors,t.id),e.$alertMessage("success","Deleted","Investor has deleted successfully",e)})).catch((function(t){t.response.data&&e.$alertMessage(t.response.data.message)}))},getList:function(){this.status=this.claimsParams.status,this.type=this.claimsParams.type,this.search_args=this.claimsParams.search_args,this.form.date=this.claimsParams.start_date&&this.claimsParams.end_date?[u()(this.claimsParams.start_date),u()(this.claimsParams.end_date)]:[],this.getInvestors(this.claimsParams)}},created:function(){this.getList()}},p=d,m=(a("c560"),a("2877")),h=Object(m["a"])(p,s,n,!1,null,"094f8b94",null);e["default"]=h.exports}}]);