(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44cdab67"],{"09f9":function(t,e,a){},"1d38":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-navigation",{attrs:{list:[{name:t.$t("closedMonths"),link:""},{name:t.$t("button.edit"),link:""}],isBack:{flag:!0,return:!0},noBorder:""}},[n("div",{staticStyle:{float:"right",display:"flex","align-items":"center"}},[t._v(" "+t._s(t.$t("month"))+": "),n("span",{staticStyle:{color:"#01cab0","font-weight":"bold","text-transform":"capitalize"}},[t._v(t._s(t.getMonth))]),1===t.activeTab||3===t.activeTab?n("a-input",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:t.$t("search")},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}):t._e()],1)]),n("a-card",{staticClass:"no-space-tab"},[n("a-tabs",{staticClass:"no-margin-bar",on:{change:t.onTabChange},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[n("div",{staticStyle:{display:"flex","align-items":"center","margin-right":"24px"},attrs:{slot:"tabBarExtraContent"},slot:"tabBarExtraContent"},[n("a-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",loading:t.reportLoading},on:{click:t.postReportLeft}},[t._v("Дивидент")]),n("a-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:t.showCreateModal}},[t._v("Прогноз")]),n("a-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary",loading:t.downloadingCGU,icon:"file-excel"},on:{click:t.downloadCGU}},[t._v(t._s(t.$t("Export DXM")))]),4!==t.activeTab?n("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"download"},on:{click:t.downloadExcel}}):t._e(),n("a-popconfirm",{attrs:{slot:"extra",placement:"topRight",title:t.$t("closedMonthsBtn"),okText:t.$t("yes"),cancelText:t.$t("no"),disabled:"in-process"!==t.$route.query.status||t.downloaded},on:{confirm:t.sendRequest},slot:"extra"},[n("a-button",{attrs:{type:"primary",disabled:"in-process"!==t.$route.query.status||t.downloaded,loading:t.loadingBtn}},[t._v(t._s(t.$t("closedMonthsBtn")))])],1)],1),n("a-tab-pane",{key:1,attrs:{tab:"Распеределения чистый прыбыли"}},[n("a-card",[n("first-tab",{ref:"tab1",attrs:{searchText:t.searchText}})],1)],1),n("a-tab-pane",{key:2,attrs:{tab:"Вывод денег"}},[n("a-card",[n("second-tab",{ref:"tab2"})],1)],1),n("a-tab-pane",{key:3,attrs:{tab:"Ввод денег"}},[n("a-card",[n("third-tab",{ref:"tab3",attrs:{searchText:t.searchText}})],1)],1),n("a-tab-pane",{key:4,attrs:{tab:t.$t("files")}},[n("a-card",[n("a-table",{attrs:{bordered:"",pagination:!1,columns:t.columns0,loading:t.loadingBtn,"data-source":t.array0},scopedSlots:t._u([{key:"orderNumber",fn:function(e,a,o){return n("span",{},[t._v(" "+t._s(o+1)+" ")])}},{key:"type",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$t(e.type))+" ")])}},{key:"icon",fn:function(e){return n("span",{},["photo"===e.format?n("img",{attrs:{width:"25",height:"25",src:a("931c")}}):n("img",{attrs:{width:"25",height:"25",src:a("5e4e")}}),t._v(" "+t._s(e.title)+" ")])}},{key:"file",fn:function(e){return n("span",{},[t._v(" "+t._s("photo"===e.format?"Изображение":"Документ"))])}},{key:"actions",fn:function(e){return n("span",{staticClass:"span"},[n("a-row",{attrs:{type:"flex",gutter:[8,8]}},[n("a-col",{attrs:{span:"auto"}},[n("icon-btn",{attrs:{tooltip:t.$t("button.preview"),icon:"download",color:"green"},on:{click:function(a){return t.download(e)}}})],1)],1)],1)}}])})],1)],1)],1)],1),n("a-modal",{attrs:{footer:null,title:"Create Modal"},on:{ok:t.handleOkModal},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("a-row",[n("a-form-model",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules}},[n("a-row",{attrs:{gutter:16}},[n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"day_0",attrs:{label:t.$t("day_0"),prop:"day_0"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.day_0,callback:function(e){t.$set(t.form,"day_0",e)},expression:"form.day_0"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_1_7",attrs:{label:t.$t("days_1_7"),prop:"days_1_7"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_1_7,callback:function(e){t.$set(t.form,"days_1_7",e)},expression:"form.days_1_7"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_8_15",attrs:{label:t.$t("days_8_15"),prop:"days_8_15"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_8_15,callback:function(e){t.$set(t.form,"days_8_15",e)},expression:"form.days_8_15"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_16_30",attrs:{label:t.$t("days_16_30"),prop:"days_16_30"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_16_30,callback:function(e){t.$set(t.form,"days_16_30",e)},expression:"form.days_16_30"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_31_60",attrs:{label:t.$t("days_31_60"),prop:"days_31_60"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_31_60,callback:function(e){t.$set(t.form,"days_31_60",e)},expression:"form.days_31_60"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_61_90",attrs:{label:t.$t("days_61_90"),prop:"days_61_90"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_61_90,callback:function(e){t.$set(t.form,"days_61_90",e)},expression:"form.days_61_90"}})],1)],1),n("a-col",{attrs:{span:"12"}},[n("a-form-model-item",{ref:"days_91more",attrs:{label:t.$t("days_91more"),prop:"days_91more"}},[n("a-input-number",{attrs:{min:0,max:100,formatter:function(t){return t+"%"},parser:function(t){return t.replace("%","")}},model:{value:t.form.days_91more,callback:function(e){t.$set(t.form,"days_91more",e)},expression:"form.days_91more"}})],1)],1)],1),n("a-form-model-item",[n("a-button",{attrs:{type:"primary","html-type":"submit"},on:{click:t.onSubmit}},[t._v(" "+t._s(t.$t("save"))+" ")])],1)],1)],1)],1)],1)},o=[],r=a("1da1"),i=(a("96cf"),a("caad"),a("2532"),a("ac1f"),a("1276"),a("d81d"),a("d3b7"),a("159b"),a("9911"),a("7143")),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-table",{attrs:{bordered:"",scroll:{x:2e3},columns:t.firstTabColumn,pagination:!0,"data-source":t.computedTableData,rowKey:function(t,e){return e},loading:t.loading},scopedSlots:t._u([{key:"orderNumber",fn:function(e,a,n){return[t._v(" "+t._s(t.CountNumber(n))+" ")]}},{key:"titleCol",fn:function(e,n,o){return a("span",{},[t.CountNumber(o)<6?a("b",[t._v(" "+t._s(e.column_A)+" ")]):a("span",[t._v(" "+t._s(e.column_A)+" ")])])}},{key:"status",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e.status))+" ")])}},{key:"residence",fn:function(e){return a("span",{},[t._v(" "+t._s(e?"Резидент":!1===e?"Нерезидент":"")+" ")])}},{key:"money",fn:function(e){return a("span",{},[t._v(" "+t._s("number"===typeof e?t.$moneyFormat(e):e)+" ")])}}])})],1)},l=[],u=a("2909"),c=a("5530"),d=(a("4de4"),a("b64b"),a("99af"),a("a434"),a("4e82"),a("498a"),{props:{searchText:{type:String,default:""}},data:function(){return{cout:0,fulldata:[],loading:!1,pagination:{current:1,pageSize:10,total:null},excelData:[],data:[],keys:{column_D:"",column_E:"Сумма",column_F:"% в УК (всего)",column_G:"Доля Инвестора (с учетом партенерства)",column_H:"% в партнерстве Инвестор",column_I:"% в партнерстве (ООО)",column_J:"РП по % в УК (всего)",column_K:"Прыбиль до налогов (ООО)",column_L:"РП  по % в УК + по % в Партнерстве до IRR (для инвестора)",column_M:"Резерв Обесценения (IRR)",column_N:"Прибыль до налогов (инвестор)",column_P:"Сумма налога от дивидендов",column_Q:"Сумма налога от дивидендов",column_R:"Сумма налога от дивидендов",column_S:"Прибыль после налогов (инвестор)",column_T:"Прибыль после налогов (ООО)",column_V:"К выплате",column_W:"К капитализации",investor_object_id:"Идентификатор инвестора"},firstTabColumn:[{title:"No",width:60,align:"center",scopedSlots:{customRender:"orderNumber"},key:"orderNumber",fixed:"left"},{title:"",width:160,scopedSlots:{customRender:"titleCol"},key:"no1"},{title:"",width:130,dataIndex:"column_D",key:"column_D"},{title:"Сумма",width:160,dataIndex:"column_E",scopedSlots:{customRender:"money"},key:"column_E"},{title:"% в УК (всего)",width:130,dataIndex:"column_F",key:"column_F"},{title:"Доля Инвестора (с учетом партенерства)",width:256,dataIndex:"column_G",key:"column_G"},{title:"% в партнерстве Инвестор",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_H",key:"column_H"},{title:"% в партнерстве (ООО)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_I",key:"column_I"},{title:"РП по % в УК (всего)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_J",key:"column_J"},{title:"Прыбиль до налогов (ООО)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_K",key:"column_K"},{title:"РП  по % в УК + по % в Партнерстве до IRR (для инвестора)",scopedSlots:{customRender:"money"},width:256,dataIndex:"column_L",key:"column_L"},{title:"Резерв Обесценения (IRR)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_M",key:"column_M"},{title:"Прибыль до налогов (инвестор)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_N",key:"column_N"},{title:"Сумма налога от дивидендов",scopedSlots:{customRender:"money"},width:125,colSpan:3,key:"column_P",dataIndex:"column_P"},{title:"Сумма налога от дивидендов",scopedSlots:{customRender:"money"},width:125,colSpan:0,key:"column_Q",dataIndex:"column_Q"},{title:"Сумма налога от дивидендов",scopedSlots:{customRender:"money"},width:125,colSpan:0,key:"column_R",dataIndex:"column_R"},{title:"Прибыль после налогов (инвестор)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_S",key:"column_S"},{title:"Прибыль после налогов (ООО)",scopedSlots:{customRender:"money"},width:160,dataIndex:"column_T",key:"column_T"},{title:"Дивиденды",key:"dividends",children:[{title:"Предыдущие",width:160,dataIndex:"previous_dividend",scopedSlots:{customRender:"money"},key:"previous_dividend"},{title:"К выплате",width:160,dataIndex:"column_V",scopedSlots:{customRender:"money"},key:"column_V"},{title:"К капитализации",width:160,dataIndex:"column_W",scopedSlots:{customRender:"money"},key:"column_W"}]},{width:160,title:"Месячный лимит",dataIndex:"month_limit",key:"month_limit"},{title:"Идентификатор инвестора",width:300,align:"center",key:"investor_object_id",dataIndex:"investor_object_id"}]}},computed:{computedTableData:function(){var t=this;return this.data.filter((function(e){var a;return!!(null!==(a=e.column_A)&&void 0!==a&&a.toLowerCase().includes(t.searchText.toLowerCase())||e.investor_object_id.includes(t.searchText))}))}},watch:{data:function(){this.data[0].isBold=!0,this.data[1].isBold=!0,this.data[2].isBold=!0,this.data[4].isBold=!0;var t=0;this.excelData=this.data.map((function(e){return e.investor_object_id&&(t+=1),Object(c["a"])(Object(c["a"])({},e),{},{number:e.investor_object_id?t:null})}))}},mounted:function(){this.getProfitDistribution()},methods:{CountNumber:function(t){return 0===this.cout||1===this.cout?t+1:this.cout*this.pagination.pageSize-this.pagination.pageSize+t+1},getPagination:function(t,e,a){this.pagination.current=t.current,this.cout=t.current},getProfitDistribution:function(){var t=this;this.loading=!0,this.$store.dispatch("getProfitDistribution",{month_id:this.$route.params.id}).then((function(e){if(e.data&&e.data.length){t.fulldata=e.data,t.data=e.data,t.data[0].column_P="Для инвесторов нерезидентов",t.data[0].column_Q="Для инвесторов резидентов",t.data[0].column_R="Для ООО резидент",t.data[1].column_P="Не резидент",t.data[1].column_Q="Резидент",t.data[1].column_R="Резидент",t.data=t.data.map((function(t,e){if(![0,1].includes(e)){var a={};return Object.keys(t).forEach((function(e){a[e]=0===t[e]?"0":t[e]})),a}return t})),t.pagination.total=e.data.length;var a=t.data;t.data=[].concat(Object(u["a"])(a.splice(0,5)),Object(u["a"])(t.globalSort(a)))}})).catch((function(t){})).finally((function(){t.loading=!1}))},globalSort:function(t){var e=t.sort((function(t,e){return t.column_A.trim()>e.column_A.trim()?1:e.column_A.trim()>t.column_A.trim()?-1:0}));return e}}}),m=d,p=a("2877"),_=Object(p["a"])(m,s,l,!1,null,"a253ad46",null),f=_.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"margin-bottom":"20px"}}),a("a-table",{attrs:{bordered:"",pagination:!1,columns:t.column,scroll:{x:200},"data-source":t.data,loading:t.loading,rowKey:function(t,e){return e}},scopedSlots:t._u([{key:"orderNumber",fn:function(e,a,n){return[t._v(" "+t._s(n+1)+" ")]}},{key:"user",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e.user&&e.user.name||""))+" ")])}},{key:"status",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e.status))+" ")])}},{key:"date",fn:function(e){return a("span",{},[t._v(" "+t._s(t._f("moment")(e.date,t.$dateFormat))+" ")])}},{key:"money",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$moneyFormat(+e)||"0")+" ")])}},{key:"listed_date",fn:function(e){return e.listed_date?a("span",{},[t._v(" "+t._s(t._f("moment")(e.listed_date,t.$dateFormat))+" ")]):a("span",{},[a("a-date-picker",{attrs:{format:t.$dateFormat,valueFormat:"YYYY-MM-DD",placeholder:t.$t("transferDividendsDate")},model:{value:e.listed_date,callback:function(a){t.$set(e,"listed_date",a)},expression:"text.listed_date"}})],1)}},{key:"buttonTransfer",fn:function(e){return a("span",{},[a("a-button",{attrs:{loading:e.loading},on:{click:function(a){return t.updateClaimsStatuses(e.claim_id,e)}}},[t._v(" "+t._s(t.$t("transferDividends"))+" ")])],1)}}],null,!0)})],1)},v=[],y={data:function(){return{data:[],excelData:[],loading:!1,loadingBtn:!1,keys:{investor_name:"Ф.И.О инвестора",period:"Период",dividend_payment:"Дивиденды к выплате (сум)",investment_amount:"Вывод доли (сум)",payment_amount:"Сумма (сум)",claim_id:"ID","bank_requisite.card_number":"Номер карты","bank_requisite.bank_name":"Наименование банка","bank_requisite.mfo":"МФО","bank_requisite.transit_account":"Транзитный счёт","bank_requisite.inn":"ИНН банка"},column:[{title:"No",width:60,align:"center",scopedSlots:{customRender:"orderNumber"},key:"orderNumber",fixed:"left"},{title:"Ф.И.О инвестора",dataIndex:"investor_name",key:"investorFullname",width:256},{title:"Дата",scopedSlots:{customRender:"date"},key:"date",width:256},{title:"Перечесление Дата",scopedSlots:{customRender:"listed_date"},key:"listed_date",width:256},{title:"Период",dataIndex:"period",key:"period",width:128},{title:"Дивиденды к выплате (сум)",scopedSlots:{customRender:"money"},dataIndex:"dividend_payment",key:"dividendsPayable",width:192},{title:"Вывод доли (сум)",scopedSlots:{customRender:"money"},dataIndex:"investment_amount",key:"shareWithdrawal",width:160},{title:"Сумма (сум)",scopedSlots:{customRender:"money"},dataIndex:"payment_amount",key:"overall",width:192},{title:"Перечислено",scopedSlots:{customRender:"buttonTransfer"},key:"ov6erall",width:192},{title:"Банковские реквизиты",key:"status",width:192,children:[{title:"Номер карты",key:"status1",dataIndex:"bank_requisite.card_number",width:192},{title:"Наименование банка",key:"status2",dataIndex:"bank_requisite.bank_name",width:192},{title:"МФО",key:"status3",dataIndex:"bank_requisite.mfo",width:192},{title:"Транзитный счёт",key:"status4",dataIndex:"bank_requisite.transit_account",width:192},{title:"ИНН банка",key:"status5",dataIndex:"bank_requisite.inn",width:192}]},{title:"ID",width:300,align:"center",key:"claim_id",dataIndex:"claim_id"}],form:{date:void 0},rules:{date:[{required:!0,message:"Пожалуйста, введите",trigger:"change"}]}}},mounted:function(){this.getCashOutReport()},methods:{updateClaimsStatuses:function(t,e){var a=this;e.loading=!0,this.$store.dispatch("updateClaimsStatuses",{guid:[t],status_id:7,month_id:this.$route.params.id,period:this.$route.params.date,date_at:e.listed_date}).then((function(t){a.$alertMessage("success","Message","Claims' statuses successfully updated",a),a.getCashOutReport()})).catch((function(){a.$alertMessage("error","Message","Claims' statuses were not updated",a)})).finally((function(){e.loading=!1}))},getCashOutReport:function(){var t=this;this.loading=!0,this.$store.dispatch("getCashOutReport",{month_id:this.$route.params.id,date:this.$route.params.date}).then((function(e){if(e.data&&e.data.length){var a=t.globalSort(e.data).map((function(t,e){return Object(c["a"])(Object(c["a"])({},t),{},{number:e+1})}));t.data=a.map((function(t){return Object(c["a"])(Object(c["a"])({},t),{},{loading:!1})}))||[],t.excelData=a||[]}})).catch((function(t){})).finally((function(){t.loading=!1}))},globalSort:function(t){var e=t.sort((function(t,e){return t.investor_name.trim()>e.investor_name.trim()?1:e.investor_name.trim()>t.investor_name.trim()?-1:0}));return e}}},b=y,g=Object(p["a"])(b,h,v,!1,null,"2784c135",null),w=g.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-tabs",{on:{change:t.Tabcallback}},[a("a-tab-pane",{key:"1",attrs:{tab:"Полный товарищ"}},[a("Tabcompanents",{attrs:{columname:t.column,data:t.oneTabData,loading:t.loading,total:t.totalfull.onelistTotal,searchText:t.searchText}})],1),a("a-tab-pane",{key:"2",attrs:{tab:"Вышедшие инвесторы"}},[a("div",[a("Tabcompanents",{attrs:{columname:t.column,data:t.twoTabdata,loading:t.loading,total:t.totalfull.twolistTotal,searchText:t.searchText}})],1)]),a("a-tab-pane",{key:"3",attrs:{tab:"Текущие инвесторы"}},[a("div",[a("Tabcompanents",{attrs:{columname:t.column,data:t.theeTabdata,loading:t.loading,total:t.totalfull.theelistTotal,searchText:t.searchText}})],1)]),a("a-tab-pane",{key:"4",attrs:{tab:"Новые инвесторы"}},[a("div",[a("Tabcompanents",{attrs:{columname:t.column,data:t.fourData,loading:t.loading,total:t.totalfull.fourlistTotal,searchText:t.searchText}})],1)])],1)],1)},x=[],S=(a("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tableTop"},[a("a-table",{attrs:{bordered:"",pagination:!0,rowKey:function(t,e){return e},columns:t.columname,scroll:{x:1e3},"data-source":t.computedTableData,loading:t.loading},scopedSlots:t._u([{key:"orderNumber",fn:function(e,a,n){return[t._v(" "+t._s(t.CountNumber(n))+" ")]}},{key:"percent",fn:function(e){return a("span",{},[t._v(" "+t._s(e)+" % ")])}},{key:"type",fn:function(e){return a("span",{},[a("a-tag",{staticStyle:{width:"100%","text-align":"center"},attrs:{color:t.colors[e]}},[t._v(t._s(t.types[e]))])],1)}},{key:"status",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$t(e.status))+" ")])}},{key:"date",fn:function(e){return a("span",{},[t._v(" "+t._s(t._f("moment")(e.created_at,t.$dateFormat))+" ")])}},{key:"money",fn:function(e){return a("span",{},[t._v(" "+t._s(t.$moneyFormat(+e)||"0")+" ")])}}])})],1)}),R=[],$=a("c1df"),T=a.n($),I={props:["columname","data","loading","total","searchText"],watch:{total:function(t){this.pagination.total=t}},data:function(){return{types:{exists:"Текущий",new:"Новый"},colors:{exists:"cyan",new:"green"},pagination:{current:1,pageSize:10,total:this.total},count:0}},methods:{moment:T.a,getPagination:function(t){this.count=t.current,this.pagination.current=t.current},CountNumber:function(t){return 0===this.count||1===this.count?t+1:this.count*this.pagination.pageSize-this.pagination.pageSize+t+1}},computed:{computedTableData:function(){var t=this;return this.data.filter((function(e){var a;return!!(null!==(a=e.name)&&void 0!==a&&a.toLowerCase().includes(t.searchText.toLowerCase())||e.investor_id.includes(t.searchText))}))}}},C=I,D=(a("3f8d"),Object(p["a"])(C,S,R,!1,null,"6e7535dd",null)),j=D.exports,M={components:{Tabcompanents:j},props:{searchText:{type:String,default:""}},data:function(){var t=this.$createElement;return{oneTabData:[],fulldata:[],totalfull:{onelistTotal:null,twolistTotal:null,theelistTotal:null,fourlistTotal:null},twoTabdata:[],theeTabdata:[],fourData:[],data:[],excelData:[],pagination:{current:1,pageSize:10,total:null},types:{exists:"Текущий",new:"Новый"},colors:{exists:"cyan",new:"green"},loading:!1,keys:{name:"Наименовие Ф.И.О участника",type:"Тип инвестора",investor_id:"Идентификатор инвестора",column_A:"Номинальная стоимость доли (сум)",column_B:"Размер доли в УФ %",column_C:"Сумма причитающейся прыбилы",column_D:"Сумма прыбыли, получаемая в виде дивидендов",column_E:"Сумма прыбыли, направляемая на увелечения УФ",column_F:"Новые инвестиции в УФ (сум)",column_G:"Номинальная стоимость доли новый размер",column_H:"Размер доли в УФ (Новый размер)",column_I:"Новая доля инвестора (с учётом партнёрства)",column_J:"% в партнёрстве инвестор",column_K:"% партнёрства IMAN"},column:[{title:"No",width:60,align:"center",scopedSlots:{customRender:"orderNumber"},key:"orderNumber",fixed:"left"},{title:"Наименовие Ф.И.О участника",key:"name",dataIndex:"name",width:160,customRender:function(e,a,n){return a&&a.mainRow?{children:t("b",[e]),attrs:{colSpan:13}}:e}},{title:"Тип инвестора",scopedSlots:{customRender:"type"},key:"type",dataIndex:"type",width:120},{title:"Месячный лимит",scopedSlots:{customRender:"limit"},key:"type",dataIndex:"month_limit",width:120},{title:"Номинальная стоимость доли (сум)",scopedSlots:{customRender:"money"},key:"sarePerValue",dataIndex:"column_A",customRender:this.renderContent,width:160},{title:"Размер доли в УФ %",scopedSlots:{customRender:"percent"},key:"shareSize",dataIndex:"column_B",customRender:this.renderContent,width:160},{title:"Сумма причитающейся прыбилы",scopedSlots:{customRender:"money"},dataIndex:"column_C",key:"amountDue",customRender:this.renderContent,width:160},{title:"Сумма прыбыли, получаемая в виде дивидендов",scopedSlots:{customRender:"money"},dataIndex:"column_D",key:"profitAmountDividend",customRender:this.renderContent,width:224},{title:"Сумма прыбыли, направляемая на увелечения УФ",scopedSlots:{customRender:"money"},dataIndex:"column_E",key:"lostAmount",customRender:this.renderContent,width:160},{title:"Новые инвестиции в УФ (сум)",scopedSlots:{customRender:"money"},dataIndex:"column_F",key:"lostAmount1",customRender:this.renderContent,width:160},{title:"Номинальная стоимость доли новый размер",scopedSlots:{customRender:"money"},dataIndex:"column_G",key:"lostAmount2",customRender:this.renderContent,width:160},{title:"Размер доли в УФ (Новый размер)",scopedSlots:{customRender:"percent"},dataIndex:"column_H",key:"lostAmount3",customRender:this.renderContent,width:160},{title:"Новая доля инвестора (с учётом партнёрства)",scopedSlots:{customRender:"percent"},dataIndex:"column_I",key:"lostAmount4",customRender:this.renderContent,width:160},{title:"% в партнёрстве инвестор",scopedSlots:{customRender:"percent"},dataIndex:"column_J",key:"lostAmount5",customRender:this.renderContent,width:160},{title:"% партнёрства IMAN",scopedSlots:{customRender:"percent"},dataIndex:"column_K",key:"lostAmount6",customRender:this.renderContent,width:160},{title:"Идентификатор инвестора",width:300,align:"center",key:"investor_id",dataIndex:"investor_id"}]}},watch:{data:function(){var t,e=0;this.excelData=null===(t=this.data)||void 0===t?void 0:t.map((function(t){return null!==t&&void 0!==t&&t.mainRow?{name:t.name,type:"",column_A:"",column_B:"",column_C:"",column_D:"",column_E:"",column_F:"",column_G:"",column_H:"",column_I:"",column_J:"",column_K:"",investor_id:"",month_limit:"",is_resident:!1,isBold:!0,number:null}:(e++,Object(c["a"])(Object(c["a"])({},t),{},{number:e}))}))}},mounted:function(){this.getCashInReport()},methods:{Tabcallback:function(t){},renderContent:function(t,e,a){var n={children:t,attrs:{}};return e&&e.mainRow?(n.attrs.colSpan=0,n):("number"===typeof t&&(n.children=t||0),n)},getCashInReport:function(){var t=this;this.loading=!0,this.$store.dispatch("getCashInReport",{month_id:this.$route.params.id,date:this.$route.params.date}).then((function(e){var a=[{name:"Полный товарищ",mainRow:!0,isBold:!0}];a.push.apply(a,Object(u["a"])(t.GlobalSorts(e.owners)));var n=[{name:"Вышедшие инвесторы",mainRow:!0,isBold:!0}];n.push.apply(n,Object(u["a"])(t.GlobalSorts(e.left_investors)));var o=[{name:"Новые инвесторы",mainRow:!0,isBold:!0}];o.push.apply(o,Object(u["a"])(t.GlobalSorts(e.new_investors)));var r=[{name:"Текущие инвесторы",mainRow:!0,isBold:!0}];r.push.apply(r,Object(u["a"])(t.GlobalSorts(e.investors))),t.oneTabData=e.owners,t.totalfull.onelistTotal=t.oneTabData.length,t.twoTabdata=t.GlobalSorts(e.left_investors),t.totalfull.twolistTotal=t.twoTabdata.length,t.fourData=t.GlobalSorts(e.new_investors),t.totalfull.fourlistTotal=t.fourData.length,t.theeTabdata=t.GlobalSorts(e.investors),t.totalfull.theelistTotal=e.investors.length,t.data=[].concat(a,n,r,o),t.loading=!1})).catch((function(t){})).finally((function(){t.loading=!1}))},GlobalSorts:function(t){var e=t.sort((function(t,e){return t.name.trim()>e.name.trim()?1:e.name.trim()>t.name.trim()?-1:0}));return e}}},O=M,N=Object(p["a"])(O,k,x,!1,null,"795d1377",null),B=N.exports,A=a("dcb5"),q=a("d403"),F={closedMonth_2:{columns:["number","investor_name","investor_id","period","dividend_payment","investment_amount","payment_amount","bank_requisite.card_number","bank_requisite.bank_name","bank_requisite.mfo","bank_requisite.transit_account","bank_requisite.inn"],header:[[{value:"No",rowSpan:2,span:1},{value:"Ф.И.О инвестора",rowSpan:2,span:1},{value:"Идентификатор инвестора",rowSpan:2,span:1},{value:"Период",rowSpan:2,span:1},{value:"Дивиденды к выплате (сум)",rowSpan:2,span:1},{value:"Вывод доли (сум)",rowSpan:2,span:1},{value:"Сумма (сум)",rowSpan:2,span:1},{value:"Банковские реквизиты",frowSpan:1,span:5},{value:""},{value:""},{value:""},{value:""}],[{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:"Номер карты"},{value:"Наименование банка"},{value:"МФО"},{value:"Транзитный счёт"},{value:"ИНН банка"}]]},closedMonth_1:{columns:["number","column_A","investor_object_id","column_D","column_E","column_F","column_G","column_H","column_I","column_J","column_K","column_L","column_M","column_N","column_P","column_Q","column_R","column_S","column_T","previous_dividend","column_V","column_W","month_limit"],header:[[{value:"No",rowSpan:2,span:1},{value:"",rowSpan:2,span:1},{value:"Идентификатор инвестора",rowSpan:2,span:1},{value:"",rowSpan:2,span:1},{value:"Сумма",rowSpan:2,span:1},{value:"% в УК (всего)",rowSpan:2,span:1},{value:"Доля Инвестора (с учетом партенерства)",rowSpan:2,span:1},{value:"% в партнерстве Инвестор",rowSpan:2,span:1},{value:"% в партнерстве (ООО)",rowSpan:2,span:1},{value:"РП по % в УК (всего)",rowSpan:2,span:1},{value:"Прыбиль до налогов (ООО)",rowSpan:2,span:1},{value:"РП  по % в УК + по % в Партнерстве до IRR (для инвестора)",rowSpan:2,span:1},{value:"Резерв Обесценения (IRR)",rowSpan:2,span:1},{value:"Прибыль до налогов (инвестор)",rowSpan:2,span:1},{value:"Сумма налога от дивидендов",rowSpan:2,span:3},{value:"",rowSpan:2,span:1},{value:"",rowSpan:2,span:1},{value:"Прибыль после налогов (инвестор)",rowSpan:2,span:1},{value:"Прибыль после налогов (ООО)",rowSpan:2,span:1},{value:"Дивиденды",rowSpan:1,span:3},{value:"",rowSpan:1,span:1},{value:"",rowSpan:1,span:1},{value:"Месячный лимит",rowSpan:2,span:1}],[{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:""},{value:"Предыдущие"},{value:"К выплате"},{value:"К капитализации"},{value:""}]]},closedMonth_3:{columns:["number","name","investor_id","type","month_limit","column_A","column_B","column_C","column_D","column_E","column_F","column_G","column_H","column_I","column_J","column_K"],header:[[{value:"No"},{value:"Наименовие Ф.И.О участника"},{value:"Идентификатор инвестора"},{value:"Тип инвестора"},{value:"Месячный лимит"},{value:"Номинальная стоимость доли (сум)"},{value:"Размер доли в УФ %"},{value:"Сумма причитающейся прыбилы"},{value:"Сумма прыбыли, получаемая в виде дивидендов"},{value:"Сумма прыбыли, направляемая на увелечения УФ"},{value:"Новые инвестиции в УФ (сум)"},{value:"Номинальная стоимость доли новый размер"},{value:"Размер доли в УФ (Новый размер)"},{value:"Новая доля инвестора (с учётом партнёрства)"},{value:"% в партнёрстве инвестор"},{value:"% партнёрства IMAN"}]]}},E=F,G={required:!0,message:"поле обязательно",trigger:"change"},L={mixins:[i["a"]],data:function(){return{form:{day_0:"",days_1_7:"",days_8_15:"",days_16_30:"",days_31_60:"",days_61_90:"",days_91more:"",month:""},rules:{day_0:G,days_1_7:G,days_8_15:G,days_16_30:G,days_31_60:G,days_61_90:G,days_91more:G},visible:!1,loading:!1,loadingBtn:!1,reportLoading:!1,downloadingCGU:!1,downloaded:!1,data:[],searchText:"",activeTab:1,link:"https://view.officeapps.live.com/op/embed.aspx?src=",fileTypes:{agreement:"",partnership_left:"",withdraw_dividends:"",certificate:""},array0:[],columns0:[{title:"No",width:60,align:"center",scopedSlots:{customRender:"orderNumber"},key:"orderNumber"},{title:this.$t("filename"),scopedSlots:{customRender:"icon"},key:"icon"},{title:this.$t("category.table.Actions"),scopedSlots:{customRender:"actions"},key:"actions",width:220}],isCashOut:this.$route.path.split("/").includes("withdrawal")}},components:{FirstTab:f,SecondTab:w,ThirdTab:B},computed:{getMonth:function(){return T()(this.$route.params.date).locale(this.$t("lang")).format("MMMM")}},mounted:function(){},methods:{showCreateModal:function(){this.visible=!0},onSubmit:function(){var t=this;this.$refs.ruleForm.validate((function(e){if(!e)return!1;t.$store.dispatch("postDelayInstallment",t.form).then((function(e){t.$message.success("Successfully added"),t.visible=!1})).catch((function(t){}))}))},handleOkModal:function(t){this.visible=!1},downloadExcel:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.$refs["tab".concat(e.activeTab)]._data.excelData,n=E["closedMonth_".concat(e.activeTab)],o=Object(q["a"])(a,n),t.next=5,Object(A["a"])(o,{columns:n.columns.map((function(){return{width:28}})),fileName:"Закрытие месяца.xlsx"});case 5:case"end":return t.stop()}}),t)})))()},downloadCGU:function(t){var e=this;t.preventDefault(),this.downloadingCGU=!0;var a={begin_date:this.$route.query.period,end_date:T()(this.$route.query.period).add(10,"m").format("YYYY-MM-DD"),month_id:this.$route.params.id};this.$store.dispatch("getInvestorCguReport",a).then((function(t){t.filename&&t.filename.length&&t.filename.forEach((function(t,e){window.open(t)}))})).catch((function(t){e.$message.error(t.response.data.error)})).finally((function(){e.downloadingCGU=!1}))},onChangePage:function(){this.activeTab++},onTabChange:function(t){4===t&&this.getClosedMonthFiles()},go:function(t){window.open("photo"!==t.format?this.link+t.file:t.file,"_blank")},download:function(t){return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=t.file,n=document.createElement("a"),n.href=a,n.setAttribute("download",t.title),document.body.appendChild(n),n.click();case 6:case"end":return e.stop()}}),e)})))()},getApplicationsDetail:function(){this.$store.dispatch("getApplicationsDetail",{id:this.$route.params.id}).then((function(t){}))},getClosedMonthFiles:function(){var t=this;this.loadingBtn=!0,this.$store.dispatch("getClosedMonthFiles",this.$route.params.id).then((function(e){var a=["svg","png","jpg","jpeg"];t.array0=e.files.map((function(t){var e=t.file_name.split(".").pop();return{file:t.file_name,title:t.title,key:Math.random(),format:e.includes("doc")?"doc":e.includes("pdf")?"pdf":e.includes("xls")?"excel":a.includes(e)?"photo":"file"}}))})).finally((function(){t.loadingBtn=!1}))},postReportLeft:function(){var t=this;this.reportLoading=!0,this.$store.dispatch("sendReportLeftInvestor",{month_id:this.$route.params.id,period:this.$route.params.date}).then((function(e){t.$message.success("Request successfully sent!"),window.open(e.url)})).catch((function(e){t.$message.error("Server rejected!")})).finally((function(){t.reportLoading=!1}))},sendRequest:function(){var t=this;this.loadingBtn=!0,this.$store.dispatch("sendClosedMonthRequest",{month_id:this.$route.params.id,period:this.$route.params.date}).then((function(e){t.$message.success("Request successfully sent!");var a=["svg","png","jpg","jpeg"];t.downloaded=!0,t.array0=e.fileslist.map((function(t){var e=t.file_name.split(".").pop();return{file:t.file_name,title:t.file_name.split("/").pop(),key:Math.random(),format:e.includes("doc")?"doc":e.includes("pdf")?"pdf":e.includes("xls")?"excel":a.includes(e)?"photo":"file"}}))})).catch((function(e){t.$message.error("Server rejected!")})).finally((function(){t.loadingBtn=!1}))}},created:function(){var t;this.form.month=null===(t=this.$route)||void 0===t?void 0:t.params.date}},P=L,K=(a("2a00"),Object(p["a"])(P,n,o,!1,null,"65ad2440",null));e["default"]=K.exports},"2a00":function(t,e,a){"use strict";a("a528")},"3f8d":function(t,e,a){"use strict";a("09f9")},"5e4e":function(t,e,a){t.exports=a.p+"assets/docs.b168f4c9.svg"},7143:function(t,e,a){"use strict";var n=a("1da1"),o=(a("96cf"),a("d3b7"),{data:function(){return{fileList:[],previewImage:"",previewVisible:!1,uploadingImage:!1}},methods:{uploadImage:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.uploadingImage=!0,n=new FormData,n.append("file",t.file),a.next=5,e.$getBase64(t.file);case 5:o=a.sent,e.$store.dispatch("uploadImage",n).then((function(t){e.fileList.push({uid:t.filename,name:t.filename,status:"done",url:o})})).catch((function(t){})).finally((function(){e.uploadingImage=!1}));case 7:case"end":return a.stop()}}),a)})))()},handleChange:function(t){var e=t.fileList;0===e.length&&(this.fileList=e)},handlePreview:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.url||t.preview){a.next=4;break}return a.next=3,e.$getBase64(t.originFileObj);case 3:t.preview=a.sent;case 4:e.previewImage=t.url||t.preview,e.previewVisible=!0;case 6:case"end":return a.stop()}}),a)})))()}}});e["a"]=o},"931c":function(t,e,a){t.exports=a.p+"assets/image.eb5d81af.svg"},a528:function(t,e,a){}}]);