
window.addEventListener("load", setupConnection, false);
function setupConnection()
{
   // When the injected script is activated, it connects with the background script.
   opera.extension.onconnect = function(event) {
        // Post message to the source, that is, the thing which connected to us (in this case the injected script) 
		
	var storage = widget.preferences;
 	
	event.source.postMessage(storage['ajaxloader']); 
        // Post this message in the opera error console
	opera.postError("sent message to injected script");
   }

   // Listen for messages                
   opera.extension.onmessage = function(event){
       	// Post a sentence (which includes the message received) to the opera error console
       opera.postError("This is what I got from injected script: "+event.data);
   }
}