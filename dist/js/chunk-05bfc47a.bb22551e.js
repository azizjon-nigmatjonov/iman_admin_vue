(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05bfc47a"],{"707b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-tag",{staticClass:"mx-1",staticStyle:{cursor:"pointer",width:"24px",height:"24px",display:"inline-flex","align-items":"center","justify-content":"center"},attrs:{color:"geekblue"},on:{click:function(e){return t.$emit("click")}}},["up"===t.type?a("a-icon",{attrs:{type:"caret-up"}}):a("a-icon",{attrs:{type:"caret-down"}})],1)},i=[],s={model:{prop:"value",event:"click"},props:{click:{type:Function,required:!1,default:function(){}},type:{type:String,default:"up"}}},r=s,c=a("2877"),o=Object(c["a"])(r,n,i,!1,null,"0c795e2c",null);e["a"]=o.exports},dbbb:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-navigation",{attrs:{list:[{name:t.$t("Subcategories"),link:"/advices/categories/"+t.$route.params.categoryId+"/subcategories"},{name:t.$t("Advices"),link:""}],isBack:{flag:!0,return:!0},noBorder:""}},[a("div",{staticStyle:{float:"right"}},[t.saveButtonVisible?a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{loading:t.saveButtonLoading},on:{click:t.saveOrder}},[t._v(t._s(t.$t("button.saveOrder")))]):t._e(),a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.push({name:"advices-create",params:{categoryId:t.$route.params.categoryId,subcategoryId:t.$route.params.subcategoryId}})}}},[t._v(t._s(t.$t("button.create")))])],1)]),a("a-card",{staticClass:"no-space-tab"},[a("a-card",[a("a-table",{attrs:{columns:t.columns,"data-source":t.advices,"row-key":function(t){return t.guid},size:"middle",pagination:t.pagination,loading:t.loading,bordered:""},on:{change:t.getPagination},scopedSlots:t._u([{key:"index",fn:function(e,n,i){return a("span",{},[t._v(" "+t._s(10*(t.pagination.current-1)+i+1)+" ")])}},{key:"actions",fn:function(e){return a("span",{},[a("arrow-btn",{attrs:{type:"up"},on:{click:function(a){return t.upButtonHandler(e)}}}),a("arrow-btn",{attrs:{type:"down"},on:{click:function(a){return t.downButtonHandler(e)}}}),a("edit-btn",{on:{click:function(a){return t.$router.push({name:"advices-edit",params:{id:e.guid,categoryId:t.$route.params.categoryId,subcategoryId:t.$route.params.subcategoryId}})}}}),a("delete-btn",{on:{confirm:function(a){return t.deleteAdvice(e)}}})],1)}},{key:"status",fn:function(e){return a("span",{},[a("a-switch",{on:{change:function(a){return t.updateIsActualProp(a,e)}},model:{value:e.is_actual,callback:function(a){t.$set(e,"is_actual",a)},expression:"text.is_actual"}})],1)}}])})],1)],1)],1)},i=[],s=a("5530"),r=(a("4de4"),a("d3b7"),a("c740"),a("d81d"),a("707b")),c={components:{arrowBtn:r["a"]},data:function(){return{advices:[],loading:!1,saveButtonVisible:!1,saveButtonLoading:!1,pagination:{current:1,showQuickJumper:!0},columns:[{title:"№",key:"index",width:70,scopedSlots:{customRender:"index"}},{title:this.$t("name"),key:"name",dataIndex:"title.ru"},{title:this.$t("investors.table.actions"),scopedSlots:{customRender:"actions"},key:"actions",width:200,fixed:"right"},{title:this.$t("status"),scopedSlots:{customRender:"status"},key:"status",width:80,fixed:"right"}]}},methods:{updateIsActualProp:function(t,e){var a=this;this.$store.dispatch("updateActualAdviceProp",{data:[{is_actual:t,guid:e.guid}]}).then((function(t){a.$alertMessage("success","Статус успешно обновлен","Он не удаляется. Был изменен статус актуальности",a),a.actualAdvices=a.actualAdvices.filter((function(t){return t.guid!==e.guid}))})).catch((function(t){a.$alertMessage("danger","Error",JSON.stringify(t),a)}))},upButtonHandler:function(t){var e=this.advices.findIndex((function(e){return e.guid===t.guid}));if(0===e)return null;var a=JSON.parse(JSON.stringify(this.advices));a[e]=a[e-1],a[e-1]=t,this.advices=a,this.saveButtonVisible=!0},downButtonHandler:function(t){var e=this.advices.findIndex((function(e){return e.guid===t.guid})),a=this.advices.length;if(e===a-1)return null;var n=JSON.parse(JSON.stringify(this.advices));n[e]=n[e+1],n[e+1]=t,this.advices=n,this.saveButtonVisible=!0},saveOrder:function(){var t=this,e=this.advices.map((function(t,e){return{guid:t.guid,position:e}}));this.saveButtonLoading=!0,this.$store.dispatch("updateAdvicesOrder",e).then((function(e){t.$alertMessage("success","Message","Updated successfully updated",t),t.saveButtonVisible=!1})).finally((function(){t.saveButtonLoading=!1}))},getPagination:function(t){var e={page:t.current,limit:10};this.pagination.current=t.current,this.getSubcategories(e)},getAdvices:function(t){var e=this;this.loading=!0,this.$store.dispatch("getAdvicesList",{subcategoryId:this.$route.params.subcategoryId,params:t}).then((function(t){e.advices=t.advices_list;var a=Object(s["a"])({},e.pagination);a.total=t.count,e.pagination=a,e.loading=!1})).catch((function(t){e.$alertMessage(t.response.data.message),e.loading=!1}))},deleteAdvice:function(t){var e=this;this.$store.dispatch("deleteAdvice",t.guid).then((function(t){e.$alertMessage("success","Deleted","Advice has deleted successfully",e);var a={page:e.pagination.current,limit:10};e.getAdvices(a)})).catch((function(t){t.response.data&&e.$alertMessage(t.response.data.message)}))},getList:function(){var t={page:this.pagination.current,limit:10};this.getAdvices(t)}},created:function(){this.getList()}},o=c,u=a("2877"),d=Object(u["a"])(o,n,i,!1,null,null,null);e["default"]=d.exports}}]);