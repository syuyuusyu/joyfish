var Syu = {
		version:1.0
	};
	
Syu.apply=function(o,c,defaults){
	if(defaults){
		Syu.apply(o,defaults);	
	}
	if (o && c && typeof c==='object'){
		for (var p in c){
			o[p]=c[p];	
		}
	}
	return o;	
};

Syu.arrayRemoveAndDelete=function(flag){
    if(Array.prototype.remove && Array.prototype.indexOf){
        if(flag){
            Array.prototype.remove=function(o){
                var index=this.indexOf(o);
                if(index!=-1){
                    this.splice(index,1);
                    delete o;
                }	
            }
        }else {
            Array.prototype.remove=function(o){
                var index=this.indexOf(o);
                if(index!=-1){
                    this.splice(index,1);
                }	
            }
        }
    }
};

(function(){
	var toString=Object.prototype.toString,
      ua = navigator.userAgent.toLowerCase(),
      check = function(r){
          return r.test(ua);
      },
      DOC = document,
      docMode = DOC.documentMode,
      isStrict = DOC.compatMode == "CSS1Compat",
      isOpera = check(/opera/),
      isChrome = check(/\bchrome\b/),
      isWebKit = check(/webkit/),
      isSafari = !isChrome && check(/safari/),
      isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
      isSafari3 = isSafari && check(/version\/3/),
      isSafari4 = isSafari && check(/version\/4/),
      isIE = !isOpera && check(/msie/),
      isIE7 = isIE && (check(/msie 7/) || docMode == 7),
      isIE8 = isIE && (check(/msie 8/) && docMode != 7),
      isIE9 = isIE && check(/msie 9/),
      isIE6 = isIE && !isIE7 && !isIE8 && !isIE9,
      isGecko = !isWebKit && check(/gecko/),
      isGecko2 = isGecko && check(/rv:1\.8/),
      isGecko3 = isGecko && check(/rv:1\.9/),
      isBorderBox = isIE && !isStrict,
      isWindows = check(/windows|win32/),
      isMac = check(/macintosh|mac os x/),
      isAir = check(/adobeair/),
      isLinux = check(/linux/),
      isSecure = /^https/i.test(window.location.protocol);
      
      Syu.apply(Syu,{
      	docMode:docMode,
      	isStrict:isStrict,
      	isOpera:isOpera,
      	isChrome:isChrome,
      	isWebKit:isWebKit,
      	isSafari:isSafari,
      	isSafari2:isSafari2,
      	isSafari3:isSafari3,
      	isSafari4:isSafari4,
      	isIE:isIE,
      	isIE7:isIE7,
      	isIE8:isIE8,
      	isIE9:isIE9,
      	isIE6:isIE6,
      	isGecko:isGecko,
      	isGecko2:isGecko2,
      	isGecko3:isGecko3,
      	isBorderBox:isBorderBox,
      	isWindows:isWindows,
      	isMac:isMac,
      	isLinux:isLinux,
      	isSecure:isSecure,
      	
        extend:function(){
                var override=function(o){
                for(var p in o){
                    this[p]=o[p];
                }	
            },
                oc=Object.prototype.constructor;
                return function(parent,child,overrides){
                    if (typeof child=='object'){
                        overrides=child;
                        child=parent;
                        parent=overrides.constructor==oc?function(){child.apply(this,arguments);}:overrides.constructor;	
                    }
   //                 for(var p in child){
   //                     parent[p]=child[p];	
   //                 }
                    var F=function(){};
                    F.prototype=child.prototype;
                    parent.prototype=new F();
                    parent.prototype.constructor=parent;
                    parent.superclass=child.prototype;
                    parent.prototype.superclass=function(){return child.prototype;};
                    parent.prototype.override=override;

                    parent.override=function(o){
                        Syu.override(parent,o);
                    };
                    Syu.override(parent,overrides);
                    parent.extend=function(o){
                        return Syu.extend(parent,o);
                    };
                    return parent;
                };
        }(),
          
   
      	override:function(origclass,overrides){
      		if(overrides){
      			var p=origclass.prototype;
      			Syu.apply(p,overrides);	
      		}
      	},
      	
      	isArray:function(v){
      		return 	toString.call(v)=="[object Array]";
      	},
      	
      	isFunction:function(v){
      		return toString.call(v)=="[object Function]";	
      	},
      	
      	isNumber:function(v){
      		return toString.call(v)=="[object Number]";	
      	},
      	
      	isString:function(v){
      		return toString.call(v)=="[object String]";	
      	},
      	
        namespace : function(){
            var len1 = arguments.length,
                i = 0,
                len2,
                j,
                main,
                ns,
                sub,
                current;
                
            for(; i < len1; ++i) {
                main = arguments[i];
                ns = arguments[i].split('.');
                current = window[ns[0]];
                if (current === undefined) {
                    current = window[ns[0]] = {};
                }
                sub = ns.slice(1);
                len2 = sub.length;
                for(j = 0; j < len2; ++j) {
                    current = current[sub[j]] = current[sub[j]] || {};
                }
            }
            return current;
        },


        define :function(className,o){
            var fn,
                current,
                main,
                sub,
                oc = Object.prototype.constructor,
                ns = className.split('.'),
                constr = o.constructor != oc ? o.constructor : function(){};
            if ( o.extend && o.constructor == oc ){
                constr = function(){ o.extend.apply(this,arguments)};
            }
            if(ns.length==1){
                window[className]=constr;
                fn=window[className];
            } else {
               main = ns.splice(0,ns.length-1).join('.');
               sub = ns.slice(ns.length-1).join('.');
               current=Syu.namespace(main);
               fn=current[sub]=constr;
            }
            if(o.extend && Syu.isFunction(o.extend)){
                Syu.extend(fn,o.extend);	
            }
            if(o.static && toString.call(o.static.constructor)==="[object Function]"){
                Syu.apply(fn,o.static);
            }
            if(o.config && toString.call(o.config.constructor)==="[object Function]"){
                Syu.apply(fn.prototype,o.config);
            }
            delete fn;
        },
          
        valueArray : function(arr){
            var a=[];
            if(!Syu.isArray(arr))
                return null;
            for(var i=0;i<arr.length;i++){
                a.push(arr[i]);
            }
            return a;
        }
      });
})();

Syu.ns=Syu.namespace;

Syu.apply(Function.prototype,{
		createInterceptor:function(fn,scope){
			var method=this;
			return !Syu.isFunction(fn)?
				this:
				function(){
					var me=this,
						arg=arguments;
				  return (fn.apply(scope||me||window,arg)!==false)?
				  		method.apply(me||window,arg):
				  		null;	
				}	
		},
		
		createCallback:function(){
			var method=this,
					arg=arguments;
			return method.apply(window,arg);
		},
    
        createDelegate : function(obj, args, appendArgs){
            var method = this;
            return function() {
                var callArgs = args || arguments;
                if (appendArgs === true){
                    callArgs = Array.prototype.slice.call(arguments, 0);
                    callArgs = callArgs.concat(args);
                }else if (Syu.isNumber(appendArgs)){
                    callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                    var applyArgs = [appendArgs, 0].concat(args); // create method call params
                    Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
                }
                return method.apply(obj || window, callArgs);
            };
        },
    
        defer : function(millis, obj, args, appendArgs){
            var fn = this.createDelegate(obj, args, appendArgs);
            if(millis > 0){
                return setTimeout(fn, millis);
            }
            fn();
            return 0;
        }
    
	});
	
Syu.apply(Array.prototype,{
		indexOf:function(o,from){
			from=from||0;
			var len=this.length;
			from+=(from<0)?len:0;
			for(; from<len;from++){
				if (this[from]===o)
					return from;	
			}	
			return -1;
		}
		
		,remove:function(o){
			var index=this.indexOf(o);
			if(index!=-1){
				this.splice(index,1);	
			}	
		}
	});
	
Syu.ns('Syu.util');
/**
	object task with blow params:
	var task={
		run:method,
		interval:intervalTime,
		onStop:
		startTime,
		runCount,
		runTime,
		repeat,
		duration,
		scope
	}
*/

Syu.util.TaskRunner=function(interval){
	 interval=interval||10;
	 var tasks=[],
         removeTasks=[],
         id=0,
         taskId=0,
         isRunning=false,

         startThread=function(){
            isRunning=true;
            id=setInterval(runTask,interval);	
         },	 		 
         stopThread=function(){
            isRunning=false;
            clearInterval(id);
            id=0;	
         },
         removeTask=function(t){
            removeTasks.push(t);
            if(t.onStop){
                t.onStop.apply(t.scope||t);	
            }	
         },
         runTask=function(){
             var now=new Date().getTime();
             if(removeTasks.length>0){
                 for(var i=0;i<removeTasks.length;i++){
                        tasks.remove(removeTasks[i]);	
                 }	
                 if(tasks.length<1){
                     return;	
                 }
             }
             for(var i=0,t,rt,itime,len=tasks.length;i<len;i++){
                t=tasks[i];
                itime=now-t.runTime;
                if(t.interval<itime){
                    rt=t.run.apply(t.scope||t,[++t.runCount].concat(t.args));
                    t.runTime=now;	
                    if(rt==false || t.runCount==t.repeat){
                        removeTask(t);	
                    }	
                }
                if(t.duration && t.duration<now-t.starTime){
                    removeTask(t);	
                }
             }
         };
	 		 
     this.runTask=function(t,o){
            if(Syu.isFunction(t)){
                var obj={};
                obj.run=t;
                if(o){
                    Syu.apply(obj,o);	
                }
                t=obj;
            }
            tasks.push(t);
            t.runCount=0;
            t.runTime=0;
            t.startTime=0;
            if(isRunning==false)
                startThread();
            taskId++;	
            return taskId;
     };
     this.stopTask=function(t){
            removeTask(t);
            return t;
     };
     this.StopAll=function(t){
            stopThread();
            for(var i = 0, len = tasks.length; i < len; i++){
                if(tasks[i].onStop){
                    tasks[i].onStop();
               }
           }
           tasks = [];
           removeQueue = [];	
     };
     this.getRunCount=function(i){
         return tasks[i-1].runCount;
     };
};
Syu.TaskMgr = new Syu.util.TaskRunner();	

Syu.define('Syu.util.Event',{
    constructor:function(obj,name){
        this.obj=obj;
        this.name=name;
        this.listeners=[];
    }
    ,config:{
        addEventListener:function(fn,scope,option){
            var option=option||{},
                h=fn;
            if(option.delay){
                //todo
            }
           if(option.single){
                //todo
            }
            this.listeners.push({fn:h,scope:scope});
        }
        ,removeEventListener:function(fn){
            var i,len=this.listeners.length;
            for(i=0;i<len;i++){
                if(fn==this.listeners[i].fn){
                    this.listeners.slice(i,1);
                }
                
            }
        }
        ,fire:function(){           
            var ls=this.listeners,
                len=ls.length,
                arg=Array.prototype.slice.call(arguments,0),
                i=0;
            if(len>0){
                for(;i<len;i++){
                    ls[i].fn.apply(ls[i].scope||this.obj,arg);
                }
            }
        }
    }
});


Syu.define('Syu.util.Observable',{
    config:{
        events:{}
        ,addListener:function(eventName,fn,scope,option){
            if(!this.events[eventName]){
                this.events[eventName]=new Syu.util.Event(this,eventName);
            }
            this.events[eventName].addEventListener(fn,scope,option);
        }
        ,fireEvent:function(eventName){
            if(this.events[eventName]){
                var arg=Array.prototype.slice.call(arguments,1);
               this.events[eventName].fire.apply(this.events[eventName],arg);
            }
        }
        
    }
});

Syu.util.Observable.prototype.on=Syu.util.Observable.prototype.addListener;

	
Syu.define('Syu.game.Rectangle',{
    constructor:function(gameObject){
        this.gameObject=gameObject;
        this.someThing='something';
    }
    ,config:{
        getPoiont:function(gameObj){
            var C=gameObj.constructor,
                bw=C.blankWidth||0,
                bh=C.blankHeight||0,
                w=C.width||gameObj.width-bw*2,
                h=C.height||gameObj.height-bh*2,
                x=gameObj.cx,
                y=gameObj.cy,
                angle=gameObj.angle,
                ax=x+bw,
                ay=y+bh,
                bx=w*Math.cos(angle)+x,
                by=w*Math.sin(angle)+y,
                cx=x-h*Math.sin(angle),
                cy=y+h*Math.cos(angle),
                dx=w*Math.cos(angle)-h*Math.sin(angle)+x,
                dy=w*Math.sin(angle)+h*Math.cos(angle)+y,
                arrx=[ax,bx,cx,dx],
                arry=[ay,by,cy,dy],
                maxX=arrx.sort(function(a,b){return a>b?1:-1})[arrx.length-1],
                minX=arrx.sort(function(a,b){return a>b?1:-1})[0],
                maxY=arry.sort(function(a,b){return a>b?1:-1})[arry.length-1],
                minY=arry.sort(function(a,b){return a>b?1:-1})[0];
            return [minX,minY,maxX,maxY];
        }
        ,check:function(minX1, minY1, maxX1, maxY1, minX2, minY2, maxX2, maxY2){
            return (minX1<minX2?(maxX1>minX2):(maxX2>minX1))
                &&(minY1<minY2?(maxY1>minY2):(maxY2>minY1))
                
        }
        ,isImpact:function(other){
            
            if(!other instanceof Syu.game.GameObject){
                return false;
            }
            var a=Syu.valueArray(this.getPoiont(this.gameObject)),
                b=Syu.valueArray(this.getPoiont(other)),                
                c=this.check(a[0],a[1],a[2],a[3],b[0],b[1],b[2],b[3]);
            return c;
        }
    }
});
Syu.game.poleTranslate=function(x,y,angle){
    var a=[];
    a.push(x*Math.cos(-angle)-y*Math.sin(-angle));
    a.push(x*Math.sin(-angle)+y*Math.cos(-angle));
    return a;
}
Syu.define('Syu.game.GameObject',{
    config:{
       beforeDraw:function(){}
       ,afterDraw:function(){}
       ,draw:function(){
           var ctx=this.ctx,
               point=this.rotatePoint();
           ctx.save();          
           this.beforeDraw();          
           this.rotate(this.angle,point.x,point.y);  
           ctx.drawImage.apply(ctx,this.getImageStatus());
           this.afterDraw();
           ctx.restore();
       }
       ,rotatePoint:function(){               
            return {
                   x:this.x,
                   y:this.y
               };            
        }        
       ,rotate:function(angle,x0,y0){          
           this.ctx.rotate(angle);
           var x=this.x,
               y=this.y,
               x1=(x-x0)*Math.cos(angle)-(y-y0)*Math.sin(angle)+x0,
               y1=(x-x0)*Math.sin(angle)+(y-y0)*Math.cos(angle)+y0,
               a=Syu.valueArray(Syu.game.poleTranslate(x1,y1,angle));
           this.cx=x1;
           this.cy=y1;
           this.dx=a[0];
           this.dy=a[1];
       }
       ,move:function(){}
       ,isImpact:function(other){
           if(!this.rectangle || !other.rectangle){
                return null;
           }
           return this.rectangle.isImpact(other);
       }
       ,getImageStatus:function(){}
   }
   ,extend:Syu.util.Observable
});



