(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{"ct+p":function(t,o,n){"use strict";n.r(o),n.d(o,"HomePageModule",(function(){return f}));var i=n("Valr"),e=n("QJY3"),b=n("sPEm"),c=n("DUip"),r=n("9587"),a=n("Fa2m"),s=n("TYT/"),u=n("j+Tt");function h(t,o){if(1&t&&(s.Mb(0,"ion-card-content"),s.Mb(1,"ion-item"),s.Mb(2,"ion-label"),s.gc(3,"Host"),s.Lb(),s.gc(4),s.Lb(),s.Mb(5,"ion-item"),s.Mb(6,"ion-label"),s.gc(7,"Port"),s.Lb(),s.gc(8),s.Lb(),s.Mb(9,"ion-item"),s.Mb(10,"ion-label"),s.gc(11,"Header"),s.Lb(),s.gc(12),s.Lb(),s.Mb(13,"ion-item"),s.Mb(14,"ion-label"),s.gc(15,"Key"),s.Lb(),s.gc(16),s.Lb(),s.Mb(17,"ion-item"),s.Mb(18,"ion-label"),s.gc(19,"Extrapath"),s.Lb(),s.gc(20),s.Lb(),s.Lb()),2&t){var n=s.Wb();s.zb(4),s.hc(" ",n.hostData.host," "),s.zb(4),s.hc(" ",n.hostData.port," "),s.zb(4),s.hc(" ",n.hostData.customHeader," "),s.zb(4),s.hc(" ",n.hostData.customHeaderValue," "),s.zb(4),s.hc(" ",n.hostData.extrapath," ")}}function p(t,o){1&t&&(s.Mb(0,"ion-card-content"),s.Mb(1,"p"),s.gc(2,"There is no Host set."),s.Lb(),s.Lb())}var l=function(){function t(t,o,n,i){var e=this;this.storage=t,this.rpiService=o,this.helper=n,this.platform=i,this.host="",this.hostinput="",this.platform.backButton.subscribeWithPriority(1,(function(){e.routerOutlet&&e.routerOutlet.canGoBack()&&e.routerOutlet.pop()}))}return t.prototype.ionViewWillEnter=function(){this.getHost()},t.prototype.ionViewDidEnter=function(){this.subscription=this.platform.backButton.subscribe((function(){navigator.app.exitApp()}))},t.prototype.ionViewWillLeave=function(){this.subscription.unsubscribe()},t.prototype.getHost=function(){var t=this;this.rpiService.getHost().then((function(o){t.hostinput=o,t.host=o,t.hostData=JSON.parse(o)}))},t.\u0275fac=function(o){return new(o||t)(s.Jb(u.b),s.Jb(r.b),s.Jb(a.a),s.Jb(b.M))},t.\u0275cmp=s.Db({type:t,selectors:[["app-home"]],viewQuery:function(t,o){var n;1&t&&s.jc(b.A,!0),2&t&&s.bc(n=s.Vb())&&(o.routerOutlet=n.first)},decls:15,vars:2,consts:[["slot","start"],[1,"welcome-card"],[4,"ngIf"]],template:function(t,o){1&t&&(s.Mb(0,"ion-header"),s.Mb(1,"ion-toolbar"),s.Mb(2,"ion-buttons",0),s.Kb(3,"ion-menu-button"),s.Lb(),s.Mb(4,"ion-title"),s.gc(5," Home "),s.Lb(),s.Lb(),s.Lb(),s.Mb(6,"ion-content"),s.Mb(7,"ion-card",1),s.Mb(8,"ion-card-header"),s.Mb(9,"ion-card-title"),s.gc(10,"Welcome to the Frontend"),s.Lb(),s.Mb(11,"ion-card-subtitle"),s.gc(12,"Raspberry Pi Radio Alarm"),s.Lb(),s.Lb(),s.fc(13,h,21,5,"ion-card-content",2),s.fc(14,p,3,0,"ion-card-content",2),s.Lb(),s.Lb()),2&t&&(s.zb(13),s.Zb("ngIf",o.host),s.zb(1),s.Zb("ngIf",!o.host))},directives:[b.s,b.H,b.g,b.x,b.F,b.o,b.h,b.j,b.l,b.k,i.i,b.i,b.v,b.w],styles:[".welcome-card[_ngcontent-%COMP%]   ion-img[_ngcontent-%COMP%]{max-height:35vh;overflow:hidden}"]}),t}(),f=function(){function t(){}return t.\u0275mod=s.Hb({type:t}),t.\u0275inj=s.Gb({factory:function(o){return new(o||t)},imports:[[i.b,e.a,b.I,c.i.forChild([{path:"",component:l}])]]}),t}()}}]);