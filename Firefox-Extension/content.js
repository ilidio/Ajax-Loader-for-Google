(function() {
    chrome.storage.local.get(["google_reader_ajaxloader", "background_color", "background_border_color", "background_font_color"], function(response) {
        var ajxloader = response["google_reader_ajaxloader"];
        var cssStr = "";
        var cssLoader = "";
        var cssNode = document.createElement("style");
        var selector = '#ID-loading,.jfk-butterBar-info ,#viewer-details-toggle.details-loading, #loading-area .message-area-text-container, #loadingStatus, .vZ, .L4XNt,#lo,#sites-notice,#loadmessagehtml, #sites-status, .sites-status,.sites-notice,#sites-notice';
        var declaration = "";
        var ajax_image = "";
        var array_random = [
            "css/indicator.css", "css/google.css", "css/circleball.css", "css/bouncingball.css",
            "css/facebook.css", "css/flower.css", "css/kit.css", "css/roller.css",
            "css/snake.css", "css/wheel.css", "css/3drotation.css", "css/arrows.css",
            "css/circleball1.css", "css/radar.css", "css/static.css"
        ];

        var background_color = response["background_color"] || "#FFF1A8";
        var background_border_color = response["background_border_color"] || "#FFF1A8";
        var background_font_color = response["background_font_color"] || "#222222";

        const customizableLoaders = [
            "css/indicator.css",
            "css/indicator2.css",
            "css/bouncingball.css",
            "css/3drotation.css",
            "css/circleball1.css",
            "css/refresh.css",
            "css/spinner_v2_0.css",
            "css/white_spinner.css"
        ];

        // If is random picker
        if (ajxloader === "#random#") {
            var rand_no = Math.floor(Math.random() * array_random.length);
            ajxloader = array_random[rand_no];
        }

        // Helper to get background colors
        function getColors(loader) {
            if (customizableLoaders.includes(loader)) {
                return { bg: background_color, border: background_border_color, font: background_font_color };
            }
            return { bg: "#FFF1A8", border: "#FFF1A8", font: "#222222" };
        }

        // Loader selection
        if(ajxloader=="css/indicator.css" || typeof(ajxloader) == 'undefined'){
            ajax_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAf8/9hAAAACGFjVEwAAAAMAAAAAEy9LREAAAAaZmNUTAAAAAAAAAAQAAAAEAAAAAAAAAAAAEYD6AEAKF3RHQAAAWdJREFUOI190stqVEEYBODvzGgcFWICmgveAhpCDAoJhhDRlcF3UHe+gQsfwDfwPXwFl4LZmeDCGAcXigoiXiCOOOBl0XWScWaSggPd9N9VdaqaQTR61rfwGM0hcwPDMI1HWMj+PG5kfTiEFw8i+INreJB9C138DukEdnov1NamcQyf8B738BLnsIinuIRX2I6bk+g04+I+7uJbhpfi5kn2Z/ED6ziF65hDu4qDGdzGchQehuBXj9NGiGfxBZtx+x+u4s6QbGosRHkXFdYwib8J6xne7kNwHJcxkrudQwljIgRdB3QeZ6M4EoIBp6dxJYfDMJOZXdRqLaxgValzWwmxH0sRGMVXdJtRuxnmF0pViziBDo5iSgl4XXlIc7iAdu2gsvdIxpU63+EM5vEhyh1s5WwHn+sQ2viopLsSe68TVisEb+JsHN/r3+xPcSyXniutNPJV2MBPpfJ9UUWxN7Q1e62M6Kv5H9LRR9JmZE03AAAAGmZjVEwAAAABAAAAEAAAABAAAAAAAAAAAABGA+gBALMuO8kAAAGDZmRBVAAAAAI4jX3STW/MURgF8N/Mf1otHWK8NFiQkYioBJsuKiHRiBUJK1/ASkhs+Co+gE9jIZGQaDVpQhuJibYo9dJRi3v+MsbE2dznPvfc87zyI3ahhWbu1/EAVe4Hhvh/iDU6eIRT+XQT87E7uIN7owTqcwsncBt9vMJ47Ku4j7VBgQoNdLEf7yJyA0u4jE/x3UUPD/PnOD5WEbmFs9iLRbQxiSf4kqjX8BgfcAmHsN5IJidT60G8xnO8wbe8t3EeR5Umr+AtViWdGvO4GNIwmhHpYl/tbOECJpLSalLujxD4hRcJMKWMdK2Zh+nU2U0jd0YISJDP4cGxur5KaVoHM/7djxqHMRv+lBg/sDuqs/iKnyllEG2cTrbT2MRmC2OYC2EZ75PaRESaiXYEC9hWdmAM61Xq/a6MZlnZhTPxTybqUrLbwjNlobbRa4a4okyg/rCDp4ncT+MWcC6+nrLm/eFmVcpoXyrTaWFP3haxkUb+F+0BewZXItRQZj8+SP4NyuJTJILEsvwAAAAaZmNUTAAAAAMAAAAQAAAAEAAAAAAAAAAAAEYD6AEAXrjoIAAAAYpmZEFUAAAABDiNddNLb8xhFAbw339m6jp03KJ1rbrENUaiYmFBIjZEbCys+AA+gq9h4Xt0YcGarUjqkpYQQfVCWhJtYli8zySTMT2b93bOc855zvPyv42gyv427mRfoYHhXudaX/BJ3MDxnI/hMtbjCB5mHQhQYRE7MJFsHXzCCu7iEr73xtZzOBjnhWQ7gXXYiL2YwwM8wmMcwChWG9iKo9iOabzBHnzAT0ziIp7iCa7jFtq4KaWOxOkergRgqI+fNu5jBq8Dop5eltP/5zjP4E8fwDecwV9cC0hV4XR6+opdeIYlg+0qfqftRQzVsC0V7MOsMoW17HmCZ5NsufuwIetZ7F8juMJhhZ9m7jZ1x7gT55TRDGNe4aCT926lo7gQsFUsdUlsK/P+gpeKIlsBaWFLss/H5xDG8K7ek2EarwLUxgucCkAH4/iFtwrhC/hRU8byPpcNnFdENKdIuIkpRcJj2J39R3T6P1NLUd9Usm5WJC2trfTwMtAaiqRrIWCUiyMAAAAaZmNUTAAAAAUAAAAQAAAAEAAAAAAAAAAAAEYD6AEAs3KaWgAAAXpmZEFUAAAABjiNddNfSxVRFAXw3525XrWCTFBTAyOiMlFIC3rpwcAk+gIlvvvqB+ibRBBBH8JnoUdJSPxDlhaRiJgvNy3808PZE9P13g0D6OAgAgAAOw==";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";	
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader=="css/indicator2.css"){
            ajax_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACGFjVEwAAAAMAAAAAEy9LREAAAAaZmNUTAAAAAAAAAAQAAAAEAAAAAAAAAAAAFMD6AEAgF3J7wAAAW1JREFUOI19079LlVEYB/DP670qCYIiJpi4FQVJlC6Rba1Rg/gHtARJS61tIfgPJEGLQzgJOTjoYgUiLlFTQbUYCgqXorDMMnU4zxuH6/V+4eGc8/z4vs95v8+hOR6HnYiWuvNFzGMkzqNh5f4NhpsR/EUPHqCa+VsxidOR8x+VWM+jC58wgCvYyTqp4DZeYAaXMYjNIhJm0I3XWMAT7Edhgf7oYgz3MY5tnCsJLuEuzmAP76PdZ0HwCDXcRAc+4yFe5dep4hZmMeU4lvAF96Ibgv0OhrLEQzzFxzqCa3iO9sy3WK9CSXDYwL/XyF9k+0p85Qa2MF2X2482+MOPkqwkOCvJ1Cvp/EFS4SUOJGl/RqyItYbdcg4mJBnfYk7S/5 (too large, truncated)...";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader=="css/google.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEgASAKIFAKav0iA4j3mIvE1gpb3E3u7u7gAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAFACwAAAAAEG1lEgASAAADQli63N4hvBnjXGOUKgl5WbZ13teE2lKaZ8p4jiBcBazI8rTeuF4uuYuNAQA4hsSiUfVrKI2wnaNY+yEfUhpTy10kAAAh+QQFAAAFACwBAAEADgAOAAADLFi6NcNQOReLEG2WENa92cZ11seMZBlxCgBUjOvCrUzXN0MQ+b7fPh5QWEkAACH5BAUAAAUALAEAAQAQAAoAAAMmWLolwpA5FxchbZYx4L3ZxnXWx4xkGXEMWClBUHxYFcf0e8uuLicAIfkEBQAABQAsBwABAAoADgAAAyJYANWuiz24ihCv3jvt7h7oDANIkt1ZpusTBOD7djJM20UCACH5BAUAAAUALAcAAQAKABAAAAMqWETVros9uAoAr9477e4e6AgCSJLdWabrMwzg+zpBUMhwUdd3ru8gXicBACH5BAUAAAUALAMAAwAOAA4AAAMtWLpLxFA5F9l8teHMAOCK54HiR5pBEAnCkqYMyyqvOgyF3NL2jc8RHw50qyQAACH5BAUAAAUALAEABwAQAAoAAAMrWBHV/oSoxZ6LkVZbsFwcJDnDwAGAVZYPij6rKQiFm8LyTL9hodO9xyyUAAAh+QQFAAAFACwBAAMADgAOAAADLVgaof6LNfjkpI5hN8bmnfeF4lh+iiBQBOGo6tO2KVwAQDG79Y3nNMovh8JBEgA7";		
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/circleball.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEAAQAPIAAP/xqAAAAMK4gEI+KwAAAGJcQIJ7VZKKYCH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;background-position:3px 2px;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/bouncingball.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEAAQAPIAAO7u7gAAALW1tXl5eQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADGwi6MjRiSenIm9hqPOvljAOBZGmeaKqubOu6CQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAIfkECQoAAAAsAAAAABAAEAAAAxwIutz+UIlBhoiKkorB/p3GYVN1dWiqrmzrvmkCACH5BAkKAAAALAAAAAAQABAAAAMbCLrc/jDKycQgQ8xL8OzgBg6ThWlUqq5s604JACH5BAkKAAAALAAAAAAQABAAAAMbCLrc/jDKSautYpAhpibbBI7eOEzZ1l1s6yoJACH5BAkKAAAALAAAAAAQABAAAAMaCLrc/jDKSau9OOspBhnC5BHfRJ7iOXAe2CQAIfkECQoAAAAsAAAAABAAEAAAAxoIutz+MMpJ6xSDDDEz0dMnduJwZZulrmzbJAAh+QQJCgAAACwAAAAAEAAQAAADGwi63P4wRjHIEBJUYjP/2dZJlIVlaKqubOuyCQAh+QQJCgAAACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAOwAAAAAAAAAAAA==";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;background-position:3px 2px;";
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader=="css/facebook.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEAALAPQAAP/xqAAAANrOkNDFieremgYFAwAAAC4rHoJ7VWBbP7qweyIgFkpGMIqCW2ReQr60fSYkGQQDAk5KM+bamNjMjvTnoTg1JdzQkfLloLaseKCXacq/he7hnQAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQACwADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mv4BAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;background-position:3px 2px!important;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/flower.css"){
            ajax_image = "data:image/gif;base64,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";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/kit.css"){
            ajax_image ="data:image/gif;base64,R0lGODlhEAAQAPMAAP/xqAAAAAAAAIJ7VXJsS6ifb7yyfM7DiN7SkpSMYejcmWhiRAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkEAAoAAQAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAAKAAIALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQACgADACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkEAAoABAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkEAAoABQAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkEAAoABgAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAAKAAcALAAAAAAQABAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQACgAIACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAAKAAkALAAAAAAQABAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQACgAKACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkEAAoACwAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkEAAoADAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkEAAoADQAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADs=";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/roller.css"){
            ajax_image= "data:image/gif;base64,R0lGODlhEAAQAPYAAP/xqAAAAPrtpZKKYIiBWe7hnci9hNjMjp6VaAAAAI6GXca7gjIvIVJNNuzfnKadbZSMYfLloIJ7VRwaErKodaSbbJqSZfTnofjrpKifb87DiERALAwLB2BbP97SkujcmbyyfConGzYzI0ZCLtTJjMS5gTw4J05KMz46KUhEL9DFicq/hVpVO7Sqd+remnBqSqyjcbiuebqwe15ZPlxXPGJcQIZ/WODUlH53U/zvpqKZaxgWDywpHVZROAQDAlBLNMzBhjg1JVhTOhoYEfDjntbLjZyUZ+LWlebamEA8KqqhcCQiFyAeFa6lc3JsS0pGMDQxImpkRtLHisC2fiYkGXx1UkI+K1RPNwoJBggHBbCmdOTYlkxIMvbporaseGZgQ2hiRNzQkaCXaRIRCyIgFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAIAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAHaIAAgoMgIiYlg4kACxIaACEJCSiKggYMCRselwkpghGJBJEcFgsjJyoAGBmfggcNEx0flBiKDhQFlIoCCA+5lAORFb4AJIihCRbDxQAFChAXw9HSqb60iREZ1omqrIPdJCTe0SWI09GBACH5BAAIAAEALAAAAAAQABAAAAdrgACCgwc0NTeDiYozCQkvOTo9GTmDKy8aFy+NOBA7CTswgywJDTIuEjYFIY0JNYMtKTEFiRU8Pjwygy4ws4owPyCKwsMAJSTEgiQlgsbIAMrO0dKDGMTViREZ14kYGRGK38nHguHEJcvTyIEAIfkEAAgAAgAsAAAAABAAEAAAB2iAAIKDAggPg4iJAAMJCRUAJRIqiRGCBI0WQEEJJkWDERkYAAUKEBc4Po1GiKKJHkJDNEeKig4URLS0ICImJZAkuQAhjSi/wQyNKcGDCyMnk8u5rYrTgqDVghgZlYjcACTA1sslvtHRgQAh+QQACAADACwAAAAAEAAQAAAHZ4AAgoOEhYaCJSWHgxGDJCQARAtOUoQRGRiFD0kJUYWZhUhKT1OLhR8wBaaFBzQ1NwAlkIszCQkvsbOHL7Y4q4IuEjaqq0ZQD5+GEEsJTDCMmIUhtgk1lo6QFUwJVDKLiYJNUd6/hoEAIfkEAAgABAAsAAAAABAAEAAAB2iAAIKDhIWGgiUlh4MRgyQkjIURGRiGGBmNhJWHm4uen4ICCA+IkIsDCQkVACWmhwSpFqAABQoQF6ALTkWFnYMrVlhWvIKTlSAiJiVVPqlGhJkhqShHV1lCW4cMqSkAR1ofiwsjJyqGgQAh+QQACAAFACwAAAAAEAAQAAAHZ4AAgoOEhYaCJSWHgxGDJCSMhREZGIYYGY2ElYebi56fhyWQniSKAKKfpaCLFlAPhl0gXYNGEwkhGYREUywag1wJwSkHNDU3D0kJYIMZQwk8MjPBLx9eXwuETVEyAC/BOKsuEjYFhoEAIfkEAAgABgAsAAAAABAAEAAAB2eAAIKDhIWGgiUlh4MRgyQkjIURGRiGGBmNhJWHm4ueICImip6CIQkJKJ4kigynKaqKCyMnKqSEK05StgAGQRxPYZaENqccFgIID4KXmQBhXFkzDgOnFYLNgltaSAAEpxa7BQoQF4aBACH5BAAIAAcALAAAAAAQABAAAAdogACCg4SFggJiPUqCJSWGgkZjCUwZACQkgxGEXAmdT4UYGZqCGWQ+IjKGGIUwPzGPhAc0NTewhDOdL7Ykji+dOLuOLhI2BbaFETICx4MlQitdqoUsCQ2vhKGjglNfU0SWmILaj43M5oEAOw==";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/snake.css"){
            ajax_image = "data:image/gif;base64,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";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/wheel.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEAAQAPUAAP/xqAAAAO7hnVRPNwAAALasePbpotbLjeLWlWZgQwgHBb60fU5KM9zQkRwaEiglGujcmWxmRyIgFkZCLpiQZH53U8q/hYyEXKqhcPzvptDFiYZ/WGBbPxYUDnJsS8S5gVpVO5KKYKSbbEA8Ki4rHjQxIp6VaHhxTw4NCTo3JrCmdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAGo0CA0IDJAAhIR0YgbDYmhAKggyQIDp/mwYGcADzIEGDT0QgRjyrgQHAYIMiRgAmhII0EDGBUFQ0SCAAGD0YNAiJIAwtHSBUQGQZNCEZNVQQSTZkWEQpIChEWQpQAApYEmRkLgQAZGRpQSAALA0kQTQlCBSQlBZahDEIECotvBgxIwL1ZVYBCBxIEGgadIAAcSB0NWhdjahoEI9qZttexABiRQkEAIfkEAAoAAQAsAAAAABAAEAAABmBAgBAgGhGEhJFoyGQQnsjniCk0PY+Aq4eZQACs2OfWcCI+vVbkWEEoXtHCtfR6ZhrYV6p+z9fTCVtDYFdGYgAGQmiEIoZ3SIptACNyUWgMdnhRBF5UJ3lZTwl7bkhKTEEAIfkEAAoAAgAsAAAAABAAEAAABp1AgBAAGRGOQoxhKNRoAI8jAaAhjA7DQwcEWBy5HOnSwDh+MuUPQEp4FqQowGFqOA6ez8XgeMogAAgoZwAbXEN+TA0GKg5SChEWTEMgbJUFkgAWCQpsHRhMAggZTEYboxdDBkYEAwsABU8QKQSjIwACbCIZGRVScgSoF0cjAgAZHUcTAB5HAgIOHU9CEBMEl8gECRkf0qkYo1IMEExBADs=";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader=="css/3drotation.css"){
            ajax_image ="data:image/gif;base64,R0lGODlhEgAPAPIAAO7u7gAAAAAAAFZWVqioqAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJBQAAACwAAAAEgAPAAADHAi63P4wykmrvThXIS7n1tcBAwWSQwkQBKVqTgIAIfkECQUAAAAsAAAAABIADwAAAx4Iutz+MMpJq23iAsF11sowXKJolSNAUKZKrBcMPgkAIfkECQUAAAAsAAAAABIADwAAAxwIutz+MEogxLw4q6HB+B3XKQShlWWGmio7vlMCACH5BAkFAAAALAAAAAASAA8AAAMXCLrcvuLJ+cagOGtHtiKgB3RiaZ5oiiUAIfkECQUAAAAsAAAAABIADwAAAxQIuty+48knJCEz6827/2AojiSYAAAh+QQJBQAAACwAAAAEgAPAAADFAi63L7kyTemvTgvobv/YCiOJJAAACH5BAkFAAAALAAAAAASAA8AAAMTCLrc/jAqIqu9duDNu4/CJ45XAgAh+QQJBQAAACwAAAAEgAPAAADFAi63P4wykmrBeTqzTsbHiUIIZcAACH5BAkFAAAALAAAAAASAA8AAAMXCLrc/jDKSau9OOvtiBSYICrDQIFckwAAOw==";
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';	
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader=="css/arrows.css"){
            ajax_image = "data:image/gif;base64,R0lGODlhEAAQAPQAAP/xqAAAAPjrpDg1JYR9VwYFAyYkGdbLjaifbxYUDnZvTmZgQ+TYlpiQZMa7gkhEL1ZROAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOw==";
            declaration = "background-image:url("+ajax_image+");background-repeat:no-repeat;";
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader == 'css/circleball1.css'){
            ajax_image = 'data:image/gif;base64,R0lGODlhEAAQAPIAAO7u7gAAAL29vVtbWxAQEAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADHgiqMjRiSTmKHTMTW0ie1fVJzRONaKqubOu+cCzLCQAh+QQJCgAAACwAAAAAEAAQAAADHwi63M5ikCEeGyUPu0guBKdgmghEU2WubOu+cCzPTgIAIfkECQoAAAAsAAAAABAAEAAAAx0Iutz+MMpJqRhkiDmKHxPhFQQ3gtKVbVXrvnC8JAAh+QQJCgAAACwAAAAAEAAQAAADHQi63P4wykmrvTiLQYaYQyEOEyEWBHiS0tZ9GZYAACH5BAkKAAAALAAAAAAQABAAAAMdCLrc/jDKSau9OFMxyBDTUIzDRIwFEaKlxHmgtiQAIfkECQoAAAAsAAAAABAAEAAAAx0Iutz+MMpJq704ikGGmEMhDhMhFgR4ktLWfVnsJAAh+QQJCgAAACwAAAAAEAAQAAADHQi63P4wykmVGGSIOYofE+EVBDeC0pVtVeu+cFwlACH5BAkKAAAALAAAAAAQABAAAAMeCLrcKoMM4dooeFRGcCHbcmXhE01lqq5s675wLDcJADs=';
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';	
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader == 'css/radar.css'){
            ajax_image = "data:image/gif;base64,R0lGODlhEAAQAPYAAP/xqAAAAAAAAD46KZaOY5iQZJyUZ56VaERALDw4J5CIX5KKYJSMYaCXaaKZa6adbUhELzo3JoyEXI6GXaSbbKifb6yjcYqCW6qhcK6lc7CmdDg1JYiBWbKodbSqd0xIMoR9V4Z/WLaseLiuebqwe7yyfL60fejcmcK4gPzvpvbpotbLjc7DiMq/hci9hMa7gmpkRvrtpfDjntzQkdDFiczBhlRPN/jrpPTnoe7hneDUlNrOkNLHimhiROzfnOLWldjMjlhTOmZgQ/LloOTYlt7SklpVO2ReQureml5ZPkI+K0pGMEA8KpqSZU5KM1JNNsC2fsS5gYJ7VebamNTJjDYzI2xmR2BbP2JcQEZCLlBLNFxXPFZROAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAHuYAAgoIChYaDiACFGyAggjCFiQIRFxwhjoIpPQKDAgkSlZeZMTdCnIoKE6AcmCk3KjicAgMLqaAhgjGwQ0eFBAwMtRIcACmwMjI5hQXMvwsSACrJPj5IhQbY2QYn3N0nhQcNDQ4ODxkoKzM6P0REhQgOFA8YGSIoLCs7M0VJsg8V9DqQQNGCxgogM04JgGAhQwcRJVC4YMFjhZFTiiBo8DAi4osaNIJgJCTgAwkTKF7YiJSIpKGRAAIBACH5BAAKAAEALAAAAAAQABAAAAe+gACCggKFhoOIAIUJEhccIVWFiQIDCwoTjiFSLFYCgwJMBAwLExIcUgaCMJ6KTQWiChKaP4IpngJKBwZNBKRSFrUpPYUNDQcHvBISQwApMTc3hRQUDg7GE1EAzyrchRXf4BRTKkPl5YUW6RYaHSU8Okg+OTkyhUsZ7CIkUSw7P1MnkGC51cHDCBJQXrBYMeMHkSmsBHw4aCKKCxZUdhT5cYWVIicmULxogRHIjCQeCQl4MpIFDyOSEqk0lBJAIAAh+QQACgACACwAAAAAEAAQAAAHuYAAgoIChYaDiACFTAwLChIRhYkCSk0FjRMSFxwbAoMCCAcGlwuZFyEhnYQODQdNBKWbIVIhngJZDxQNowsSHFJSGjhWhRYYuQ1NC7MNU58CGRnGDw0SDCuTAh3bGhkVI4Mp4imFIiIjIyQkUzg37jcxMYVOJSZQUS07Jzk4OCoqPWxBQfGiBY8dRJDkkDEEhydFTwqyoLJDxxSFMo48VGSjBo0VFYmc8KExWxCQOohckZSIkCGWgwIBACH5BAAKAAMALAAAAAAQABAAAAe2gACCggKFhoOIAIUIBwYFBAOFiQIQDw4NjgwLCgkCg5QWFRSYBQwKExIRnooaGRiWBgQLqBcXngIfHh2uDgamEhccHBuFJCMiuw8GC8AcISEghSYlJSQiGQYSziDc0QIo4OEniYQCLy8uLSwrJyopkwI2NSw0KzMnMioxKe8wtzQ8VuzQcSIHDhU39q0SEGQFkBk/TviQcfBGj1WKjMwoQkSijCE4hGAsl6QjkhxHJJFTZEjloEAAIfkEAAoABAAsAAAAABAAEAAAB7uAAIKCAoWGg4gAhUsWFRQNSoWJAk4eGo2PBk1MAoMCWiQiHRmOBwYFBAOdilAmJJYVDqcEDAudAk9RrSMdGA1NtQoKCYUuLi9RJiIUBQwKExLRhTXUNS4oLQ1SF9zchTQ0PDxUQD4AUCBSIRwchVQrQEBFRDKCMhlS6oVGOzPzSENupBCkw0CVW0V0/JjiY4iKGIhWCUiy8EQOhwIFWVml6MoJJBdx3IiRAgZH";
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader == 'css/static.css'){
            ajax_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppS";
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';		
            cssLoader += ".vX .vh {background-color: #FFF1A8!important;border-color: #FFF1A8!important;}";
        }else if(ajxloader == 'css/refresh.css'){
            ajax_image = 'data:image/gif;base64,R0lGODlhEAAQAPEAAO7u7gAAADIyMgAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAACLYSPacLtvkA7U64qGb2C6gtyXmeJHIl+WYeuY7SSLozV6WvK9pfqWv8IKoaIAgAh+QQJCgAAACwAAAAAEAAQAAACLYSPacLtvhY7DYhY5bV62xl9XvZJFCiGaReS1Xa5ICyP2jnS+M7drPgIKoaIAgAh+QQJCgAAACwAAAAAEAAQAAACLISPacLtvk6TE4jF6L3WZsyFlcd1pEZhKBixYOie8FiJ39nS97f39gNUCBEFACH5BAkKAAAALAAAAAAQABAAAAIshI9pwu2+xGmTrSqjBZlqfnnc1onmh44RxoIp5JpWN2b1Vdvn/ZbPb1MIAQUAIfkECQoAAAAsAAAAABAAEAAAAi2Ej2nC7b7YaVPEamPOgOqtYd3SSeFYmul0rlcpnpyXgu4K0t6mq/wD5CiGgAIAIfkECQoAAAAsAAAAABAAEAAAAiyEj2nC7b7akSuKyXDE11ZvdWLmiQB1kiOZdifYailHvzBko5Kpq+HzUAgRBQA7AAAAAAAAAAAA';
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';		
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader == 'css/spinner_v2_0.css'){
            ajax_image = 'data:image/gif;base64,R0lGODlhEgASAKIEAP/MAMwAMzNm/wCZM////wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOENCOTk0ODFEMDRBNjc3RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDREQ1QUJFNjY2NDMxMUUxQThDMkFDMkNCRTQ0MTk5QSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDREQ1QUJFNTY2NDMxMUUxQThDMkFDMkNCRTQ0MTk5QSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTFBQjA4QzJCNTZBOTE5OTRFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE4Q0I5OTQ4MUQwNEE2NzdGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQEABAAsAAAAABIAEgAAAxFIutz+MMpJq7046827/yCYAAAh+QQFAQAEACwGAAAABgAGAAADBii63P4wAQAh+QQFAQAEACwMAAYABgAGAAADBhi63P4wAQAh+QQFAQAEACwGAAwABgAGAAADBji63P4wAQAh+QQFZAAEACwAAAYABgAGAAADBgi63P4wAQAh+QQFAQAEACwGAAAABgAGAAADBki63P4wAQAh+QQFAQAEACwMAAYABgAGAAADBki63P4wAQAh+QQJAQAEACwGAAwABgAGAAADBki63P4wAQA7';
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;background-size: 16px 16px;';				
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }else if(ajxloader == 'css/white_spinner.css'){
            ajax_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppS";
            declaration = 'background-image:url('+ajax_image+');background-repeat:no-repeat;';	
            var colors = getColors(ajxloader);
            cssLoader += ".vX .vh {background-color: "+colors.bg+ "!important;border-color: " +colors.border+ "!important;color: "+colors.font+" !important;}";
        }

        if (cssNode.addRule) {
            cssNode.addRule(selector, declaration, 0);
        } else if (cssNode.insertRule) {
            cssNode.insertRule(selector + " {" + declaration + "}", 0);
        }

        // Gmail specific logic
        var arr = document.getElementsByTagName("div");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].className === "vZ L4XNt") {
                cssStr += ".L4XNt{width: " + (arr[i].style.width) + " !important} ";
            }
        }

        // General Ajax Loader CSS
        cssStr += selector + " {" + declaration + ";}";
        cssStr += " .message-area-text-container{padding:3px !important;} message-area-text{ position: relative !important;top: 8px !important;  } ";
        cssStr += ".L4XNt{padding-left:25px;padding-right:3px;}";

        // Google Docs
        if (document.getElementById("loadingStatus")) {
            var str = document.getElementById("loadingStatus").innerHTML;
            var str1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            var str2 = "&nbsp;";
            document.getElementById("loadingStatus").style.width = "auto !important";
            document.getElementById("loadingStatus").innerHTML = str1 + str + str2;
            cssStr += "#viewer-details-toggle.details-loading, #loading-area .message-area-text-container, #loadingStatus, .vZ, .L4XNt, .J-J5-Ji,#lo,#sites-notice,#loadmessagehtml{background-position:5px 2px;} .message-area-text-container { height:15px;}";
        }

        // Global fixes
        cssStr += "#viewer-details-toggle.details-loading, #loading-area .message-area-text-container, #loadingStatus, .vZ, .L4XNt, .J-J5-Ji,#lo,#sites-notice,#loadmessagehtml{background-position:3px 0px; color: black !important;} ";
        cssStr += ".L4XNt{height:16px;} ";

        if (ajxloader === "css/google.css") {
            cssStr += ".vX .vh{background-color:#fff1a8 !important;} .vX .UB{border-top-color: #fff1a8 !important;}";
        }

        // Google Calendar
        if (document.getElementById("lo")) {
            if (ajxloader === "css/google.css") {
                cssStr += " #lo{padding-left:17px !important;background-size: 12px;} ";
            } else {
                cssStr += " #lo{padding-left:17px !important;background-color:#fff1a8 !important;background-size: 12px;background-position:3px 1px!important;} ";
                cssStr += " #lo{background-color:#fff1a8 !important;color: black !important } ";
            }
        }

        // Google Maps
        if (document.getElementById("loadmessagehtml")) {
            cssStr += " #loadmessagehtml{padding-left:17px !important;background-position:12px 6px!important;} ";
            if (ajxloader === "css/facebook.css") {
                cssStr += " #loadmessagehtml{padding-left:17px !important;background-position:12px 8px!important;} ";
            }
        }

        // Google Sites
        if (document.getElementById("sites-status")) {
            cssStr += " #sites-notice{padding-left:21px !important;background-position:3px 2px;} ";
            document.getElementById("sites-notice").style.backgroundImage = "url(" + ajax_image + ") !important";
            document.getElementById("sites-notice").style.backgroundRepeat = "no-repeat";
            if (ajxloader !== "css/google.css") {
                document.getElementById("sites-notice").style.backgroundColor = "#fff1a8 !important";
            }
            if (ajxloader === "css/facebook.css") {
                cssStr += " .sites-notice{background-position:3px 4px!important;} ";
            }
        }

        cssStr += cssLoader;
        cssStr += ".v1{ margin-left: 24px !important; color: "+ background_font_color +" !important; } ";

        // Facebook icon fix for Google Docs
        if (ajxloader === "css/facebook.css") {
            cssStr += "#loadingStatus{background-position:3px 6px!important;}";
        } else {
            cssStr += "#loadingStatus{background-position:3px 3px!important;}";
        }

        // Google Plus
        if (document.getElementById("notify-widget-pane")) {
            var pane = document.getElementById("notify-widget-pane");
            if (pane.childNodes[0] && pane.childNodes[0].childNodes[0]) {
                var obj = pane.childNodes[0].childNodes[0].childNodes[1];
                if (obj && obj.className) {
                    cssStr += "." + obj.className + "{background-image:url('" + ajax_image + "')!important;padding-left: 31px!important;padding: 2px 15px 2px 32px;background-repeat:no-repeat!important;background-position: 10px 0px!important;}";
                    if (ajxloader === 'css/spinner_v2_0.css') {
                        cssStr += "." + obj.className + "{background-size: 16px 16px;}";
                    }
                }
            }
        }

        // Google Analytics
        cssStr += "#ID-loading{padding-left:27px;background-position-x:6px;background-position-y:3px;}";

        // Apply generated CSS
        cssNode.innerHTML = cssStr;
        document.head.appendChild(cssNode);
    });
})();
