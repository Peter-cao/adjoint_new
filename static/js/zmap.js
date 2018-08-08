
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(t.gcoord={})}(this,function(t){"use strict";var r="WGS84",e="GCJ02",n="BD09",o="WebMercator";function i(t,r){if(t)throw new Error(r)}function a(t){return!isNaN(t)&&null!==t&&!u(t)}function u(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)}function f(){var t=arguments,r=t.length-1;return function(){for(var e=r,n=t[r].apply(this,arguments);e--;)n=t[e].call(this,n);return n}}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=function(){return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,r){var e=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return e}(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=Math.sin,y=Math.cos,v=Math.sqrt,h=Math.abs,d=Math.PI,b=6378245,g=.006693421622965823;function p(t){var r=c(t,2),e=r[0],n=r[1];if(!M(e,n))return[e,n];for(var o=e,i=n,a=S([o,i]),u=a[0]-e,f=a[1]-n;h(u)>1e-6||h(f)>1e-6;)u=(a=S([o-=u,i-=f]))[0]-e,f=a[1]-n;return[o,i]}function S(t){var r=c(t,2),e=r[0],n=r[1];if(!M(e,n))return[e,n];var o,i,a,u,f,l,p,S,m,G,P,C,W,B=(W=300+(P=(o=e)-105)+2*(C=(i=n)-35)+.1*P*P+.1*P*C+.1*v(h(P)),W+=2*(20*s(6*P*d)+20*s(2*P*d))/3,W+=2*(20*s(P*d)+40*s(P/3*d))/3,a=W+=2*(150*s(P/12*d)+300*s(P/30*d))/3,G=2*(S=o-105)-100+3*(m=i-35)+.2*m*m+.1*S*m+.2*v(h(S)),G+=2*(20*s(6*S*d)+20*s(2*S*d))/3,G+=2*(20*s(m*d)+40*s(m/3*d))/3,u=G+=2*(160*s(m/12*d)+320*s(m*d/30))/3,l=s(f=i/180*d),p=v(l=1-g*l*l),[a=180*a/(b/p*y(f)*d),u=180*u/(b*(1-g)/(l*p)*d)]);return[e+B[0],n+B[1]]}function M(t,r){return i(void 0===t||void 0===r,"lon and lat are required"),i(!a(t)||!a(r),"lon and lat must be numbers"),t>=72.004&&t<=137.8347&&r>=.8293&&r<=55.8271}var m=Math.sin,G=Math.cos,P=Math.atan2,C=Math.sqrt,W=3e3*Math.PI/180;function B(t){var r=c(t,2),e=r[0]-.0065,n=r[1]-.006,o=C(e*e+n*n)-2e-5*m(n*W),i=P(n,e)-3e-6*G(e*W);return[o*G(i),o*m(i)]}function E(t){var r=c(t,2),e=r[0],n=r[1],o=C(e*e+n*n)+2e-5*m(n*W),i=P(n,e)+3e-6*G(e*W);return[o*G(i)+.0065,o*m(i)+.006]}var j=180/Math.PI,w=Math.PI/180,D=6378137,J=20037508.342789244;function k(t){return[t[0]*j/D,(.5*Math.PI-2*Math.atan(Math.exp(-t[1]/D)))*j]}function I(t){var r=Math.abs(t[0])<=180?t[0]:t[0]-360*(t[0]<0?-1:1),e=[D*r*w,D*Math.log(Math.tan(.25*Math.PI+.5*t[1]*w))];return e[0]>J&&(e[0]=J),e[0]<-J&&(e[0]=-J),e[1]>J&&(e[1]=J),e[1]<-J&&(e[1]=-J),e}var q={to:{GCJ02:S,BD09:f(E,S),EPSG3857:I}},O={to:{WGS84:p,BD09:E,EPSG3857:f(I,p)}},x={to:{WGS84:f(p,B),GCJ02:B,EPSG3857:f(I,p,B)}},A={to:{WGS84:k,GCJ02:f(S,k),BD09:f(E,S,k)}},L=(Object.freeze||Object)({WGS84:q,GCJ02:O,BD09:x,EPSG3857:A});t.transform=function(t,r,e){i(!t,"input is required"),i(!r,"fromCRS is required"),i(!e,"toCRS is required");var n=L[r];i(!n,"fromCRS is invalid");var o=n.to[e];i(!o,"toCRS is invalid");var f=void 0===t?"undefined":l(t);i("string"!==f&&"object"!==f,"input must be an geojson or an array of position"),"string"===f&&(t=JSON.parse(t));var c=!1;u(t)&&(i(t.length<2,"position must be at 2 numbers long"),i(!a(t[0])||!a(t[1]),"position must contain numbers"),c=!0);var s=null,y=o;return c?s=y(t):(function t(r,e,n){if(null!==r)for(var o=void 0,i=void 0,a=void 0,u=void 0,f=void 0,l=void 0,c=void 0,s=0,y=0,v=void 0,h=r.type,d="FeatureCollection"===h,b="Feature"===h,g=d?r.features.length:1,p=0;p<g;p++){f=(v=!!(c=d?r.features[p].geometry:b?r.geometry:r)&&"GeometryCollection"===c.type)?c.geometries.length:1;for(var S=0;S<f;S++){var M=0,m=0;if(null!==(u=v?c.geometries[S]:c)){l=u.coordinates;var G=u.type;switch(s=!n||"Polygon"!==G&&"MultiPolygon"!==G?0:1,G){case null:break;case"Point":if(!1===e(l,y,p,M,m))return!1;y++,M++;break;case"LineString":case"MultiPoint":for(o=0;o<l.length;o++){if(!1===e(l[o],y,p,M,m))return!1;y++,"MultiPoint"===G&&M++}"LineString"===G&&M++;break;case"Polygon":case"MultiLineString":for(o=0;o<l.length;o++){for(i=0;i<l[o].length-s;i++){if(!1===e(l[o][i],y,p,M,m))return!1;y++}"MultiLineString"===G&&M++,"Polygon"===G&&m++}"Polygon"===G&&M++;break;case"MultiPolygon":for(o=0;o<l.length;o++){for(m=0,i=0;i<l[o].length;i++){for(a=0;a<l[o][i].length-s;a++){if(!1===e(l[o][i][a],y,p,M,m))return!1;y++}m++}M++}break;case"GeometryCollection":for(o=0;o<u.geometries.length;o++)if(!1===t(u.geometries[o],e,n))return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}(t,function(t){var r=y(t);t[0]=r[0],t[1]=r[1]}),s=t),s},t.WGS84=r,t.WGS1984="WGS84",t.GCJ02=e,t.BD09=n,t.WebMercator=o,t.EPSG4326="WGS84",t.EPSG3857="WebMercator",t.EPSG900913="WebMercator",t.Baidu="BD09",t.BMap="BD09",t.AMap="GCJ02",Object.defineProperty(t,"__esModule",{value:!0})});


(function(global, factory){
	global.ZMap = factory();
})(window, function(){

var Util = {
	transA2B: function(lonlat){
		return gcoord.transform(
		    [lonlat[0],lonlat[1]],
		    gcoord.GCJ02,
		    gcoord.BD09
		)
	},
	transB2A: function(lonlat){
		return gcoord.transform(
		    [lonlat[0],lonlat[1]],
		    gcoord.BD09,
		    gcoord.GCJ02
		)
	},
	_transPathB2A: function(points){
		var _points = [];
		for(var i=0;i<points.length;i++){
			_points.push(Util.transB2A(points[i]));
		}
		return _points
	},
	_transPathA2B: function(points){
		var _points = [];
		for(var i=0;i<points.length;i++){
			_points.push(Util.transA2B([points[i].getLng(),points[i].getLat()]));
		}
		return _points
	}
}
var Clazz = function(mapType){
	// console.log(this)
	var _ = this;
	var _pro = _.prototype;
	var mapType = mapType;
	var map = {
		"AMAP":G_Map,
		"BMAP":B_Map,
		"FHMAP":FH_Map
	}
	var MAP_Object = map[mapType];
	return {
		registerPlugin: function(className,classFunc){
			MAP_Object[className] = classFunc;
			MAP_Object.prototype[className] = function(){
				return new MAP_Object[className](arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])
			}
			_pro[className] = function(){
				return this.factory[className].apply(this,arguments)
			}
		},
		addMethod: function(name,methodFuc){
			var className = name.split(".")[0];
			var methodName = name.split(".")[1];
			var classObject = MAP_Object[className]
			classObject.prototype[methodName] = function(){
				methodFuc.apply(this,arguments)
			}
				
		}
	}
}


var Z = (function(){
	function Z(factory){
		var self = this;
		// $.get("/zmap/js/config.json").then(function(config){
			// console.log(config)
			factory && self.use(factory);
		// })
		
	}
	Z.Tool = Util;
	Z.Clazz = Clazz;
	// Clazz.call(this)
	Z.prototype.use = function(factory){
		if(typeof factory === "string"){
			this.mapType = factory;
			switch(factory) {
				case "BMAP":
					this.factory = new B_Map();
					break;
				case "AMAP":
					this.factory = new G_Map();
					break;
				case "FHMAP":
					this.factory = new FH_Map();
					break;
			}
		}
		return this;
	}

	Z.prototype.Map = function(){
		var opt = arguments[0];
		return this.factory.Map(opt);
	}
	Z.prototype.Marker = function(){
		var lonLat = arguments[0],
			opt = arguments[1];
		return this.factory.Marker(lonLat,opt);
	}
	Z.prototype.InfoWindow = function(){
		var map = arguments[0],
			opt = arguments[1];
		return this.factory.InfoWindow(map,opt);
	}
	Z.prototype.Icon = function(){
		var opt = arguments[0];
		return this.factory.Icon(opt);
	}
	Z.prototype.Polyline = function(){
		var points = arguments[0],
			opt = arguments[1];
		return this.factory.Polyline(points,opt);
	}
	Z.prototype.Polygon = function(){
		var points = arguments[0],
			opt = arguments[1];
		return this.factory.Polygon(points,opt);
	}
	Z.prototype.Circle = function(){
		var center = arguments[0],
			radius = arguments[1],
			opt = arguments[2];
		return this.factory.Circle(center,radius,opt);
	}
	Z.prototype.MarkerClusterer = function(){
		var map = arguments[0],
			points = arguments[1],
			opt = arguments[2];
		return this.factory.MarkerClusterer(map,points,opt);
	}
	Z.prototype.Heatmap = function(){
		var map = arguments[0],
			heatmapData = arguments[1],
			opt = arguments[2];
		return this.factory.Heatmap(map,heatmapData,opt);
	}
	Z.prototype.Toolbar = function(){
		var map = arguments[0],
			opt = arguments[1];
		return this.factory.Toolbar(map,opt);
	}
	Z.prototype.Track = function(){
		var map = arguments[0],
			opt = arguments[1];
		return this.factory.Track(map,opt);
	}
	Z.prototype.Geocoder = function(){
		var opt = arguments[0];
		return this.factory.Geocoder(opt);
	}
	Z.prototype.loadMap = function(){
		var self = this;
		var configFile = "/zmap/js/config.json";
		var resolve = arguments[0], reject = arguments[1];
		if(typeof arguments[0] == "string"){
			configFile = arguments[0];
			resolve = arguments[1];
			reject = arguments[2];
		}
		$.get(configFile).then(function(config){
			var mapType = self.mapType
			if(!mapType){
				mapType = config["MAP"].use;
				self.use(mapType)
			}
			var config = $.extend(true, config[self.mapType], config["MAP"]);
			self.factory.load(config, resolve, reject);
			// self.factory.load.call(self,config, resolve, reject)
		})
		
	}
	return Z;
}())





/********************************高德地图begin***************************************/
/*var Clazz_G = (function(){
	
	function Clazz(opt){

	}
	Clazz.prototype.addMethod = function(methodName,methodFunc){

	}
	return Clazz;
}())*/

var G_Map = (function(){
	function G_Map(){
	}
	G_Map.prototype.Map = function(opt){
		var map = new Map_G(opt);
		var config = this.config;
		map.setMapStyle(config.features,config.style || "normal");
		return map;
	}
	G_Map.prototype.Marker = function(lonLat,opt){
		return new Marker_G(lonLat,opt);
	}
	G_Map.prototype.InfoWindow = function(map,opt){
		return new InfoWindow_G(map,opt);
	}
	G_Map.prototype.Icon = function(opt){
		return new Icon_G(opt);
	}
	G_Map.prototype.Polyline = function(points,opt){
		return new Polyline_G(points,opt);
	}
	G_Map.prototype.Polygon = function(points,opt){
		return new Polygon_G(points,opt);
	}
	G_Map.prototype.Circle = function(center,radius,opt){
		// return new G_Map.Circle(center,radius,opt);
		return new Circle_G(center,radius,opt);
	}
	G_Map.prototype.MarkerClusterer = function(map,points,opt){
		return new MarkerClusterer_G(map,points,opt);
	}
	G_Map.prototype.Heatmap = function(map,heatmapData,opt){
		return new Heatmap_G(map,heatmapData,opt);
	}
	G_Map.prototype.Toolbar = function(map,opt){
		return new Toolbar_G(map,opt);
	}
	G_Map.prototype.Track = function(map,opt){
		return new Track_G(map,opt);
	}
	G_Map.prototype.Geocoder = function(opt){
		return new Geocoder_G(opt);
	}
	G_Map.prototype.load = function(config, resolve, reject){
		var self = this;
		this.config = config;
		var callbackName = "GMapLoaded";
		var url = this.server = "//webapi.amap.com/maps?v=" + config.version + "&key=" + config.key + "&callback=" + callbackName;
		var script = document.createElement('script');
        document.getElementsByTagName("head")[0].appendChild(script);
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        window[callbackName] = function(){
        	delete window[callbackName];
        	// resolve && resolve();
        	resolve && resolve.call(self);
        }
	}

	return G_Map;
}())
var Map_G = G_Map.Map = (function(){
	function Map(opt){
		this._instance = new AMap.Map(opt.container,{
			zoom: opt.zoom,
			center: new AMap.LngLat(opt.center[0],opt.center[1])
		})
	}
	Map.prototype.addLayer = function(layer){
		if(!layer){
			return;
		}
		if(layer instanceof Array){
			var layers = [];
			for(var i=0; i<layer.length; i++){
				layers.push(layer[i]._instance);
			}
			this._instance.add(layers)
		}else{
			this._instance.add(layer._instance)
		}
	}
	Map.prototype.removeLayer = function(layer){
		if(!layer){
			return;
		}
		if(layer instanceof Array){
			var layers = [];
			for(var i=0; i<layer.length; i++){
				layers.push(layer[i]._instance);
			}
			this._instance.remove(layers)
		}else{
			this._instance.remove(layer._instance)
		}
	}
	Map.prototype.clearLayers = function(){
		this._instance.clearMap()
	}
	Map.prototype.setZoom = function(level){//[3-18]
		this._instance.setZoom(level)
	}
	Map.prototype.getZoom = function(){
		return this._instance.getZoom()
	}
	Map.prototype.setCenter = function(lonlat){
		return this._instance.setCenter(lonlat)
	}
	Map.prototype.getCenter = function(){
		var lonlat = this._instance.getCenter();
		return [lonlat.getLng(),lonlat.getLat()]
	}
	Map.prototype.setMapStyle = function(features,style){
		if(features && features.length>0) this._instance.setFeatures(features);
		if(style) this._instance.setMapStyle('amap://styles/'+style);
	}
	Map.prototype.zoomToBounds = function(southWest,northEast){
		this._instance.setBounds(new AMap.Bounds(southWest,northEast))
	}
	Map.prototype.removeInfoWindow = function(infoWindow){
		this._instance.remove(infoWindow._instance);
	}
	return Map;
}())
var Marker_G = G_Map.Marker = (function(){
	function Marker(lonlat,opt){
		var defaultOpt = {
			offset:{x:0,y:0},
		}
		var options = $.extend({
			position:lonlat
		},defaultOpt,opt,true);
		options.offset = new AMap.Pixel(options.offset.x,options.offset.y)
		var marker = this._instance = new AMap.Marker(options)
		if(opt && opt.icon){
			this._instance.setIcon(opt.icon._instance)
		}
		if(opt && opt.infoWindow){
			this.infoWindow = opt.infoWindow;
			this.infoWindow.setPosition(this.getPosition());
			this.on("click",(function(data){
				if(this.infoWindow.isOpen()){
					this.infoWindow.hide();
				}else{
					this.infoWindow.show();
				}
				
			}).bind(this))
		}
		if(opt && opt.content){
			if(opt.icon) return;
			this.setContent(opt.content);
		}
		this.data = this._instance.data = options.data ? {"position":lonlat,"data":options.data}:{"position":lonlat};
		if(opt && opt.events){
			// console.log(opt.events)
			var events = opt.events;
			for(var eventName in events){
				var func = events[eventName];
				marker.on(eventName,function(e){
					func && func(e.target.data)
				})
			}
		}
	}
	Marker.prototype.on = function(eventName, handler){
		if(!eventName || !handler) return;
		var self = this;
		this._instance.on(eventName, function(e){
			handler(e.target.data,e)
		})
	}
	Marker.prototype.off = function(eventName, handler){
		if(!eventName || !handler) return;
		this._instance.off(eventName, function(e){
			handler(e.target.data,e)
		})
	}
	Marker.prototype.setIcon = function(icon){
		this._instance.setIcon(icon._instance)
	}
	Marker.prototype.getIcon = function(){
		return this._instance.getIcon()
	}
	Marker.prototype.setContent = function(content){
		this._instance.setContent(content)
	}
	Marker.prototype.setPosition = function(lonlat){
		this._instance.setPosition(lonlat)
	}
	Marker.prototype.getPosition = function(){
		var lonlat = this._instance.getPosition();
		return [lonlat.getLng(),lonlat.getLat()]
	}
	Marker.prototype.enableDragging = function(){
		this._instance && this._instance.setDraggable(true);
        return this;
	}
	Marker.prototype.disableDragging = function(){
		this._instance && this._instance.setDraggable(false);
        return this;
	}
	Marker.prototype.setLabel = function(str,labelOpts){
		if(!str) return;
		var offset = labelOpts&&labelOpts.offset ? {x:labelOpts.offset.x,y:labelOpts.offset.y} : {x:0,y:0}
		this._instance.setLabel({
            content: str,
            offset:  new AMap.Pixel(offset.x, offset.y)
        });
        return this;
	}
	Marker.prototype.showInfoWindow = function(){
		this.infoWindow.show();
	}
	Marker.prototype.hideInfoWindow = function(){
		this.infoWindow.hide();
	}
	
	return Marker;
}())
var InfoWindow_G = G_Map.InfoWindow = (function(){
	function InfoWindow(map,opt){
		if(!opt) return;
		var position = opt.position;
		var content = opt.content||"";
		this.map = map;
		var infoWindow = this._instance = new AMap.InfoWindow({
			isCustom:opt.isCustom||false,
			content:content,
			position:position
		});
	}
	InfoWindow.prototype.setContent = function(content){
		var infoWindow = this._instance;
		infoWindow.setContent(content);
	}
	InfoWindow.prototype.show = function(){
		var infoWindow = this._instance;
		infoWindow.open(this.map._instance,infoWindow.getPosition());
	}
	InfoWindow.prototype.hide = function(){
		var infoWindow = this._instance;
		infoWindow.close();
	}
	InfoWindow.prototype.setPosition = function(position){
		var infoWindow = this._instance;
		infoWindow.setPosition(new AMap.LngLat(position[0],position[1]));
	}
	InfoWindow.prototype.isOpen = function(){
		var infoWindow = this._instance;
		return infoWindow.getIsOpen();
	}
	// InfoWindow.prototype.on = function(eventName, handler){
	// 	if(!eventName || !handler) return;
	// 	var self = this;
	// 	var popup = this._instance;
	// 	marker.events.register(eventName,marker,function(res){
	// 		handler(res.object.data)
	// 	})
	// }
	return InfoWindow;
}());
var Icon_G = G_Map.Icon = (function(){

	function Icon(opt){
		this._instance = new AMap.Icon({
			image:opt.image,
			size:opt&&opt.size ? new AMap.Size(opt.size.w,opt.size.h) : null,
			// imageOffset:opt&&opt.offset ? new AMap.Pixel(opt.offset.x,opt.offset.y) : null,
			imageSize:opt&&opt.size ? new AMap.Size(opt.size.w,opt.size.h) : null
		})
	}

	return Icon;
}())

var Polyline_G = G_Map.Polyline = (function(){
	function Polyline(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid"
		}
		var options = $.extend({path:points},styleOpt,opt);
		this._instance = new AMap.Polyline(options)
	}

	Polyline.prototype.setPath = function(points){
		this._instance.setPath(points)
	}
	Polyline.prototype.getPath = function(){
		var points = this._instance.getPath();
		return points.map(function (lonlat) {
            return [lonlat.lng,lonlat.lat];
        });
	}
	Polyline.prototype.getLength = function(){
		return this._instance.getLength();
	}
	Polyline.prototype.enableEditing = function(map){
		if(!map) return;
		var self = this;
		var _map = map._instance;
		var _poly = this._instance;
		_map.plugin(["AMap.PolyEditor"],function(){
	        var polyEditor = self.editor = new AMap.PolyEditor(_map,_poly); 
	        polyEditor.open(); 
	    });
	}
	Polyline.prototype.disableEditing = function(){
	    if(this.editor) this.editor.close(); 
	}
	return Polyline;
}())

var Polygon_G = G_Map.Polygon = (function(){
	function Polygon(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({path:points},styleOpt,opt);
		this._instance = new AMap.Polygon(options)
	}
	Polygon.prototype.setPath = function(points){
		this._instance.setPath(points)
	}
	Polygon.prototype.getPath = function(){
		var points = this._instance.getPath();
		return points.map(function (lonlat) {
            return [lonlat.lng,lonlat.lat];
        });
	}
	/*Polygon.prototype.getLength = function(){
		return this._instance.getLength();
	}*/
	Polygon.prototype.enableEditing = function(map){
		if(!map) return;
		var self = this;
		var _map = map._instance;
		var _poly = this._instance;
		_map.plugin(["AMap.PolyEditor"],function(){
	        var polyEditor = self.editor = new AMap.PolyEditor(_map,_poly); 
	        polyEditor.open(); 
	    });
	}
	Polygon.prototype.disableEditing = function(){
		if(this.editor) this.editor.close(); 
	}
	return Polygon;
}())
var Circle_G = G_Map.Circle = (function(){
	function Circle(center,radius,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({
			center:center,
			radius:radius
		},styleOpt,opt);
		this._instance = new AMap.Circle(options)
	}
	Circle.prototype.setCenter = function(center){
		return this._instance.setCenter(center);
	}
	Circle.prototype.getCenter = function(){
		var center = this._instance.getCenter();
		return [center.getLng(),center.getLat()];
	}
	Circle.prototype.setRadius = function(radius){
		return this._instance.setRadius(radius);
	}
	Circle.prototype.enableEditing = function(map){
		if(!map) return;
		var self = this;
		var _map = map._instance;
		var _poly = this._instance;
		_map.plugin(["AMap.CircleEditor"],function(){
	        var polyEditor = self.editor = new AMap.CircleEditor(_map,_poly); 
	        polyEditor.open(); 
	    });
	}
	Circle.prototype.disableEditing = function(){
		if(this.editor) this.editor.close(); 
	}
	return Circle;
}())
var MarkerClusterer_G = G_Map.MarkerClusterer = (function(){
	function MarkerClusterer(map,markers,opt){
		var self = this;
		var _map = map._instance;
		this.markers = [];
		_map.plugin(["AMap.MarkerClusterer"],function() {
		    var cluster = self._instance = new AMap.MarkerClusterer(_map);
		    self.addMarkers(markers)
		    cluster.on("click",function(res){
		    	console.log("聚合点信息",res)
		    	var resData = [];
		    	res.markers.forEach(function(marker){
		    		resData.push(marker.data)
		    	})
		    	opt.click && opt.click(resData)
		    })
		});
		return this;
	}
	MarkerClusterer.prototype.addMarker = function(marker){
		this.markers.push(marker)
		var marker = marker._instance
		this._instance.addMarker(marker)
		
	}
	MarkerClusterer.prototype.addMarkers = function(markers){
		if(!markers) return;
		if(markers.length == 0) return;
		var self = this;

		markers.forEach(function(marker){
			self.addMarker(marker)
		})
	}
	MarkerClusterer.prototype.getMarkers = function(marker){
		// var markers = this._instance.getMarkers();
		return this.markers;
	}
	MarkerClusterer.prototype.clearMarkers = function(){
		this._instance.clearMarkers()
		this.markers = [];
	}
	return MarkerClusterer;
}())
var Heatmap_G = G_Map.Heatmap = (function(){
	function Heatmap(map,heatmapData,opt){
		var _map = map._instance;
		var self = this;
		this.data = heatmapData;
		_map.plugin(["AMap.Heatmap"], function() {
	 		var heatmap = self._instance = new AMap.Heatmap(_map, {
	            radius: 25, //给定半径
	            opacity: [0, 0.8]
	        });
	        heatmap.setDataSet({
	            data: heatmapData,
	            max: 100
	        });
		});
	}
	Heatmap.prototype.hide = function(){
		this._instance.hide();
	}
	Heatmap.prototype.show = function(){
		this._instance.show();
	}
	Heatmap.prototype.setData = function(heatmapData,opt){
		this.data = heatmapData;
		this._instance.setDataSet({data:heatmapData});
	}
	Heatmap.prototype.getData = function(){
		return this.data;
	}
	return Heatmap;
}())
var Toolbar_G = G_Map.Toolbar = (function(){
	function Toolbar(map,opt){
		var _map = map._instance;
		var self = this;
		this.overlays = [];
		this._type = "";
		_map.plugin(["AMap.MouseTool"],function(){ 
		    var mousetool = self.mousetool = new AMap.MouseTool(_map);
		    mousetool.on('draw', function(data) {
		    	this.close();
		    	console.log(data);
				if(typeof opt === "function"){
					var overlay = data.obj;
					self.overlays.push(overlay)
					var type = "";
					/*switch (overlay.CLASS_NAME){
						case "AMap.Marker":
							type = "marker";
							break;
						case "AMap.Polyline":
							type = "polyline";
							break;
						case "AMap.Polygon":
							type = "polygon";
							break;
						case "AMap.Circle":
							type = "circle";
							break;
					}*/
					opt.call(self,self._type,overlay)
				}
			});
		});
	}
	Toolbar.prototype.marker = function(){
		this._type = "marker";
		this.mousetool.marker()
	}
	Toolbar.prototype.line = function(){
		this._type = "polyline";
		this.mousetool.polyline();
	}
	Toolbar.prototype.polygon = function(){
		this._type = "polygon";
		this.mousetool.polygon();
	}
	Toolbar.prototype.circle = function(){
		this._type = "circle";
		this.mousetool.circle();
	}
	Toolbar.prototype.rectangle = function(){
		this._type = "rectangle";
		this.mousetool.rectangle();
	}
	return Toolbar;
}())

var Track_G = G_Map.Track = (function(){
	function Track(map,opt){
		var self = this;
		loadAMapUI().then(function(){
			AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
				if (!PathSimplifier.supportCanvas) {
			        alert('当前环境不支持 Canvas！');
			        return;
			    }
			    //启动页面
			    self._initPage(map._instance,PathSimplifier,opt);
			});
		})
	}
	function loadAMapUI(){
		var def = $.Deferred();
		if(!window.AMapUI){
	        var s1 = $.getScript("//webapi.amap.com/ui/1.0/main.js")
	        $.when(s1).done(function(){
	        	def.resolve();
	        })
		}else{
			def.resolve();
		}
		return def;
	}
	Track.prototype._initPage = function(map,PathSimplifier,opt){
	    //创建组件实例
	    var pathSimplifierIns = this._instance = new PathSimplifier({
	        zIndex: 100,
	        map: map, //所属的地图实例
	        getPath: function(pathData, pathIndex) {
	            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
	            return pathData.path;
	        },
	        getHoverTitle: function(pathData, pathIndex, pointIndex) {
	            //返回鼠标悬停时显示的信息
	            if (pointIndex >= 0) {
	                //鼠标悬停在某个轨迹节点上
	                return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
	            }
	            //鼠标悬停在节点之间的连线上
	            return pathData.name + '，点数量' + pathData.path.length;
	        },
	        renderOptions: {
	            //轨迹线的样式
	            pathLineStyle: {
	                strokeStyle: 'red',
	                lineWidth: 6,
	                dirArrowStyle: true
	            }
	        }
	    });

	    pathSimplifierIns.setData([{
	        name: '轨迹',
	        path: opt.path
	    }]);

	    //创建一个巡航器
	    var pathNavigator = this.pathNavigator = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
	        {
	            loop: false, //循环播放
	            speed: 1000
	        });

	    
	}
	Track.prototype.start = function(){
		var pathNavigator = this.pathNavigator;
		pathNavigator.start();		
	}
	Track.prototype.pause = function(){
		var pathNavigator = this.pathNavigator;
		pathNavigator.pause();	
	}
	Track.prototype.resume = function(){
		var pathNavigator = this.pathNavigator;
		pathNavigator.resume();	
	}
	Track.prototype.stop = function(){
		var pathNavigator = this.pathNavigator;
		pathNavigator.stop();	
	}
	return Track;
}())
var Geocoder_G = G_Map.Geocoder = (function(){
	function Geocoder(opt){
		this.option = opt||{cityName:"全国"};
		var self = this;
		AMap.plugin(["AMap.Geocoder"],function(){ 
			var geocoder = self._instance = new AMap.Geocoder({
				city: self.option.cityName || self.option.cityCode
			})
		});
	}
	Geocoder.prototype.getLocation = function(address,callback){
		var geocoder = this._instance;
		geocoder.getLocation(address,function(status, result){
			var res = result&&result.info=="OK" ? result.geocodes : [];
			var result = null;
			if(res.length>0){
				result = [res[0].location.getLng(),res[0].location.getLat()]
			}
			callback && callback(result)
		})
		
	}
	Geocoder.prototype.getAddress = function(lonlat,callback){
		var geocoder = this._instance;
		geocoder.getAddress(lonlat,function(status, result){
			var res = result&&result.info=="OK" ? result.regeocode : {}
			// console.log(res)
			var result = {
				address:res.formattedAddress,
				addressComponent:{
					province:res.addressComponent ? res.addressComponent.province : "",
					city:res.addressComponent ? res.addressComponent.city : "",
					district:res.addressComponent ? res.addressComponent.district : "",
					cityCode:res.addressComponent ? res.addressComponent.adcode : ""
				}
			}
			callback && callback(result)
		})
	}
	return Geocoder;
}())

/********************************高德地图end***************************************/

/********************************百度地图begin***************************************/

var B_Map = (function(){
	function B_Map(config){

	}
	B_Map.prototype.Map = function(opt){
		var map = new Map_B(opt);
		var config = this.config;
		console.log(this)
		map.setMapStyle(config.features,config.style || "normal");
		return map;
	}
	B_Map.prototype.Marker = function(lonLat,opt){
		return new Marker_B(lonLat,opt);
	}
	B_Map.prototype.InfoWindow = function(map,opt){
		return new InfoWindow_B(map,opt);
	}
	B_Map.prototype.Icon = function(opt){
		return new Icon_B(opt);
	}
	B_Map.prototype.Polyline = function(points,opt){
		return new Polyline_B(points,opt);
	}
	B_Map.prototype.Polygon = function(points,opt){
		return new Polygon_B(points,opt);
	}
	B_Map.prototype.Circle = function(center,radius,opt){
		return new Circle_B(center,radius,opt);
	}
	B_Map.prototype.MarkerClusterer = function(map,points,opt){
		if(!window.BMapLib || !window.BMapLib.MarkerClusterer){
	        /*var s1 = $.getScript("//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js")
	        var s2 = $.getScript("//api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js")
	        $.when(s1,s2).done(function(){
	        	new MarkerClusterer_B(map,points,opt);
	        })*/
		}else{
			return new MarkerClusterer_B(map,points,opt);
		}
		
		
	}
	B_Map.prototype.Heatmap = function(map,heatmapData,opt){
		/*if(!window.BMapLib || !window.BMapLib.HeatmapOverlay){
	        var s1 = $.getScript("//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js")
	        return $.when(s1).done(function(){
	        	new Heatmap_B(map,heatmapData,opt);
	        })
		}else{
			return new Heatmap_B(map,heatmapData,opt);
		}*/
		return new Heatmap_B(map,heatmapData,opt);
	}
	
	B_Map.prototype.Toolbar = function(map,opt){
		return new Toolbar_B(map,opt)
	}
	B_Map.prototype.Track = function(map,opt){
		return new Track_B(map,opt)
	}
	B_Map.prototype.Geocoder = function(opt){
		return new Geocoder_B(opt);
	}
	B_Map.prototype.load = function(config, resolve, reject){
		var self = this;
		this.config = config;
		var callbackName = "BMapLoaded";
		var url = this.server = "//api.map.baidu.com/api?v=" + config.version + "&ak=" + config.key + "&callback=" + callbackName;
		var script = document.createElement('script');
        document.getElementsByTagName("head")[0].appendChild(script);
        script.setAttribute('src', url);
        script.setAttribute('defer', '');
        script.setAttribute('async', '');
        window[callbackName] = function(){
        	delete window[callbackName];
        	// resolve && resolve();
        	var s1 = $.getScript("//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js")
	        // var s2 = $.getScript("//api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js")
	        var s2 = $.getScript("/zmap/js/MarkerClusterer.js")
	        $.when(s1,s2).done(function(){
	        	resolve && resolve.call(self);
	        })
        }
	}

	return B_Map;
}())
var Map_B = B_Map.Map = (function(){
	function Map(opt){
		this._instance = new BMap.Map(opt.container);
		this._instance.centerAndZoom(new BMap.Point(opt.center[0], opt.center[1]),opt.zoom)
		this._instance.enableScrollWheelZoom()
	}
	Map.prototype.addLayer = function(layer){
		if(!layer){
			return;
		}
		if(layer instanceof Array){
			for(var i=0; i<layer.length; i++){
				this._instance.addOverlay(layer[i]._instance)
			}
		}else{
			this._instance.addOverlay(layer._instance)
		}
	}
	Map.prototype.removeLayer = function(layer){
		if(!layer){
			return;
		}
		if(layer instanceof Array){
			for(var i=0; i<layer.length; i++){
				this._instance.removeOverlay(layer[i]._instance)
			}
		}else{
			this._instance.removeOverlay(layer._instance)
		}
	}
	Map.prototype.clearLayers = function(){
		this._instance.clearOverlays()
	}
	Map.prototype.setZoom = function(level){//[3-18]
		this._instance.setZoom(level)
	}
	Map.prototype.getZoom = function(){
		return this._instance.getZoom()
	}
	Map.prototype.setCenter = function(lonlat){
		return this._instance.setCenter(new BMap.Point(lonlat[0], lonlat[1]))
	}
	Map.prototype.getCenter = function(){
		var lonlat = this._instance.getCenter();
		return [lonlat.lng,lonlat.lat];
	}
	Map.prototype.setMapStyle = function(features,style){
		// if(features && features.length>0 && style) {
			this._instance.setMapStyle({style:style,features:features});
		// }
	}
	Map.prototype.zoomToBounds = function(southWest,northEast){
		this._instance.setViewport([
			new BMap.Point(southWest[0], southWest[1]),
			new BMap.Point(northEast[0], northEast[1])
		])
	}
	Map.prototype.removeInfoWindow = function(infoWindow){
		this._instance.clearInfoWindow(infoWindow._instance);
	}
	return Map;
}())
var Marker_B = B_Map.Marker = (function(){
	function Marker(lonlat,opt){
		var defaultOpt = {
			offset:{width:0,height:0},
		}
		var options = $.extend({
		},defaultOpt,opt,true);

		(options.offset.x&&options.offset.y) ? options.offset = {width:options.offset.x,height:options.offset.y} : null;
		console.log(options)

		var marker = this._instance = new BMap.Marker(new BMap.Point(lonlat[0], lonlat[1]),options)
		if(opt && opt.icon){
			this._instance.setIcon(opt.icon._instance)
		}
		if(opt && opt.infoWindow){
			this.infoWindow = opt.infoWindow;
			this.infoWindow.setPosition(this.getPosition());
			this.on("click",(function(data){
				console.log(this.infoWindow)
				if(this.infoWindow.isOpen()){
					this.infoWindow.hide();
				}else{
					this.infoWindow.show();
				}
				
			}).bind(this))
		}
		this.data = this._instance.data = options.data ? {"position":lonlat,"data":options.data}:{"position":lonlat};
		if(opt && opt.events){
			var events = opt.events;
			for(var eventName in events){
				var func = events[eventName];
				marker.addEventListener(eventName,function(e){
					func && func(e.currentTarget.data)
				})
			}
		}
	}
	Marker.prototype.on = function(eventName, handler){
		if(!eventName || !handler) return;
		var self = this;
		this._instance.addEventListener(eventName, function(e){
			handler(e.target.data,e)
		})
	}
	Marker.prototype.off = function(eventName, handler){
		if(!eventName || !handler) return;
		this._instance.removeEventListener(eventName, function(e){
			handler(e.target.data,e)
		})
	}
	Marker.prototype.setIcon = function(icon){
		this._instance.setIcon(icon._instance)
	}
	Marker.prototype.getIcon = function(){
		return this._instance.getIcon()
	}
	Marker.prototype.setContent = function(content){
		// this._instance.setContent(content)
	}
	Marker.prototype.setPosition = function(lonlat){
		this._instance.setPosition(new BMap.Point(lonlat[0], lonlat[1]));
		return this;
	}
	Marker.prototype.getPosition = function(){
		var lonlat = this._instance.getPosition();
		return [lonlat.lng,lonlat.lat];
	}
	Marker.prototype.enableDragging = function(){
		this._instance && this._instance.enableDragging();
        return this;
	}
	Marker.prototype.disableDragging = function(){
		this._instance && this._instance.disableDragging();
        return this;
	}
	Marker.prototype.setLabel = function(str,labelOpts){
		if(!str) return;
		var label = this._instance.getLabel();
        var defaultStyle = {
            border: '1px solid blue',
            backgroundColor: '#ffffff',
            fontSize:"12px",
        };
        if (label) {
            label.setContent(str);
        }
        else {
        	var offset = labelOpts&&labelOpts.offset ? {x:labelOpts.offset.x,y:labelOpts.offset.y} : {x:0,y:0}
            label = new BMap.Label(str,{offset:new BMap.Size(offset.x,offset.y)});
            this._instance && this._instance.setLabel(label);
        }
        label.setStyle($.extend({},defaultStyle, labelOpts.style));
        return this;
	}
	Marker.prototype.showInfoWindow = function(){
		this.infoWindow.show();
	}
	Marker.prototype.hideInfoWindow = function(){
		this.infoWindow.hide();
	}
	return Marker;
}())
var InfoWindow_B = B_Map.InfoWindow = (function(){
	function InfoWindow(map,opt){
		if(!opt) return;
		var position = opt.position;
		var content = opt.content||"";
		this.map = map;
		this.position = position;
		var infoWindow = this._instance = new BMap.InfoWindow(content,{
			// enableCloseOnClick:opt.isCustom||false
		});
	}
	InfoWindow.prototype.setContent = function(content){
		var infoWindow = this._instance;
		infoWindow.setContent(content);
	}
	InfoWindow.prototype.show = function(){
		var infoWindow = this._instance;
		var position = this.position;
		this.map._instance.openInfoWindow(infoWindow,new BMap.Point(position[0],position[1]))
		// infoWindow.open(this.map._instance,infoWindow.getPosition());
	}
	InfoWindow.prototype.hide = function(){
		var infoWindow = this._instance;
		infoWindow.close();
	}
	InfoWindow.prototype.setPosition = function(position){
		var infoWindow = this._instance;
		this.position = position;
	}
	InfoWindow.prototype.isOpen = function(){
		var infoWindow = this._instance;
		console.log(this)
		return infoWindow.isOpen();
	}
	// InfoWindow.prototype.on = function(eventName, handler){
	// 	if(!eventName || !handler) return;
	// 	var self = this;
	// 	var popup = this._instance;
	// 	marker.events.register(eventName,marker,function(res){
	// 		handler(res.object.data)
	// 	})
	// }
	return InfoWindow;
}());
var Icon_B = B_Map.Icon = (function(){

	function Icon(opt){
		var size = opt.size || {
			w:36,h:36
		}
		this._instance = new BMap.Icon(opt.image,new BMap.Size(size.w,size.h))
	}

	return Icon;
}())
var Polyline_B = B_Map.Polyline = (function(){
	function Polyline(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid"
		}
		var options = $.extend({},styleOpt,opt);
		var path = points.map(function(lonlat){
			return new BMap.Point(lonlat[0], lonlat[1])
		})
		this._instance = new BMap.Polyline(path,options)
	}

	Polyline.prototype.setPath = function(points){
		var path = points.map(function(lonlat){
			return new BMap.Point(lonlat[0], lonlat[1])
		})
		this._instance.setPath(path)
	}
	Polyline.prototype.getPath = function(){
		var points = this._instance.getPath();
		return points.map(function (lonlat) {
            return [lonlat.lng,lonlat.lat];
        });
	}
	Polyline.prototype.getLength = function(){
		var polyline = this._instance;
		var map = polyline.map;
		var points = polyline.getPath();
		console.log(points)
		var distance = 0;
		for(var i=0;i<points.length-1;i++){
			distance += map.getDistance(points[i], points[i+1])
		}
		return distance;
	}
	Polyline.prototype.enableEditing = function(){
		this._instance.enableEditing();
	}
	Polyline.prototype.disableEditing = function(){
		this._instance.disableEditing();
	}
	return Polyline;
}())

var Polygon_B = B_Map.Polygon = (function(){
	function Polygon(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({},styleOpt,opt);
		var path = points.map(function(lonlat){
			return new BMap.Point(lonlat[0], lonlat[1])
		})
		this._instance = new BMap.Polygon(path,options)
	}
	Polygon.prototype.setPath = function(points){
		var path = points.map(function(lonlat){
			return new BMap.Point(lonlat[0], lonlat[1])
		})
		this._instance.setPath(path)
	}
	Polygon.prototype.getPath = function(){
		var points = this._instance.getPath();
		return points.map(function (lonlat) {
            return [lonlat.lng,lonlat.lat];
        });
	}
/*	Polygon.prototype.getLength = function(){
	}*/
	Polygon.prototype.enableEditing = function(){
		this._instance.enableEditing();
	}
	Polygon.prototype.disableEditing = function(){
		this._instance.disableEditing();
	}
	return Polygon;
}())
var Circle_B = B_Map.Circle = (function(){
	function Circle(center,radius,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({
			center:center,
			radius:radius
		},styleOpt,opt);
		this._instance = new BMap.Circle(
			new BMap.Point(center[0], center[1]),
			radius,
			options)
	}
	Circle.prototype.setCenter = function(center){
		return this._instance.setCenter(new BMap.Point(center[0], center[1]));
	}
	Circle.prototype.getCenter = function(){
		var center = this._instance.getCenter();
		return [center.lng,center.lat];
	}
	Circle.prototype.setRadius = function(radius){
		return this._instance.setRadius(radius);
	}
	Circle.prototype.enableEditing = function(){
		this._instance.enableEditing();
	}
	Circle.prototype.disableEditing = function(){
		this._instance.disableEditing();
	}
	return Circle;
}())
var MarkerClusterer_B = B_Map.MarkerClusterer = (function(){
	function MarkerClusterer(map,markers,opt){
		var self = this;
		var _map = map._instance;
		this.markers = [];
		var cluster = self._instance = new BMapLib.MarkerClusterer(_map);
		self.addMarkers(markers)
		console.log(cluster)
		cluster.addEventListener("click",function(res){
			console.log("聚合点信息",res)
			var resData = [];
			res.forEach(function(marker){
	    		resData.push(marker.data)
	    	})
	    	console.log(resData)
		})
		return this;
	}
	MarkerClusterer.prototype.addMarker = function(marker){
		this.markers.push(marker)
		var marker = marker._instance
		this._instance.addMarker(marker)
	}
	MarkerClusterer.prototype.addMarkers = function(markers){
		if(!markers) return;
		if(markers.length == 0) return;
		var self = this;
		markers.forEach(function(marker){
			self.addMarker(marker)
		})
	}
	MarkerClusterer.prototype.getMarkers = function(marker){
		// var markers = this._instance.getMarkers();
		return this.markers;
	}
	MarkerClusterer.prototype.clearMarkers = function(){
		this._instance.clearMarkers();
		this.markers = [];
	}
	return MarkerClusterer;
}())

var Heatmap_B = B_Map.Heatmap = (function(){
	function Heatmap(map,heatmapData,opt){
		var self = this;
		this.data = heatmapData;
		loadHeatmap().then(function(){
			var heatmapOverlay = self._instance = new BMapLib.HeatmapOverlay({"radius":20});
			map._instance.addOverlay(heatmapOverlay);
			heatmapOverlay.setDataSet({data:heatmapData,max:100});
		})
	}
	function loadHeatmap(){
		var def = $.Deferred();
		if(!window.BMapLib || !window.BMapLib.HeatmapOverlay){
	        var s1 = $.getScript("//api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js")
	        $.when(s1).done(function(){
	        	def.resolve();
	        })
		}else{
			def.resolve();
		}
		return def;
	}
	Heatmap.prototype.hide = function(){
		var self = this;
		if(this._instance){
			self._instance.hide();
		}else{
			setTimeout(function(){
				self._instance.hide();
			},1000)
		}
	}
	Heatmap.prototype.show = function(){
		var self = this;
		if(this._instance){
			self._instance.show();
		}else{
			setTimeout(function(){
				self._instance.show();
			},1000)
		}
	}
	Heatmap.prototype.setData = function(heatmapData,opt){
		var self = this;
		this.data = heatmapData;
		if(this._instance){
			self._instance.setDataSet({data:heatmapData});
		}else{
			setTimeout(function(){
				self._instance.setDataSet({data:heatmapData});
			},1000)
		}
	}
	Heatmap.prototype.getData = function(){
		return this.data;
	}
	return Heatmap;
}())
var Toolbar_B = B_Map.Toolbar = (function(){
	function Toolbar(map,opt){
		var _map = map._instance;
		var self = this;
		this.overlays = [];
		loadToolbar().then(function(){
		    var styleOptions = {
		        strokeColor:"red",    //边线颜色。
		        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
		        strokeWeight: 3,       //边线的宽度，以像素为单位。
		        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
		        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
		        strokeStyle: 'solid' //边线的样式，solid或dashed。
		    }
			var mousetool = self._instance = new BMapLib.DrawingManager(_map, {
		        isOpen: false, //是否开启绘制模式
		        enableDrawingTool: true, //是否显示工具栏
		        drawingToolOptions: {
		            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
		            offset: new BMap.Size(5, 5), //偏离值
		            drawingTypes : [
						BMAP_DRAWING_MARKER,
						BMAP_DRAWING_CIRCLE,
						BMAP_DRAWING_POLYLINE,
						BMAP_DRAWING_POLYGON,
						BMAP_DRAWING_RECTANGLE 
                  	]
		        },
		        circleOptions: styleOptions, //圆的样式
		        polylineOptions: styleOptions, //线的样式
		        polygonOptions: styleOptions, //多边形的样式
		        rectangleOptions: styleOptions //矩形的样式
		    });
		    mousetool.addEventListener('overlaycomplete', function(e){
		    	this.close()
		    	console.log(e);
		    	if(typeof opt === "function"){
		    		self.overlays.push(e.overlay)
					opt.call(self,e.drawingMode,e.overlay)
				}
		    });
		    console.log(mousetool)
		})
	}
	function loadToolbar(){
		var def = $.Deferred();
		if(!window.BMapLib || !window.BMapLib.DrawingManager){
	        var s1 = $.getScript("//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js")
	        $("head").append('<link href="//api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css" rel="stylesheet" type="text/css" />')
	        $.when(s1).done(function(){
	        	def.resolve();
	        })
		}else{
			def.resolve();
		}
		return def;
	}
	Toolbar.prototype.marker = function(){
	}
	Toolbar.prototype.line = function(){
	}
	Toolbar.prototype.polygon = function(){
	}
	Toolbar.prototype.circle = function(){
	}
	Toolbar.prototype.rectangle = function(){
	}
	return Toolbar;
}())
var Track_B = B_Map.Track = (function(){
	function Track(map,opt){
		var self = this;
		if(!opt.path) return;
		loadLushu().then(function(){
			//启动页面
			self._initPage(map._instance,opt);
		})

	}
	function loadLushu(){
		var def = $.Deferred();
		if(!window.BMapLib || !window.BMapLib.DrawingManager){
	        var s1 = $.getScript("//api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js")
	        $.when(s1).done(function(){
	        	def.resolve();
	        })
		}else{
			def.resolve();
		}
		return def;
	}
	Track.prototype._initPage = function(map,opt){
		var arrPois = opt.path.map(function(lonlat){
		    return new BMap.Point(lonlat[0], lonlat[1])
		})
		// console.log(arrPois)
		map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
		map.setViewport(arrPois);
        var lushu = this._instance = new BMapLib.LuShu(map,arrPois,{
	        defaultContent:"",
	        autoView:true,
	        icon  : new BMap.Icon('//lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
	        speed: 500,
	        enableRotation:true,//是否设置marker随着道路的走向进行旋转
	        landmarkPois: [//要在覆盖物移动过程中，显示的特殊点
	        ]
    	}); 
	}
	Track.prototype.start = function(){
		this._instance.start();
	}
	Track.prototype.pause = function(){
		this._instance.pause();
	}
	Track.prototype.resume = function(){
		this._instance.start();
	}
	Track.prototype.stop = function(){
		this._instance.stop();
	}
	return Track;
}())
var Geocoder_B = B_Map.Geocoder = (function(){
	function Geocoder(opt){
		this.option = opt||{cityName:"全国"};
		var geocoder = this._instance = new BMap.Geocoder();
	}
	Geocoder.prototype.getLocation = function(address,callback){
		var geocoder = this._instance;
		var option = this.option;
		geocoder.getPoint(address,function(res){
			var result = null;
			if(res){
				result = [res.lng,res.lat];
			}
			callback && callback(result)
		},option.cityName)
		
	}
	Geocoder.prototype.getAddress = function(lonlat,callback){
		var geocoder = this._instance;
		geocoder.getLocation(new BMap.Point(lonlat[0],lonlat[1]),function(res){
			var result = {
				address:res.address,
				addressComponent:{
					province:res.addressComponents.province,
					city:res.addressComponents.city,
					district:res.addressComponents.district,
					cityCode:res.addressComponents.cityCode
				}
			}
			callback && callback(result)
		})
	}
	return Geocoder;
}())

/********************************百度地图end***************************************/

/********************************pgis地图start***************************************/

var FH_Map = (function(){
	function FH_Map(options){
	}
	FH_Map.prototype.Map = function(){
		var opt = arguments[0];
		return new Map(opt);
	}
	FH_Map.prototype.Marker = function(lonLat,opt){
		return new Marker(lonLat,opt);
	}
	FH_Map.prototype.InfoWindow = function(map,opt){
		return new InfoWindow(map,opt);
	}
	FH_Map.prototype.Icon = function(opt){
		return new Icon(opt);
	}
	FH_Map.prototype.Polyline = function(points,opt){
		return new Polyline(points,opt);
	}
	FH_Map.prototype.Polygon = function(points,opt){
		return new Polygon(points,opt);
	}
	FH_Map.prototype.Circle = function(center,radius,opt){
		return new Circle(center,radius,opt);
	}
	FH_Map.prototype.MarkerClusterer = function(map,points,opt){
		return new MarkerClusterer(map,points,opt);
	}
	FH_Map.prototype.Heatmap = function(map,heatmapData,opt){
		return new Heatmap(map,heatmapData,opt);
	}
	FH_Map.prototype.Toolbar = function(map,opt){
		return new Toolbar(map,opt);
	}
	FH_Map.prototype.Track = function(map,opt){
		return new Track(map,opt);
	}
	FH_Map.prototype.Geocoder = function(opt){
		return new Geocoder(opt);
	}
	FH_Map.prototype.load = function(config, resolve, reject){
		var self = this;
		this.config = config;
		this.server = config.ip + ":" + config.port + "/FHGis/api/js?async=true";
		console.log(this.server)
		//动态引入gis
		var script = document.createElement('script');
		document.getElementsByTagName('head')[0].appendChild(script);
		script.src = this.server;
		var mapDeferred = $.Deferred();
		window.FHMapLoaded = function() {
			// resolve && resolve();
			resolve && resolve.call(self);
		};
		/*$.when(mapDeferred).then(function() {
			var map = self.map = new FHMap.Map('map',{zoom:13, selected: "baidu.map"});
			var lonLat = new FHMap.LonLat(118.733553,31.987817);
			map.setCenter(lonLat);
		});	*/
	}
	return FH_Map;
}())
var Map = FH_Map.Map = (function(){
	function Map(opt){
		this._instance = new FHMap.Map(opt.container,{
			zoom: opt.zoom, 
			center: new FHMap.LonLat(opt.center[0],opt.center[1]),
			//selected:"baidu.sate"//["baidu.map","baidu.sate","baidu.sate_road"]
		});
	}
	Map.prototype.addLayer = function(layer){
		if(!layer){
			return;
		}
		/*if(layer instanceof Array){
			for(var i=0; i<layer.length; i++){
				if(layer._instance instanceof FHMap.Layer.Vector){
					this._instance.addLayer(layer[i]._instance)
				}else{
					var markers = this.markers ? this.markers : this.markers = new FHMap.Layer.Markers("Markers");
					this._instance.addLayer(markers)
					for(var i=0; i<layer.length; i++){
						markers.addMarker(layer[i]._instance);
					}
				}
				
			}
		}else{
			if(layer._instance instanceof FHMap.Layer.Vector){
				this._instance.addLayer(layer[i]._instance)
			}else{
				var markers = new FHMap.Layer.Markers("Markers");
				this._instance.addLayer(markers)
				markers.addMarker(layer._instance);
			}
		}
*/

		if(layer._instance instanceof FHMap.Layer.Vector){
			if(layer instanceof Array){
				for(var i=0; i<layer.length; i++){
					this._instance.addLayer(layer[i]._instance)
				}
			}else{
				this._instance.addLayer(layer._instance)
			}
		}else{
			var markers = this.markers;
			if(!markers){
				markers = this.markers = new FHMap.Layer.Markers("Markers");
			}
			if(layer instanceof Array){
				this._instance.addLayer(markers)
				for(var i=0; i<layer.length; i++){
					markers.addMarker(layer[i]._instance);
				}
			}else{
				if(layer._instance.type === "marker"){
					var markers = new FHMap.Layer.Markers("Markers");
					this._instance.addLayer(markers)
					markers.addMarker(layer._instance);
				}			
			}	
		}
	}
	Map.prototype.removeLayer = function(layer){
		var markers = this.markers;
		if(!layer || !markers){
			return;
		}
		if(layer instanceof Array){
			for(var i=0; i<layer.length; i++){
				// this._instance.removeLayer(layer[i]._instance)
				var marker=markers.getMarker(layer[i]._instance.lonlat);
				if(marker) markers.removeMarker(marker);
			}
		}else{
			var marker=markers.getMarker(layer._instance.lonlat);
			if(marker) markers.removeMarker(marker);
		}
	}
	Map.prototype.removeInfoWindow = function(infoWindow){
		this._instance.removePopup(infoWindow._instance);
	}
	Map.prototype.clearLayers = function(){
		// this._instance.clearOverlays()
	}
	Map.prototype.setZoom = function(level){//[3-18]
		this._instance.zoomTo(level)
	}
	Map.prototype.getZoom = function(){
		return this._instance.getZoom()
	}
	Map.prototype.setCenter = function(lonlat){
		return this._instance.setCenter(new FHMap.LonLat(lonlat[0], lonlat[1]))
	}
	Map.prototype.getCenter = function(){
		var lonlat = this._instance.center;
		return [lonlat.lon,lonlat.lat];
	}
	Map.prototype.setMapStyle = function(features,style){
	}
	Map.prototype.zoomToBounds = function(southWest,northEast){
		var bounds = new FHMap.Bounds(southWest[0],southWest[1],northEast[0],northEast[1]);
		this._instance.zoomToBounds(bounds)
	}
	return Map;
}());
var Marker = FH_Map.Marker = (function(){
	function Marker(Lonlat,opt){
		this.labels = [];
		var offset = this.offset = opt&&opt.offset ? opt.offset : {x:0,y:0}
		var marker = this._instance = new FHMap.Marker(
			new FHMap.LonLat(Lonlat[0],Lonlat[1])
		);
		
		if(opt && opt.icon){
			this._instance.setIcon(opt.icon._instance)
		}
		if(opt && opt.infoWindow){
			this.infoWindow = opt.infoWindow;
			this._instance.popup = opt.infoWindow._instance;
		}
		if(opt && opt.content){
			if(opt.icon) return;
			this.setContent(opt.content);
		}
		this.data = this._instance.data = opt&&opt.data ? {"position":Lonlat,"data":opt.data}:{"position":Lonlat};

		if(opt && opt.events){
			var events = opt.events;
			for(var eventName in events){
				var func = events[eventName];
				marker.events.register(eventName,marker,function(res){
					func && func(res.object.data)
				})
			}
		}
		
	}
	Marker.prototype.on = function(eventName, handler){
		if(!eventName || !handler) return;
		var self = this;
		var marker = this._instance;
		marker.events.register(eventName,marker,function(res){
			// handler(res.object.data)
			handler && handler.call(self,res.object.data)
		})
	}
	Marker.prototype.off = function(eventName, handler){
	}
	Marker.prototype.setIcon = function(icon){
		this._instance.setIcon(icon._instance)
	}
	Marker.prototype.getIcon = function(){
		return this._instance.icon
	}
	Marker.prototype.setContent = function(content){
		var offset = this.offset;
		this._instance.setIcon(new FHMap.Icon(content,offset))
	}
	Marker.prototype.setPosition = function(lonlat){
		this._instance.moveToCenter(new FHMap.LonLat(lonlat[0],lonlat[1]))
		if(this.labels.length>0){
			this.labels.forEach(function(label){
				label.moveToCenter(new FHMap.LonLat(lonlat[0],lonlat[1]))
			})
		}
		return this;
	}
	Marker.prototype.getPosition = function(){
		var lonlat = this._instance.lonlat;
		return [lonlat.srcLon,lonlat.srcLat];
	}
	Marker.prototype.enableDragging = function(){
		// var dragFeature =  this.dragFeature = new FHMap.Control.DragFeature(
		// 	layer,
		// 	{
		// 		onDrag:function (feature,lonlat) {
		// 		},
		// 		onComplete:function (feature,lonlat) {
		// 		}
		// 	}
		// )
		// map.addControl(dragFeature)
        return this;
	}
	Marker.prototype.disableDragging = function(){
		// map.removeControl(this.dragFeature)
        return this;
	}
	Marker.prototype.setLabel = function(str,labelOpts){
		if(!str) return;
		var position = this.getPosition();
		var offset = labelOpts&&labelOpts.offset ? {x:labelOpts.offset.x,y:labelOpts.offset.y} : {x:0,y:0}
		var marker = new FHMap.Marker(
			new FHMap.LonLat(position[0],position[1]),
			new FHMap.Icon("<div>"+str+"</div>",offset)
		)
		var markers = new FHMap.Layer.Markers("Markers");
		this._instance.map.addLayer(markers);
		markers.addMarker(marker);
		this.labels.push(marker);
        return this;
	}
	Marker.prototype.showInfoWindow = function(){
		this._instance.showPopup();
	}
	Marker.prototype.hideInfoWindow = function(){
		this._instance.hidePopup();
	}
	return Marker;
}());
var InfoWindow = FH_Map.InfoWindow = (function(){
	function InfoWindow(map,opt){
		if(!opt) return;
		var position = opt.position;
		var content = opt.content||"";
		this.map = map;
		var infoWindow = this._instance = new FHMap.Popup({
			contentHTML:content,
			lonlat:position ? new FHMap.LonLat(position[0],position[1]) : null, 
			autoSize: true, 
			closeBox: !opt.isCustom||true,
			autoAnchor: false
		});
	}
	InfoWindow.prototype.setContent = function(content){
		var infoWindow = this._instance;
		infoWindow.setContentHTML(content);
	}
	InfoWindow.prototype.show = function(){
		var infoWindow = this._instance;
		this.map._instance.addPopup(infoWindow);
		// infoWindow.show();
	}
	InfoWindow.prototype.hide = function(){
		var infoWindow = this._instance;
		infoWindow.hide();
	}
	InfoWindow.prototype.setPosition = function(position){
		var infoWindow = this._instance;
		infoWindow.lonlat = new FHMap.LonLat(position[0],position[1]);
		infoWindow.updatePosition()


		// infoWindow.moveTo(new FHMap.LonLat(position[0],position[1]))
		// infoWindow.setPosition(new AMap.LngLat(position[0],position[1]));
	}
	InfoWindow.prototype.isOpen = function(){
		var infoWindow = this._instance;
		return infoWindow.visible();
	}
	// InfoWindow.prototype.on = function(eventName, handler){
	// 	if(!eventName || !handler) return;
	// 	var self = this;
	// 	var popup = this._instance;
	// 	marker.events.register(eventName,marker,function(res){
	// 		handler(res.object.data)
	// 	})
	// }
	return InfoWindow;
}());
var Icon = FH_Map.Icon = (function(){
	function Icon(opt){
		//？加上size后坐标在地图左上角
		var size = opt.size || {
			w:36,h:36
		}
		var offset = opt.offset || {
			x:0,y:0
		}
		this._instance = new FHMap.Icon(opt.image,size,offset);
	}
	return Icon;
}());
var Polyline = FH_Map.Polyline = (function(){
	function Polyline(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid"
		}
		var options = $.extend({},styleOpt,opt);
		options.strokeWidth = options.strokeWeight;
		options.strokeDashstyle = options.strokeStyle;
		this.options = options;
		var layer = this._instance = new FHMap.Layer.Vector('Polyline'+(Math.floor(Math.random()*100)));

		this.setPath(points)
		// var path = points.map(function(lonlat){
		// 	return new FHMap.Geometry.Point(lonlat[0], lonlat[1]);
		// })
		// var feature = new FHMap.Feature(
		// 	new FHMap.Geometry.Line(path),
		// 	{type:"Polyline"},
		// 	options
		// );
		// layer.addFeatures(feature);

		/*var editlayer = this._instance = new FHMap.Layer.Editable('EditPolyline',{
			callbacks: {
				drag: function(info){
					console.log(JSON.stringify(info));
				}
			}
		});
		editlayer.addFeatures(feature)*/
	}
	Polyline.prototype.setPath = function(points){
		var options = this.options;
		var polyline = this._instance;
		var path = points.map(function(lonlat){
			return new FHMap.Geometry.Point(lonlat[0], lonlat[1]);
		})
		polyline.removeFeatures(polyline.features)
		polyline.addFeatures(new FHMap.Feature(
			new FHMap.Geometry.Line(path),
			{type:"Polyline"},
			options
		))
	}
	Polyline.prototype.getPath = function(){
		// console.log(this._instance)
		var points = this._instance.features[0].geometry.getVertices();
		// console.log(points)
		return points.map(function (lonlat) {
            return [lonlat.srcLon,lonlat.srcLat];
        });
	}
	Polyline.prototype.getLength = function(){
		return this._instance.features[0].geometry.getLength()
	}
	Polyline.prototype.enableEditing = function(){
		
	}
	Polyline.prototype.disableEditing = function(){
		
	}

	return Polyline;
}())
var Polygon = FH_Map.Polygon = (function(){
	function Polygon(points,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({},styleOpt,opt);
		options.strokeWidth = options.strokeWeight;
		options.strokeDashstyle = options.strokeStyle;
		console.log(options)
		this.options = options;
		var layer = this._instance = new FHMap.Layer.Vector('Polygon'+(Math.floor(Math.random()*100)));
		this.setPath(points)
		/*var path = points.map(function(lonlat){
			return new FHMap.Geometry.Point(lonlat[0], lonlat[1]);
		})
		var feature = new FHMap.Feature(
			new FHMap.Geometry.Polygon(path),
			{type: 'Polygon'},
			new FHMap.Style({
				fill: new FHMap.Style.Fill(options.fillColor, options.fillOpacity, options),
				stroke: new FHMap.Style.Stroke(options.strokeColor, options.strokeWeight, options)
			})
		);
		layer.addFeatures(feature);*/
	}
	Polygon.prototype.setPath = function(points){
		var options = this.options;
		var polygon = this._instance;
		var path = points.map(function(lonlat){
			return new FHMap.Geometry.Point(lonlat[0], lonlat[1]);
		})
		polygon.removeFeatures(polygon.features)
		var feature = new FHMap.Feature(
			new FHMap.Geometry.Polygon(path),
			{type: 'Polygon'},
			options
			/*new FHMap.Style({
				fill: new FHMap.Style.Fill(options.fillColor, options.fillOpacity, options),
				stroke: new FHMap.Style.Stroke(options.strokeColor, options.strokeWeight, options)
			})*/
		);
		polygon.addFeatures(feature);
	}
	Polygon.prototype.getPath = function(){
		var points = this._instance.features[0].geometry.getVertices();
		return points.map(function (lonlat) {
            return [lonlat.srcLon,lonlat.srcLat];
        });
	}
	// Polygon.prototype.getLength = function(){
	// 	return this._instance.features[0].geometry.getLength()
	// }
	Polygon.prototype.enableEditing = function(){
		
	}
	Polygon.prototype.disableEditing = function(){
		
	}
	return Polygon;
}())
var Circle = FH_Map.Circle = (function(){
	function Circle(center,radius,opt){
		var styleOpt = {
			strokeColor: "#0000ff",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle:"solid",
			fillColor:"#ffffff",
			fillOpacity: 0.8
		}
		var options = $.extend({
			center:center,
			radius:radius
		},styleOpt,opt);
		var layer = this._instance = new FHMap.Layer.Vector('Circle'+(Math.floor(Math.random()*100)));
		var feature = new FHMap.Feature(
			new FHMap.Geometry.RegularPolygon(
				new FHMap.Geometry.Point(center[0], center[1]),options.radius,40
			),
			{type: '圆',center:center},
			new FHMap.Style({
				fill: new FHMap.Style.Fill(options.fillColor, options.fillOpacity, options),
				stroke: new FHMap.Style.Stroke(options.strokeColor, options.strokeWeight, options)
			})
		);
		layer.addFeatures(feature);
		// console.log(layer)
	}
	Circle.prototype.setCenter = function(center){
		// return this._instance.setCenter(new BMap.Point(center[0], center[1]));
	}
	Circle.prototype.getCenter = function(){
		return this._instance.features[0].data.center;
	}
	Circle.prototype.setRadius = function(radius){
		// return this._instance.setRadius(radius);
	}
	Circle.prototype.enableEditing = function(){
		
	}
	Circle.prototype.disableEditing = function(){
		
	}
	return Circle;
}())
var MarkerClusterer = FH_Map.MarkerClusterer = (function(){
	function MarkerClusterer(map,markers,opt){
		this.markers = [];
		var pointsClusterLayer = this._instance = new FHMap.Layer.MarkersCluster("MarkersCluster"+(Math.floor(Math.random()*100)),{callbacks:{
			click : function(msg){
				var resData = [];
				if(msg instanceof Array){
					// map._instance.zoomTo(18)
					msg.forEach(function(item,index){
						/*if(index == 0){
							map._instance.setCenter(new FHMap.LonLat(item.data.position[0],item.data.position[1]))
						}*/
						resData.push(item.data)
					})
					opt.click && opt.click(resData)
				}else{
					resData = msg.data
				}
				
			}
		}});
		map._instance.addLayer(pointsClusterLayer);
		/*var style = new FHMap.Style({
			text: new FHMap.Style.Text(null, {
				offsetX: 1,
				offsetY: -23
			}),
			shape: new FHMap.Style.Shape.Icon('http://10.1.126.204:9150/FHGis/api/js/FHMap/examples/img/mapload_red.png',{
				width:40,
				height:38,
				offsetX:-14,
				offsetY:-38
			})
		});
		pointsClusterLayer.setClusterStyle(style);*/

		this.addMarkers(markers)
	}
	MarkerClusterer.prototype.addMarker = function(marker){
		this.markers.push(marker);
		var marker = marker._instance
		this._instance.addMarker(marker)
	}
	MarkerClusterer.prototype.addMarkers = function(markers){
		if(!markers) return;
		if(markers.length == 0) return;
		var self = this;
		markers.forEach(function(marker){
			self.addMarker(marker)
		})
	}
	MarkerClusterer.prototype.getMarkers = function(marker){
		// var markers = this._instance.getMarkers();
		return this.markers;
	}
	MarkerClusterer.prototype.clearMarkers = function(){
		this._instance.clearMarkers();
		this.markers = [];
	}
	return MarkerClusterer;
}())

var Heatmap = FH_Map.Heatmap = (function(){
	function Heatmap(map,heatmapData,opt){
		var heatmap = this._instance = new FHMap.Layer.Heatmap('Heatmap');
		map._instance.addLayer(heatmap);
		var points = heatmapData.map(function(item){
			return new FHMap.Geometry.HeatPoint(item.lng,item.lat).setValue(item.count);
		})
		heatmap.addData(points);
	}
	Heatmap.prototype.hide = function(){
		this._instance.setVisibility(false);
	}
	Heatmap.prototype.show = function(){
		this._instance.setVisibility(true);
	}
	Heatmap.prototype.setData = function(heatmapData,opt){
		var points = heatmapData.map(function(item){
			return new FHMap.Geometry.HeatPoint(item.lng,item.lat).setValue(item.count);
		})
		this._instance.setData({
			data: points
		});
	}
	Heatmap.prototype.getData = function(){
		var datas = this._instance.datas;
		var points = datas.map(function(item){
			return {
				"lng": item.srcLon,
				"lat": item.srcLat,
				"count": item.value
			}
		})
		return points;
	}
	return Heatmap;
}())

var Toolbar = FH_Map.Toolbar = (function(){
	function Toolbar(map,opt){
		var self = this;
		this.overlays = [];
		var layer = this._instance = new FHMap.Layer.Vector("Toolbar");
		map._instance.addLayer(layer);
		// 'Navigation','point','Line','Rectangle','Circle','Polygon','Select','Clear','MeasureLength','MeasureArea'
		//'point','Line','Rectangle','Circle','Polygon','Clear'
		var toolBar = new FHMap.Control.Toolbar(layer,['Navigation','Point','Line','Rectangle','Circle','Polygon'],{
			finishDraw:function(feature){
				console.log(feature,this)
				// console.log(this.control.shapeType)
				var overlay = this;//layer.getFeatures().slice(-1)[0];
				var type = "";
				// console.log(feature)
				// layer.removeFeatures([feature])
				if(typeof opt === "function"){
					// .getActiveControl()
					self.overlays.push(overlay)
					switch (this.control.shapeType){
						case "Point":
							type = "marker";
							break;
						case "Line":
							type = "polyline";
							break;
						case "Polygon":
							type = "polygon";
							break;
						case "Circle":
							type = "circle";
							break;
						case "Rectangle":
							type = "rectangle";
							break;
					}
					opt.call(self,type,overlay)
				}
			},
			featureSelect:function(feature){
				// console.log("featureSelect",feature)
			}
		})

	}
	Toolbar.prototype.clearOverlays = function(){
		this._instance.removeAllFeatures();
	}
	return Toolbar;
}())
var Track = FH_Map.Track = (function(){
	function Track(map,opt){
		var tracksLayer = this._instance = new FHMap.Layer.Tracks("Tracks",{
			callbacks:{
				click : function(msg){
					// alert(msg.type)
				}
			}
		});
		map._instance.addLayer(tracksLayer);

		// tracksLayer.events.on({
		// 	trackPlaying: function(track){
		// 		var label = "我已经跑了"+(track.percent*100).toFixed(0)+"%";
		// 		if(track.reach && track.reach.marker){
		// 			track.reach.marker.setUrl("img/mapload_blue.png");
		// 		}
		// 		track.point.style.label = label;
		// 		track.point.style.labelYOffset = 40;
		// 	},
		// 	trackFinished: function(track){
		// 		track.point.style.label = "我跑完了";
		// 		if(track.pointLayer){
		// 			track.pointLayer.drawFeature(track.point);
		// 		}else{
		// 			track.layer.drawFeature(track.point);
		// 		}
		// 	}
		// })
 
		// var pointLayer = this.pointLayer = new FHMap.Layer.Vector("pointLayer");
		// map._instance.addLayer(pointLayer);

		// this.addTrack()
	}
	Track.prototype.addTrack = function(){
		var tracksLayer = this._instance;
		var points = [
			new FHMap.Geometry.Point(118.75260,32.05386),
			new FHMap.Geometry.Point(118.75844,32.05886),
			new FHMap.Geometry.Point(118.75844,32.05386),
			new FHMap.Geometry.Point(118.75944,32.05686)
		];
 
		var fill = new FHMap.Style.Fill('white');
		//设置曲线样式
		var style = new FHMap.Style({
			curve: new FHMap.Style.Curve(40, {
				text: new FHMap.Style.Text('顺时针曲线', {
					fontSize: "20px",
					fontColor: "black"
				}),
				textLocation: 0.3
			}),
			shape: new FHMap.Style.Shape.Icon('img/mapload_red.png',{
				width:40,
				height:38,
				offsetX:-13,
				offsetY:-37
			})
		});
		points[0].setStyle(style);
		//设置点样式为圆形
		style = new FHMap.Style({
			fill: new FHMap.Style.Fill('yellow'),
			stroke: new FHMap.Style.Stroke('blue',2),
			text: new FHMap.Style.Text('11'),
			curve: new FHMap.Style.Curve(30,{
				anticlockwise: true,
				text: new FHMap.Style.Text('逆时针曲线'),
				textLocation: 0.3,
				textRotation: 0
			}),
			shape: new FHMap.Style.Shape.Circle(14)
		});
		points[1].setStyle(style);
 
		//设置实心圆样式
		style = new FHMap.Style({
			curve: new FHMap.Style.Curve(0, {
				text: new FHMap.Style.Text('直线内容', {
					fontSize: "16px",
					fontWeight: 'bold'
				}),
				textLocation: 0.7
			}),
			shape: new FHMap.Style.Shape.Circle(6)
		});
		points[2].setStyle(style);
 
		//设置白底圆样式
		style = new FHMap.Style.Shape.Circle(20, {
			fill: fill,
			text: new FHMap.Style.Text('内容')
		});
		points[3].setStyle(style);
 
		var stroke = new FHMap.Style.Stroke('red',2);
		var track1 = new FHMap.Feature.Track(points,{fid:"line2"},stroke);
		track1.setArrowHeadStyle(true);
		tracksLayer.addTrack(track1,{autoZoom:true});		
	}
	Track.prototype.start = function(){
		var tracksLayer = this._instance;
		tracksLayer.clearTracks()
		// var pointLayer = this.pointLayer;
		// pointLayer.setZIndex(4000)
		var points = [
			new FHMap.Marker(new FHMap.LonLat(118.76260,32.05386),new FHMap.Icon(""),new FHMap.Popup({contentHTML:"我是起点"}),{"startTime":"2015-10-12 00:01:00"}),
			new FHMap.Marker(new FHMap.LonLat(118.75944,32.05686),new FHMap.Icon(""),null,{"startTime":"2015-10-13 00:01:00"}),
			new FHMap.Marker(new FHMap.LonLat(118.7488532,32.0574768),new FHMap.Icon(""),null,{"startTime":"2015-10-18 00:01:00"}),
			new FHMap.Marker(new FHMap.LonLat(118.7498532,32.0564768),new FHMap.Icon(""),null,{"startTime":"2015-10-25 00:01:00"}),
			new FHMap.Marker(new FHMap.LonLat(118.75260,32.05386),new FHMap.Icon(""),null,{"startTime":"2015-10-30 00:01:00"})
		];
		var track = this.track = new FHMap.Feature.Track(points,{fid:'line1'+Math.random()},{strokeColor:'blue',play:{externalGraphic: 'img/sign.png', graphicWidth: 32, graphicHeight: 32, graphicXOffset: -16 ,graphicYOffset: -18}});
		//播放点和轨迹线需要各自设置层级的时候,需添加一个播放点图层传进去，调用下面方法
		// tracksLayer.playTrack(track, 0, {dynamic: true,pointLayer:pointLayer,customPlayTime:20,playImageRotation:true});
		 
		//默认播放点和轨迹线在同一层级上
		tracksLayer.playTrack(track, 0, {dynamic: true});		
	}
	Track.prototype.pause = function(){
		var tracksLayer = this._instance;
		var track = this.track;
		tracksLayer.stopTrack(track);
	}
	Track.prototype.resume = function(){
		var tracksLayer = this._instance;
		var track = this.track;
		tracksLayer.playTrack(track);
	}
	Track.prototype.stop = function(){
		var tracksLayer = this._instance;
		tracksLayer.clearTracks()
	}
	
	return Track;
}())
var Geocoder = FH_Map.Geocoder = (function(){
	function Geocoder(opt){
		this.option = opt||null;
		var geocoder = this._instance = new FHMap.Protocol.Geocoder({async: false});
	}
	Geocoder.prototype.getLocation = function(address,callback){
		var geocoder = this._instance;
		var option = this.option;
		var res = geocoder.forward(address, 0, 5, option);
		var result = null;
		if(res && res.list.length>0){
			result = res.list[0].geometry.coordinates
		}
		callback && callback(result)
	}
	Geocoder.prototype.getAddress = function(lonlat,callback){
		var geocoder = this._instance;
		var res = geocoder.inverse(lonlat[0],lonlat[1])
		var result = {
			address:res.address,
			addressComponent:{
				province:res.province,
				city:res.city,
				district:res.area,
				cityCode:res.cityCode
			}
		}
		callback && callback(result)
	}
	return Geocoder;
}())	
/********************************pgis地图end***************************************/


return Z;
})