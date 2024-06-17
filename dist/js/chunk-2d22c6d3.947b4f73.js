(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c6d3"],{f2d5:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-navigation",{attrs:{list:[{name:t.$t("Список портфолио"),link:""}],isBack:{flag:!1,link:""}}},[n("a-button",{staticStyle:{float:"right"},attrs:{type:"primary",icon:"plus"},on:{click:function(e){return t.$router.push("/strategy/list/new")}}},[t._v(t._s(t.$t("button.create")))])],1),n("a-card",[n("a-table",{attrs:{loading:t.loader,columns:t.columns,"data-source":t.portfolios,"row-key":function(t){return t.id},scroll:{x:1e3},pagination:t.pagination,bordered:""},on:{change:t.getPagination},scopedSlots:t._u([{key:"min_percent",fn:function(e){return n("span",{},[n("strong",[t._v(" "+t._s(e.min_percent)+"% ~ "+t._s(e.max_percent)+"%")])])}},{key:"max_investment_amount",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$moneyFormat(e.max_investment_amount))+" ")])}},{key:"min_investment_amount",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$moneyFormat(e.min_investment_amount))+" ")])}},{key:"expected_profit",fn:function(e){return n("span",{},[t._v(" "+t._s(t.$moneyFormat(e.expected_profit))+" ")])}},{key:"status",fn:function(e){return n("span",{},[n("a-tag",{attrs:{color:t.getStatusColor(e.status)}},[t._v(t._s(t.$t(e.status)))])],1)}},{key:"actions",fn:function(e){return n("span",{},[n("delete-btn",{on:{confirm:function(n){return t.deletePortfolio(e)}}}),n("edit-btn",{on:{click:function(n){return t.$router.push("/strategy/list/edit/"+e.id)}}})],1)}}])})],1)],1)},i=[],s=n("5530");n("d3b7");function a(t,e){for(var n=0;n<t.length;n++)if(t[n].id===e)return t[n]}var r={data:function(){return{pagination:{current:1,showQuickJumper:!0},loader:!1,visible:!1,portfolios:[],selectedPortfolio:null,columns:[{title:this.$t("Portfolio.table.title"),dataIndex:"title.ru",key:"title",customCell:this.onRowClick},{title:this.$t("Portfolio.table.description"),dataIndex:"description.ru",key:"description",customCell:this.onRowClick},{title:this.$t("Portfolio.table.max_investment_amount"),scopedSlots:{customRender:"max_investment_amount"},key:"max_investment_amount",customCell:this.onRowClick},{title:this.$t("Portfolio.table.min_investment_amount"),scopedSlots:{customRender:"min_investment_amount"},key:"min_investment_amount",customCell:this.onRowClick},{title:this.$t("Portfolio.create.Risk_type"),dataIndex:"risk_type",customCell:this.onRowClick},{title:this.$t("Status"),scopedSlots:{customRender:"status"},key:"status",fixed:"right",width:120,customCell:this.onRowClick},{title:this.$t("Portfolio.table.Actions"),scopedSlots:{customRender:"actions"},key:"actions",width:120,fixed:"right"}]}},methods:{onRowClick:function(t,e){var n=this;return{on:{click:function(e){n.$router.push({name:"edit strategy",params:{id:t.id}})}}}},getPagination:function(t){this.pagination.current=t.current,this.getWingsList({page:t.current})},getStatusColor:function(t){var e;switch(t){case"active":e="cyan";break;case"inactive":e="red";break;case"archive":e="orange";break;default:e=""}return e},getSelectedPortfolio:function(t){this.selectedPortfolio=a(this.portfolios,t)},showModal:function(t){this.getSelectedPortfolio(t),this.visible=!0},handleOk:function(t){this.visible=!1},getPortfolios:function(t){var e=this;this.loader=!0,this.$store.dispatch("getPortfolios",t).then((function(t){e.portfolios=t.strategies;var n=Object(s["a"])({},e.pagination);n.total=+t.count,e.pagination=n})).finally((function(){e.loader=!1})).catch((function(t){e.$alertMessage(t.response.data.message)}))},deletePortfolio:function(t){var e=this;this.$store.dispatch("deletePortfolio",t.id).then((function(n){e.$deleteFromList(e.portfolios,t.id),e.$alertMessage("success","Deleted","deleted successfully",e)})).catch((function(t){e.$alertMessage(t.response.data.message)}))}},created:function(){this.getPortfolios({page:this.pagination.current})}},l=r,c=n("2877"),u=Object(c["a"])(l,o,i,!1,null,null,null);e["default"]=u.exports}}]);