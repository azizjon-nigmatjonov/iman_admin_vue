(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7443675b"],{2440:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("a-navigation",{attrs:{list:[{name:t.$t("Finance"),link:""},{name:t.$t("TreasuryDep"),link:"/finance/treasury/list"},{name:t.$t("Cash In"),link:""}],isBack:{flag:!0,return:!0}}}),e("a-card",[e("a-form-model",{ref:"ruleForm",attrs:{colon:!1,model:t.form,rules:t.rules}},[e("a-card",{staticClass:"no-border-card no-space-tab no-padding-title",attrs:{title:t.$t("Cash in")}},[e("a-row",{attrs:{type:"flex",gutter:16}},[e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"name",attrs:{label:t.$t("contract_date"),prop:"contract_date"}},[e("a-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"Select Time",valueFormat:"YYYY-MM-DD",format:t.$dateFormat},model:{value:t.form.contract_date,callback:function(a){t.$set(t.form,"contract_date",a)},expression:"form.contract_date"}})],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"name",attrs:{label:t.$t("date"),prop:"date"}},[e("a-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"Select Time",valueFormat:"YYYY-MM-DD",format:t.$dateFormat},model:{value:t.form.date,callback:function(a){t.$set(t.form,"date",a)},expression:"form.date"}})],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("amount"),prop:"amount"}},[e("a-input-number",{staticStyle:{width:"100%"},attrs:{formatter:function(t){return t.replace(/(?=(\d{3})+(?!\d))/g," ")},parser:function(t){return t.replace(/\s?|(,*)/g,"")}},model:{value:t.form.amount,callback:function(a){t.$set(t.form,"amount",a)},expression:"form.amount"}})],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("Дт"),prop:"account_from"}},[e("a-input",{model:{value:t.form.account_from,callback:function(a){t.$set(t.form,"account_from",a)},expression:"form.account_from"}})],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("Кт"),prop:"account_to"}},[e("a-input",{model:{value:t.form.account_to,callback:function(a){t.$set(t.form,"account_to",a)},expression:"form.account_to"}})],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("Тип операции"),prop:"operation_id"}},[e("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Выберите тип операции"},model:{value:t.form.operation_id,callback:function(a){t.$set(t.form,"operation_id",a)},expression:"form.operation_id"}},t._l(t.operations,(function(a){return e("a-select-option",{key:a.id,attrs:{value:a.id}},[t._v(" "+t._s(a.name)+" ")])})),1)],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("Платежная система"),prop:"payment_gateway"}},[e("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:t.$t("Введите платежный шлюз")},model:{value:t.form.payment_gateway,callback:function(a){t.$set(t.form,"payment_gateway",a)},expression:"form.payment_gateway"}},t._l(t.paymentGateways,(function(a){return e("a-select-option",{key:a.id,attrs:{value:a.id}},[t._v(" "+t._s(a.name)+" ")])})),1)],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{ref:"description",attrs:{label:t.$t("contrAgent"),prop:"partner_id"}},[e("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:t.$t("Выберите партнера")},model:{value:t.form.partner_id,callback:function(a){t.$set(t.form,"partner_id",a)},expression:"form.partner_id"}},t._l(t.partners,(function(a){return e("a-select-option",{key:a.id,attrs:{value:a.id}},[t._v(" "+t._s(a.name)+" ")])})),1)],1)],1),e("a-col",{attrs:{span:8}},[e("a-form-model-item",{attrs:{label:t.$t("contract_number"),prop:"contract_number"}},[e("a-input",{model:{value:t.form.contract_number,callback:function(a){t.$set(t.form,"contract_number",a)},expression:"form.contract_number"}})],1)],1)],1)],1)],1)],1),e("a-row",{staticClass:"edit-btns mt-4"},[e("a-col",{attrs:{span:"24"}},[e("a-form-model-item",[e("a-row",{attrs:{type:"flex",justify:"end"}},[e("a-col",{attrs:{span:"auto"}},[e("a-button",{staticStyle:{"margin-right":"6px"},attrs:{type:"grey"},on:{click:function(a){return t.$router.go(-1)}}},[t._v(t._s(t.$t("button.cancel")))]),e("a-button",{attrs:{type:"primary"},on:{click:t.updateCashIn}},[t._v(t._s(t.$t("button.save")))])],1)],1)],1)],1)],1)],1)},n=[],o=(e("d3b7"),e("ac1f"),e("1276"),e("fb6a"),e("c1df")),i=e.n(o),s={data:function(){return{loading:!1,form:{account_from:"",account_to:"",amount:null,contract_date:"",contract_number:"",date:"",operation_id:null,payment_gateway:null,partner_id:""},rules:{account_from:[{required:!0,message:"Пожалуйста, заполните поле",trigger:"blur"}],account_to:[{required:!0,message:"Пожалуйста, заполните поле",trigger:"blur"}],amount:[{required:!0,message:"Пожалуйста, заполните поле",trigger:"blur"}],contract_date:[{required:!0,message:"Пожалуйста, выберите поле",trigger:"blur"}],contract_number:[{required:!0,message:"Пожалуйста, заполните поле",trigger:"blur"}],date:[{required:!0,message:"Пожалуйста, выберите поле",trigger:"blur"}],payment_gateway:[{required:!0,message:"Пожалуйста, выберите поле",trigger:"blur"}],operation_id:[{required:!0,message:"Пожалуйста, выберите поле",trigger:"blur"}],partner_id:[{required:!0,message:"Пожалуйста, выберите поле",trigger:"blur"}]},accounts:[],operations:[],paymentGateways:[],partners:[],accountsParams:{count:null,limit:10},operationsParams:{count:null,limit:10},partnersParams:{count:null,limit:10}}},mounted:function(){var t=this;this.getOperations(),this.getPaymentGateways(),this.getPartners(),this.$route.params.id&&this.$store.dispatch("getCashInOutDetail",this.$route.params.id).then((function(a){t.form={account_from:a.gl.account_from,account_to:a.gl.account_to,amount:a.gl.amount,contract_date:i()(a.gl.subconto_debit.title2.split(",").pop()).format("YYYY-MM-DD"),contract_number:a.gl.subconto_debit.title2.split(",")[0].slice(3),date:i()(a.gl.date_at).format("YYYY-MM-DD"),operation_id:"".concat(a.gl.debit_operation_id),payment_gateway:a.gl.payment_gateway.id,id:a.gl.guid,partner_id:a.partner_id}})).finally((function(){t.loading=!1}))},methods:{updateCashIn:function(){var t=this;this.$refs.ruleForm.validate((function(a,e){if(a){t.loading=!0;var r=JSON.parse(JSON.stringify(t.form));r.amount=parseInt(r.amount),r.operation_id=parseInt(r.operation_id),r.payment_gateway=parseInt(r.payment_gateway),t.$store.dispatch("createOrUpdateCashIn",r).then((function(a){t.$router.go(-1)})).finally((function(){t.loading=!1}))}}))},getOperations:function(){var t=this;this.loading=!0,this.$store.dispatch("getOperations").then((function(a){t.operations=a.operations})).finally((function(){t.loading=!1}))},getPaymentGateways:function(){var t=this;this.loading=!0,this.$store.dispatch("getPaymentGatewaysList",{limit:1e3}).then((function(a){t.paymentGateways=a.payment_gateways})).finally((function(){t.loading=!1}))},getPartners:function(){var t=this;this.loading=!0,this.$store.dispatch("getPartners",{limit:1e3}).then((function(a){t.partners=a.partners})).finally((function(){t.loading=!1}))}}},c=s,l=(e("fc42"),e("2877")),m=Object(l["a"])(c,r,n,!1,null,null,null);a["default"]=m.exports},fa6f:function(t,a,e){},fc42:function(t,a,e){"use strict";e("fa6f")}}]);