(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8fe6"],{"8c49":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-card",{staticClass:"mb-1",attrs:{size:"small"}},[n("a-breadcrumb",[n("a-breadcrumb-item",[n("a-button",{attrs:{icon:"left",size:"small",type:"link"},on:{click:function(e){return t.$router.go(-1)}}},[t._v(t._s(t.$t("Назад")))])],1)],1)],1),n("a-card",[n("a-table",{attrs:{columns:t.columns,"data-source":t.products,"row-key":function(t){return t.id},loading:t.loading,bordered:""},scopedSlots:t._u([{key:"index",fn:function(e,i,r){return n("span",{},[t._v(" "+t._s(t.length>1&&r+1===t.length?t.$t("overall"):r+1)+" ")])}},{key:"max_investment_amount",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$moneyFormat(e.max_investment_amount)))])}},{key:"min_investment_amount",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$moneyFormat(e.min_investment_amount)))])}},{key:"min_percent",fn:function(e){return n("span",{},[n("strong",[t._v(" "+t._s(e.min_percent)+"% ~ "+t._s(e.max_percent)+"%")])])}},{key:"discounted_price",fn:function(e){return n("span",{},[t._v(" "+t._s(e.discounted_price?Number(e.discounted_price).toFixed(2):""))])}},{key:"actions",fn:function(e){return n("span",{staticClass:"span"},[n("delete-btn",{on:{confirm:function(n){return t.deleteCategory(e)}}}),n("edit-btn",{on:{click:function(n){return t.$router.push("/category/list/edit/"+e.id)}}})],1)}}])})],1)],1)},r=[],s=(n("d3b7"),{data:function(){return{loading:!1,columns:[{title:"№",scopedSlots:{customRender:"index"},key:"index"},{title:this.$t("product_name"),dataIndex:"name",key:"name"},{title:this.$t("model"),dataIndex:"model",key:"model"},{title:this.$t("count"),dataIndex:"count",key:"count"},{title:this.$t("cost_with_nds"),dataIndex:"price",key:"price"},{title:this.$t("overall_price_with_nds"),dataIndex:"overall_price",key:"overall_price"},{title:this.$t("measurementUnit"),dataIndex:"measurement_unit",key:"measurement_unit"},{title:this.$t("price_without_nds"),dataIndex:"price_without_nds",key:"price_without_nds"},{title:this.$t("nds_price"),dataIndex:"price_nds",key:"price_nds"},{title:this.$t("discounted_price"),scopedSlots:{customRender:"discounted_price"},key:"discounted_price"}],products:[],length:void 0}},methods:{getSingleScoring:function(t){var e=this;this.loading=!0,this.$store.dispatch("getSingleScoringNew",this.$route.params.id).then((function(t){e.products=t.products,t.products.length>1&&e.products.push({name:"",model:"",category:"",price:"",count:t.all_products_count,overall_price:t.all_products_price,price_without_nds:t.all_products_price_without_nds,price_with_nds:t.all_products_price_with_nds,price_nds:t.all_products_price_nds}),e.length=e.products.length})).catch((function(t){e.$alertMessage(t.response.data.message)})).finally((function(){e.loading=!1}))}},created:function(){this.getSingleScoring(this.$route.params.id)}}),o=s,c=n("2877"),a=Object(c["a"])(o,i,r,!1,null,null,null);e["default"]=a.exports}}]);