// Saves options to chrome.storage.local
function save_options(value, name) {
    chrome.storage.local.set({ "google_reader_ajaxloader": value }, function() {
        // Update status to let user know options were saved.
        var message = "<center><table><tr><td><img src='images/options_saved.png' style='width:24px;height:24px;'/></td><td> <span class='option_saved' title='Option Saved / 选项保存'>Option '" + name + "' Saved. Please reload Google pages!</span></td></tr></table></center>";
        if (typeof $ !== 'undefined' && $.jnotify) {
            $.jnotify(message, 5000);
        } else {
            console.log("Option saved:", name);
        }
    });
}

// Restores radio box state to saved value from chrome.storage.local
function restore_options() {
    chrome.storage.local.get("google_reader_ajaxloader", function(items) {
        var ajxloader = items["google_reader_ajaxloader"];
        if (typeof(ajxloader) === 'undefined') {
            ajxloader = "css/indicator.css";
        }
        
        var radios = document.getElementsByName('ajaxloader');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].value === ajxloader) {
                radios[i].checked = true;
                break;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    restore_options();
    
    var fieldset = document.getElementById('loaders-fieldset');
    fieldset.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'ajaxloader') {
            var name = e.target.getAttribute('data-name') || e.target.title || "Selected";
            save_options(e.target.value, name);
        }
    });
});
