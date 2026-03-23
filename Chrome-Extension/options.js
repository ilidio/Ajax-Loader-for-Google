// List of loaders that support background customization
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

// Saves options to chrome.storage.local
function save_options(value, name) {
    chrome.storage.local.set({ "google_reader_ajaxloader": value }, function() {
        show_saved_message(name);
        update_customization_state(value);
    });
}

function save_colors() {
    var bgColor = document.getElementById('background_color').value;
    var borderColor = document.getElementById('background_border_color').value;
    var fontColor = document.getElementById('background_font_color').value;
    
    chrome.storage.local.set({ 
        "background_color": bgColor,
        "background_border_color": borderColor,
        "background_font_color": fontColor
    }, function() {
        show_saved_message("Colors");
        update_preview();
    });
}

function show_saved_message(name) {
    var message = "<center><table><tr><td><img src='images/options_saved.png' style='width:24px;height:24px;'/></td><td> <span class='option_saved'>Option '" + name + "' Saved. Please reload Google pages!</span></td></tr></table></center>";
    if (typeof $ !== 'undefined' && $.jnotify) {
        $.jnotify(message, 5000);
    } else {
        console.log("Option saved:", name);
    }
}

// Restores radio box state to saved value from chrome.storage.local
function restore_options() {
    chrome.storage.local.get({
        "google_reader_ajaxloader": "css/indicator.css",
        "background_color": "#FFF1A8",
        "background_border_color": "#FFF1A8",
        "background_font_color": "#222222"
    }, function(items) {
        var ajxloader = items["google_reader_ajaxloader"];
        
        var radios = document.getElementsByName('ajaxloader');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].value === ajxloader) {
                radios[i].checked = true;
                break;
            }
        }

        document.getElementById('background_color').value = items["background_color"];
        document.getElementById('background_border_color').value = items["background_border_color"];
        document.getElementById('background_font_color').value = items["background_font_color"];
        
        update_customization_state(ajxloader);
        update_preview();
    });
}

function update_customization_state(loaderValue) {
    const isCustomizable = customizableLoaders.includes(loaderValue);
    const section = document.getElementById('color-controls');
    const inputs = section.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.disabled = !isCustomizable;
    });
    
    section.style.opacity = isCustomizable ? "1" : "0.5";
}

function update_preview() {
    const selectedRadio = document.querySelector('input[name="ajaxloader"]:checked');
    if (!selectedRadio) return;

    const loaderValue = selectedRadio.value;
    const isCustomizable = customizableLoaders.includes(loaderValue);
    
    const bgColor = isCustomizable ? document.getElementById('background_color').value : "#FFF1A8";
    const borderColor = isCustomizable ? document.getElementById('background_border_color').value : "#FFF1A8";
    const fontColor = isCustomizable ? document.getElementById('background_font_color').value : "#222222";
    
    const previewBox = document.getElementById('loader-preview-box');
    const previewImg = document.getElementById('preview-image');
    
    previewBox.style.backgroundColor = bgColor;
    previewBox.style.borderColor = borderColor;
    previewBox.style.color = fontColor;
    
    // Find the image for this loader
    const optionDiv = selectedRadio.closest('.option_input');
    if (optionDiv) {
        const img = selectedRadio.parentElement.nextElementSibling.querySelector('img');
        if (img) {
            previewImg.src = img.src;
        } else {
            // Random or text-based
            previewImg.style.display = 'none';
        }
    } else {
        // Fallback search
        const input = document.querySelector(`input[value="${loaderValue}"]`);
        if (input) {
            const img = input.parentElement.nextElementSibling.querySelector('img');
            if (img) {
                previewImg.src = img.src;
                previewImg.style.display = 'inline-block';
            } else {
                previewImg.style.display = 'none';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    restore_options();
    
    var fieldset = document.getElementById('loaders-fieldset');
    fieldset.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'ajaxloader') {
            var name = e.target.getAttribute('data-name') || e.target.title || "Selected";
            save_options(e.target.value, name);
            update_preview();
        }
    });

    document.getElementById('background_color').addEventListener('change', save_colors);
    document.getElementById('background_border_color').addEventListener('change', save_colors);
    document.getElementById('background_font_color').addEventListener('change', save_colors);
});
