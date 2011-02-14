/**
 * This Image Library provides a method to request the loading 
 * of an image, and to be called back when it has loaded, or
 * immediately if it is already loaded. 
 */
function ImageLibrary() {
	this.loading = {};      // a dictionary of booleans, indexed by url
	this.loaded = {};       // a dictionary of booleans, indexed by url
    this.images = {};       // a dictionary of DOM images, indexed by url
    this.jQueryImages = {}; // a dictionary of jQuery images objects, indexed by url
    this.callbacks = {};    // a dictionary of lists of callbacks, indexed by url
}

ImageLibrary.prototype.requestImage = function(url, callback) {
	//console.log("requestImage", url);
	var that = this;
	
	if (this.loaded[url]) {
		// if it's already loaded, just execute the callback
		//console.log(url, "already loaded");
		callback(this.images[url], url);
		return;
	}
	if (!this.loading[url]) {
		// if it's not yet loading, make it load
		//console.log(url, "not yet loading");
		this.loading[url] = true;
		this.callbacks[url] = [callback];
		
		// go and load the image, and execute all of the callbacks on completion
		this.jQueryImages[url] = $('<img src="' + url + '">');
        this.jQueryImages[url].load(function() {
            //console.log("onload");
			that.loaded[url] = true;
            that.loading[url] = true;
			that.images[url] = this;
			for (var i in that.callbacks[url]) {
				var callback = that.callbacks[url][i];
                callback(this, url);
			}
		});
	} else {
		// if it's already loading, just add the callback to the list
        //console.log(url, "already loading");
		this.callbacks[url].push(callback);
	}
};
