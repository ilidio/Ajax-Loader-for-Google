/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    var cssNode = document.createElement("style");
    var selector = '#ID-loading,.jfk-butterBar-info ,#viewer-details-toggle.details-loading, #loading-area .message-area-text-container, #loadingStatus, .vZ, .L4XNt,#lo,#sites-notice,#loadmessagehtml';
    var declaration;
    var ajax_image = "";
    var cssStr = "";
    ajax_image = "data:image/png;base64,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";    // Images
    declaration = "background-image:url("+ajax_image+") ;background-repeat:no-repeat;";
    if (cssNode.addRule) {
        cssNode.addRule (selector, declaration, 0);
    } else {
        if (cssNode.insertRule) {
            cssNode.insertRule (selector+" {"+declaration+"}", 0);
        }
    }
    // ALL
    cssStr += selector+" {"+declaration+";background-position:2px 0px;}";
    cssStr += ".L4XNt{padding-left:25px;padding-right:3px;} ";
    // Google Docs
    cssStr +="#loadingStatus{background-position:5px 2px;padding-left:25px;auto !important} .message-area-text-container{ height:15px;} ";
    // Gmail
    cssStr += "#viewer-details-toggle.details-loading, #loadingStatus, .vZ, .L4XNt,#sites-notice{ height:17px !important;} ";
    // Google Calendar
    cssStr +=" #lo{padding-left:17px !important;background-color:#fff1a8 !important; color: black !important;background-size: 12px;background-position:2px 1px;} ";
    // Google Maps
    if(document.getElementById("loadmessagehtml")){
        cssStr  +=" #loadmessagehtml{padding-left:17px !important;background-position:12px 6px!important;} ";
    }
    // Google Sites
    if(document.getElementById("sites-status")){
        cssStr +=" #sites-notice{padding-left:21px !important;background-position:3px 2px;} ";
        document.getElementById("sites-notice").style.backgroundImage = "url("+ajax_image+") !important";
        document.getElementById("sites-notice").style.backgroundRepeat = "no-repeat";
    }
    //
    cssStr += '#loading-area .message-area-text-container {height: 17px;}';
    cssStr += '#loading-area-text{ margin-left: 4px;}  #loading-area .message-area-text-container{ padding-left: 23px; }';
    // Google Analytics
    cssStr +="#ID-loading{padding-left:27px;background-position: 6px 2px;}";
    // InnerHTML
    cssNode.innerHTML = cssStr;
    // Add CSS Node
    document.body.appendChild(cssNode);
/******/ })()
;
//# sourceMappingURL=content.js.map