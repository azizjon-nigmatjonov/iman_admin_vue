(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e95f0"],{"8cf5":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-navigation",{attrs:{list:[{name:t.$t("Список инвесторов"),link:""}],isBack:{flag:!0,link:"/investment/pools"}}}),n("a-card",[n("a-table",{attrs:{columns:t.columns,"data-source":t.investments,"row-key":function(t,e){return e},size:"middle",scroll:{x:1400,y:700},bordered:""},scopedSlots:t._u([{key:"actions",fn:function(e,s){return n("span",{},[n("icon-btn",{attrs:{icon:"eye",tooltip:t.$t("button.list")},on:{click:function(e){return t.showModal(s)}}})],1)}}])}),n("a-modal",{attrs:{footer:null},model:{value:t.visible.flag,callback:function(e){t.$set(t.visible,"flag",e)},expression:"visible.flag"}},[n("a-table",{attrs:{columns:t.columns1,"data-source":t.visible.data,"row-key":function(t){return t.id},size:"middle",scroll:{x:300,y:400},bordered:""}})],1)],1)],1)},i=[],o={data:function(){return{investments:null,visible:{flag:!1,data:null},columns1:[{title:this.$t("investor.Percent"),dataIndex:"percent_per_bond",key:"percent_per_bond"},{title:this.$t("investor.Amount"),dataIndex:"amount",key:"amount"}],columns:[{title:this.$t("Investor"),children:[{title:this.$t("investor.First_Name"),dataIndex:"investor.first_name",key:"first_name"},{title:this.$t("investor.Phone_Number"),dataIndex:"investor.phone_number",key:"phone_number"}]},{title:this.$t("Investments"),children:[{title:this.$t("investor.interest_percent"),dataIndex:"investment.interest_percent",key:"interest_percent"},{title:this.$t("investor.investment_amount"),dataIndex:"investment.investment_amount",key:"investment_amount"},{title:this.$t("investor.month_limit"),dataIndex:"investment.month_limit",key:"month_limit"},{title:this.$t("investor.status"),dataIndex:"investment.status",key:"status"}]},{title:this.$t("Portfolio.table.Actions"),scopedSlots:{customRender:"actions"},key:"actions",width:150,fixed:"right"}]}},methods:{showModal:function(t){this.visible.flag=!0,this.visible.data=t.bonds},getInvestments:function(t){var e=this;this.$store.dispatch("getPortfolioInvestment",t).then((function(t){e.investments=t.investments})).catch((function(t){e.$alertMessage(t.response.data.message)}))}},created:function(){this.getInvestments(this.$route.params.id)}},a=o,l=n("2877"),r=Object(l["a"])(a,s,i,!1,null,null,null);e["default"]=r.exports}}]);