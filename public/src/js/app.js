

document.getElementById('save').addEventListener('click',function(){
    
    var txt = document=document.getElementById('memo').value;
    
    saveasFile();
    
});

document.getElementById('new').addEventListener('click',function(){
    
    document.getElementById('about-app').style.display = "none";
    document.getElementById('memo').style.display = "";
    document.getElementById('memo').value = null;
    
});

document.getElementById('about').addEventListener('click',function(){
    
    document.getElementById('memo').style.display = "none";
    document.getElementById('about-app').style.display = "";
})

function saveasFile(){
    var txt = document.getElementById('memo').value,
        string = txt.toString(),
        arr = string.split(),
        txt_arr = arr[0],
        blob = new Blob([txt_arr], {type: "text/plain;charset=utf-8"});
    
    saveAs(blob, null);
}

var saveAs = saveAs || (function(view) {
	"use strict";
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, arbitrary_revoke_timeout = 1000 * 40
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") {
					get_URL().revokeObjectURL(file);
				} else 
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "Memo", no_auto_bom);
		}
	);

function doesFileExist(url) {
    var fileObject=new ActiveXObject("Scripting.FileSystemObject");
    
    if(!fileObject.FileExists(url)) {
        
        return false;
    } else {
        return true;
    }
}

function fileCheck(){
    var url = "C://Users/User/Downloads",
        result = doesFileExist();

    if (result == true) {
        readFile(url);
    } else {
        return;
    }
}

function readFile(url){
    
    var fOpen=fileObject.openTextFile(url,1);
    document.getElementById('memo').innerHTML="";
    
    while(!fOpen.AtEndOfStream){
        document.getElementById('memo').value = fOpen.Readline();
    }
    fOpen.close();
}

var Fullscreen = function(element) {

	if (element.requestFullscreen) {
		element.requestFullscreen();
	}
	else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else {
		console.log('not supported.');
	}
};

var exitFullscreen = function() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozExitFullScreen) {
		document.mozExitFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.log('not supported.');
	}
};

var fsButton = document.getElementById('fs-button');
var fsExitButton = document.getElementById('fs-exit-button');

fsButton.addEventListener('click', function(e) {
	e.preventDefault();
	Fullscreen(document.documentElement);
})

fsExitButton.addEventListener('click', function(e) {
	e.preventDefault();
	exitFullscreen(document.documentElement);
})