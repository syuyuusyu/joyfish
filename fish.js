var fishTask=new Syu.util.TaskRunner(10);
var DEG=Math.PI/180;
var initIndex=function(arr,len){
  var r=[];
  for(var i=0,a=Syu.valueArray(arr);i<len;i++){
    var b=[];
    for(var j=0;j<a.length;j++){
      if(j==1){
        b.push(i*a[3]);      
      }else{
        b.push(a[j]);
      }
    }
    r.push(b);
   
  }
  return r;
}
//TODO
var startPoint2=[50,100,150,200,250,300,350,400,450,500,550,600];
var line=function(a,b,c,d){
            var s=0,
                angleFlag=1,
                piFlag=0;
            if(a>1024){
                s=-this.speed;
                angleFlag=-1;
                piFlag=Math.PI;
                
            }
            else{
                s=this.speed;
            }
            this.x+=s;
            this.y=((b-d)*this.x-c*b+a*d)/(a-c);
            this.angle=angleFlag*Math.asin((d-b)/Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)))+piFlag;
}


//Math.floor(Math.random()*(max-min+1)+min);
Syu.define('MovePath',{
    constructor:function(fish,pathIndex){
        this.fish=fish;
        this.pathIndex=pathIndex;
    }
    ,config:{
        move:function(){
            switch(this.pathIndex){
                case 1:
                    this.line(this.fish.a,this.fish.b,3000,100);
                    break;
                case 2:
                    this.sine(this.fish.a,this.fish.b,3000,100);
            }
        }
        ,line:function(a,b,c,d){
            var s=0,
                angleFlag=1,
                piFlag=0;
            if(a>1024){
                s=-this.fish.speed;
                angleFlag=-1;
                piFlag=Math.PI;
                
            }
            else{
                s=this.fish.speed;
            }
            this.fish.x+=s;
            this.fish.y=((b-d)*this.fish.x-c*b+a*d)/(a-c);
            this.fish.angle=angleFlag*Math.asin((d-b)/Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)))+piFlag;
        }
        ,sine:function(a,b,c,d){
            var s=0,
                angleFlag=1,
                piFlag=0;
            if(a>1024){
                s=-this.fish.speed;
                angleFlag=-1;
                piFlag=Math.PI;
                
            }
            else{
                s=this.fish.speed;
            }
            var angle1=angleFlag*Math.asin((d-b)/Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)))+piFlag,
                lastx=this.fish.x,
                lasty=this.fish.y;
            this.fish.x=(this.fish.x-a)*Math.cos(angle1)-(this.fish.y-b)*Math.sin(angle1)+a;
            console.log(this.fish.x);
            this.fish.x+=s;
            console.log(this.fish.x+' '+s);
            this.fish.y=Math.sin(this.fish.x)+b;
        }
    }
});

var getProbability=function(probability){
    return Math.floor(Math.random()*101)>100*probability?false:true;
}


Syu.define('GameClient',{
    config:{
        items:{
            cannons:[],
            fish:[],
            web:[],
            bullets:[],
            coins:[]
        }
        ,score:10000
        ,eh:0
        ,drawScore:function(){
            var a=this.score%10,
                b=(this.score%100-a),
                c=(this.score%1000-b-a),
                d=(this.score%10000-c-b-a),
                e=(this.score%100000-d-c-b-a),
                f=(this.score%1000000-e-d-c-b-a),
                g=[9,8,7,6,5,4,3,2,1,0],
                h=213*((this.eh<=1000?this.eh:1000)/1000);
            b/=10;
            c/=100;
            d/=1000;
            e/=10000;
            f/=100000;
            //TODO
            ctx0.drawImage(NumnerImage,0,g[f]*24,20,24,108,layer0.height-25,20,24);
            ctx0.drawImage(NumnerImage,0,g[e]*24,20,24,130,layer0.height-25,20,24);
            ctx0.drawImage(NumnerImage,0,g[d]*24,20,24,153,layer0.height-25,20,24);
            ctx0.drawImage(NumnerImage,0,g[c]*24,20,24,176,layer0.height-25,20,24);
            ctx0.drawImage(NumnerImage,0,g[b]*24,20,24,200,layer0.height-25,20,24);
            ctx0.drawImage(NumnerImage,0,g[a]*24,20,24,224,layer0.height-25,20,24); 
            ctx0.drawImage(energyImage,0,0,213,19,630,layer0.height-25,h,19); 
        }
        ,add:function(gameObject){
            if(!gameObject instanceof Syu.game.GameObject)
                return;
            var C=this;
            if(gameObject instanceof Cannon){
                C.items.cannons.push(gameObject);
            }
            if(gameObject instanceof Bullet){
                C.items.bullets.push(gameObject);
            }            
            if(gameObject instanceof Fish){
                C.items.fish.push(gameObject);
            }
            if(gameObject instanceof Web){
                C.items.web.push(gameObject);
            }
            if(gameObject instanceof Coin){
                C.items.coins.push(gameObject);
            }
        }
        ,remove:function(gameObject,eventFlag){
            if(!gameObject instanceof Syu.game.GameObject)
                return;
            var C=this;
            if(gameObject instanceof Cannon){
                C.items.cannons.remove(gameObject);
            }
            if(gameObject instanceof Fish){
                if(eventFlag)
                    this.fireEvent('removeFish',gameObject);
                C.items.fish.remove(gameObject);
            }
            if(gameObject instanceof Web){
                C.items.web.remove(gameObject);
            }
            if(gameObject instanceof Coin){
                C.score+=gameObject.score;
                this.eh+=gameObject.score;
                C.items.coins.remove(gameObject);
            }
            if(gameObject instanceof Bullet){
                if(eventFlag)
                    this.fireEvent('removeBullet',gameObject);
                C.items.bullets.remove(gameObject);
            }               
        }
        ,iterate:function(){
            this.drawScore();
            for(p in this.items){
                for(var i=0, C=this.items[p];i<C.length;i++){
                    C[i].draw();   
                    if(C[i] ){//&& !(C[i] instanceof Fish)
                        C[i].move(); 
                    
                    }
                }
            }
        }
    }
    ,extend:Syu.util.Observable
});



Syu.define('Cannon',{
    constructor:function(gameClient){
        this.gameClient=gameClient;
        this.gameClient.add(this);
        this.alive=true;
        this.index=0;
        this.angle=0;
        this.layer=1;
        this.canvas=window['layer'+this.layer];
        this.ctx=this.canvas.getContext('2d');
        this.onFire=false;        
        this.level=7;
        this.x=512-36;
        var b=[20,18,18,11,,9,4,0];
        this.y=this.canvas.height-84+b[this.level-1];  
        Cannon.superclass.constructor.call(this, {});

    }
    ,config:{
        getImageStatus:function(){
            this.image=window['cannon'+this.level+'Image']; 
            this.width=this.image.width;
            this.height=this.image.height;
            var width=this.width,
                height=this.height/5,
                x=this.dx,
                y=this.dy;     
            if(this.onFire){
                if(this.index>3){
                    this.index=0;
                    this.onFire=false;
                }
                var a=[this.image].concat(this.fireIndex()[this.index]).concat([x,y,width,height]);
                this.index++;
                return a;
            }else{
                return [this.image].concat(this.fireIndex()[0]).concat([x,y,width,height]);
            }
        }
        ,beforeDraw:function(){
            var b=[20,18,18,11,9,4,0];
            this.y=this.canvas.height-84+b[this.level-1];             
        }
        ,fire:function(){
            console.log(this.someThing);
            var angle=this.angle
            function correct(level){
                var a=[12,10,8,6,5,3,2];
                return {
                    x:Math.sin(DEG*90-angle)*a[level-1],
                    y:Math.cos(DEG*90-angle)*a[level-1]
                }
            };
            var currectPoint=this.rotatePoint();
            var a=[12,10,8,6,5,3,2];
            if(this.gameClient.score>=this.level){
                new Bullet(this.gameClient,currectPoint.x-36+a[this.level-1],currectPoint.y,0,this.angle,this.level);
                this.gameClient.score-=this.level
            }
            this.onFire=true;
            
        }
        ,fireIndex:function(){
            var level=this.level,
                a=[74,76,76,83,85,90,94],
                b=a[level-1];
            return [[0,0,74,b],[0,b,74,b],[0,b*2,74,b],[0,b*3,74,b]];
        }
        ,rotatePoint:function(){
           var a=[74,76,76,83,85,90,94];            
            return {
                   x:this.x+36,
                   y:this.y+a[this.level-1]
               };            
        }
    }
    ,static:{
        width:74,
        height:74
    }
    ,extend:Syu.game.GameObject
});

Syu.define('Bullet',{
    constructor:function(gameClient,x,y,z,angle,level){
        this.x=x;
        this.y=y;
        this.layer=z;
        this.canvas=window['layer'+this.layer];
        this.ctx=this.canvas.getContext('2d');
        this.alive=true;     
        this.index=0;
        this.angle=angle-90*DEG;
        this.level=level;
        this.image=window['bullet'+this.level+'Image'];
        this.width=this.image.width;
        this.height=this.image.height;
        this.speed=5+this.level;
        this.index=0;
        this.rectangle=new Syu.game.Rectangle(this);
        this.gameClient=gameClient;
        this.gameClient.add(this);
    }
    ,config:{
        move:function(){
            //console.log('bullet move');
            if(this.alive){
                var xSpeed=Math.cos(this.angle)*this.speed,
                    ySpeed=Math.sin(this.angle)*this.speed;
               this.x+=xSpeed;
               this.y+=ySpeed;
               if(this.cy<-100 || this.cx<-100 || this.cx>1200){
                   this.gameClient.remove(this);
               }
                for(var i=0;i<this.gameClient.items.fish.length;i++){
                    if(this.isImpact(this.gameClient.items.fish[i])){
                        this.gameClient.remove(this,true);
                    }
                }
            }
        }
        ,getImageStatus:function(){
            return [this.image].concat([0,0,this.width,this.height]).concat([this.dx,this.dy,this.width,this.height]);
        }
       ,rotatePoint:function(){
            return {
                   x:this.x+this.width/2,
                   y:this.y
               };
       }               
    }
    ,extend:Syu.game.GameObject
});

Syu.define('Web',{
    constructor:function(gameClient,x,y,z,level){
        this.angle=0;
        this.level=level;
        this.image=window['web'+this.level+'Image'];
        this.width=this.image.width;
        this.height=this.image.height;
        this.x=x-this.width/2;
        this.y=y-this.height/2;        
        this.canvas=window['layer'+z];
        this.ctx=this.canvas.getContext('2d');
        this.gameClient=gameClient;
        this.gameClient.add(this);
        this.rectangle=new Syu.game.Rectangle(this);
        this.index=0;
        this.alive=true;
    }
    ,config:{
        getImageStatus:function(){
            return [this.image].concat(this.cx,this.cy,this.width,this.height);
        }
        ,move:function(){
            this.index++;
            if(this.index>1)
                this.alive=false;
            if(this.index>20)
                this.gameClient.remove(this);
            if(this.alive){
                for(var i=0;i<this.gameClient.items.fish.length;i++){
                   if(this.isImpact(this.gameClient.items.fish[i])){
                       if(getProbability(this.gameClient.items.fish[i].constructor.probability))
                            this.gameClient.items.fish[i].alive=false;
                   }
                }
            }
        }
    }
    ,extend:Syu.game.GameObject
});

Syu.define('Coin',{
    constructor:function(g,x,y,z,l,m){
        this.gameClient=g;
        this.gameClient.add(this);
        this.init(x,y,z);
        if(l==1){
            this.image=coin1Image;
            this.score=m;
        }
        if(l==2){
            this.image=coin2Image;
            this.score=m*10;
        }
        this.count=0;
        this.multiple=m;
        this.a=this.x;
        this.b=this.y;
    }
    ,config:{
        init:function(x,y,z){
           var C=this.constructor;
           this.x=x;
           this.y=y;
           this.angle=0;
           this.layer=z||Math.ceil(Math.random()*3+1);
           this.canvas=window['layer'+this.layer];
           this.ctx=this.canvas.getContext('2d');    
           this.index=0;
           this.task={
               run:function(count){
                    this.index=count%C.swimingIndex.length;
               }
               ,scope:this
               ,interval:this.swimInterval||C.swimInterval|100
           }
           fishTask.runTask(this.task);            
       }   
        ,move:function(){
            this.count++;
            if(this.count>=10){
                if(this.a>150)
                    this.x-=5;
                else
                    this.x+=5;
                this.y=((this.b-this.canvas.height-30)*this.x+(this.canvas.height-30)*this.a-150*this.b)/(this.a-150);
            }
            if(this.y>this.canvas.height-30){
                this.gameClient.remove(this);
                fishTask.stopTask(this.task);
            }
            
        }
        ,getImageStatus:function(){
            return [this.image].concat(this.constructor.swimingIndex[this.index])
                .concat(this.x,this.y,this.constructor.width,this.constructor.height);
        }
        ,afterDraw:function(){
            if(this.count<20){
                this.ctx.drawImage(coinTextImage,360,0,36,49,this.x+this.image.width+10,this.y,36,49);
                if(this.multiple<10){
                    this.ctx.drawImage(coinTextImage,this.multiple*36,0,36,49,this.x+this.image.width+10+46,this.y,36,49);
                }else{
                    this.ctx.drawImage(coinTextImage,36,0,36,49,this.x+this.image.width+10+46,this.y,36*2,49*2);
                    this.ctx.drawImage(coinTextImage,0,0,36,49,this.x+this.image.width+10+46+46,this.y,36*2,49*2);
                }
            }
        }
    }
    ,static:{
        width:60,
        height:60,
        swimingIndex:initIndex([0,0,60,60],10),
        indexLen:10
        
    }
    ,extend:Syu.game.GameObject
});


Syu.define('Fish',{
   constructor:function(gameClient,x,y,z){
       if(gameClient instanceof GameClient){
           this.gameClient=gameClient;
           this.gameClient.add(this);
       }else{
           z=y;
           y=x;
           x=gameClient;          
       }
       this.init(x,y,z);
       this.a=x;
       this.b=y;
       var min=this.constructor.speedRange[0],
           max=this.constructor.speedRange[1];
       this.speed=Math.floor(Math.random()*(max-min+1)+min);
       
       this.d=startPoint2[Math.floor(Math.random()*startPoint2.length)];
       this.c=this.a<0?2500:-300;
   } 
    ,config:{
       init:function(x,y,z){
           var C=this.constructor,
               index=0;
           this.indexLen=C.indexLen;
           this.x=x;
           this.y=y;
           this.dx=this.x;
           this.dy=this.y;
           this.angle=0;
           this.layer=z||Math.ceil(Math.random()*3+1);
           this.canvas=window['layer'+this.layer];
           this.ctx=this.canvas.getContext('2d');
           this.alive=true;     
           this.index=0;
           this.task={
               run:function(count){
                    this.index=count%this.indexLen;
                    this.deadcount=count%C.deadIndex.length; 
                    //this.move();
               }
               ,scope:this
               ,interval:this.swimInterval||C.swimInterval|100
           }
           fishTask.runTask(this.task);
           this.rectangle=new Syu.game.Rectangle(this);
           this.deadIndex=0;
           this.count=0;
       }        
       ,move:function(){
           if(this.alive){
            var s=0,
                angleFlag=1,
                piFlag=0,
                a=this.a,
                b=this.b,
                c=this.c,
                d=this.d;
               //console.log(a+' '+b+' '+c+' '+d);
            if(a>0){    
                s=-this.speed;
                angleFlag=-1;
                piFlag=Math.PI;               
            }else{
                s=this.speed;
            }
            this.x+=s;
            this.y=((b-d)*this.x-c*b+a*d)/(a-c);
            this.angle=angleFlag*Math.asin((d-b)/Math.sqrt((c-a)*(c-a)+(d-b)*(d-b)))+piFlag;
            this.outCheck();  
           }
            
        }
        ,outCheck:function(){
           if(this.x<-500 || this.x>1511 || this.y>900 || this.y<-200){
               this.gameClient.remove(this);
           }            
        }
       ,getImageStatus:function(){           
           var C=this.constructor,
               image=C.image,
               x=this.dx,
               y=this.dy,
               width=C.width,
               height=C.height,
               swimingIndex=C.swimingIndex,
               deadIndex=C.deadIndex;
           if(this.alive){
               return [image].concat(swimingIndex[this.index]).concat([x,y,width,height]);
           }else{
               var a=[image].concat(deadIndex[this.deadcount]).concat([x,y,width,height]);
               this.count++
               if(this.count>30){
                   this.gameClient.remove(this,true);
                   fishTask.stopTask(this.task);           
                }  
               return a; 
            }              
       }
       ,rotatePoint:function(){               
            return {
                   x:this.x+this.constructor.width,
                   y:this.y+this.constructor.height/2
               };            
        }          
        
    }
    ,extend:Syu.game.GameObject
});

Syu.define('Shark',{

    static:{
        indexLen:8,  
        deadLen:4,
        swimingIndex:initIndex([0,0,561,273],8),
        deadIndex:[[0,273*8,561,273],[0,273*9,561,273],[0,273*10,561,273],[0,273*11,561,273]],
        width:561/2,
        height:273/2,
        image:shark2Image,
        coinLevel:2,
        speedRange:[5,8],
        multiple:10,
        probability:0.01
    }
    ,extend:Fish
});

Syu.define('Turtles',{
    static:{
        indexLen:6,    
        swimingIndex:initIndex([0,0,178,187],6),
        deadIndex:[[0,187*6,178,187],[0,187*7,178,187],[0,187*8,178,187],[0,187*9,178,187]],
        width:178,
        height:187,
        image:fish10Image,
        coinLevel:2,
        speedRange:[3,5],
        multiple:5,
        probability:0.05
    }
    ,extend:Fish
});

Syu.define('Fish1',{
    static:{
        indexLen:4,    
        swimingIndex:initIndex([0,0,55,37],4),
        deadIndex:[[0,37*4,55,37],[0,37*5,55,37],[0,37*6,55,37],[0,37*7,55,37]],
        width:55,
        height:37,
        image:fish1Image,
        coinLevel:1,
        speedRange:[3,5],
        multiple:1,
        probability:0.7
    }
    ,extend:Fish
});
Syu.define('Fish2',{
    static:{
        indexLen:4,    
        swimingIndex:initIndex([0,0,78,64],4),
        deadIndex:[[0,64*4,78,64],[0,64*5,78,64],[0,64*6,78,64],[0,64*7,78,64]],
        width:78,
        height:64,
        image:fish2Image,
        coinLevel:1,
        speedRange:[3,5],
        multiple:2,
        probability:0.6
    }
    ,extend:Fish
});
Syu.define('Fish3',{
    static:{
        indexLen:4,    
        swimingIndex:initIndex([0,0,72,56],4),
        deadIndex:[[0,56*4,72,56],[0,56*5,72,56],[0,56*6,72,56],[0,56*7,72,56]],
        width:72,
        height:65,
        image:fish3Image,
        coinLevel:1,
        speedRange:[3,5],
        multiple:3,
        probability:0.5
    }
    ,extend:Fish
});
Syu.define('Fish4',{
    static:{
        indexLen:4,    
        swimingIndex:initIndex([0,0,77,59],4),
        deadIndex:[[0,59*4,77,59],[0,59*5,77,59],[0,59*6,77,59],[0,59*7,77,59]],
        width:77,
        height:59,
        image:fish4Image,
        coinLevel:1,
        speedRange:[3,5],
        multiple:4,
        probability:0.4
    }
    ,extend:Fish
});
Syu.define('Fish5',{
    static:{
        indexLen:4,    
        swimingIndex:initIndex([0,0,107,122],4),
        deadIndex:[[0,122*4,107,122],[0,122*5,107,122],[0,122*6,107,122],[0,122*7,107,122]],
        width:107,
        height:122,
        image:fish5Image,
        coinLevel:1,
        speedRange:[3,5],
        multiple:5,
        probability:0.35
    }
    ,extend:Fish
});
Syu.define('Fish6',{
    static:{
        indexLen:8,    
        swimingIndex:initIndex([0,0,105,79],8),
        deadIndex:[[0,79*8,105,79],[0,79*9,105,79],[0,79*10,105,79],[0,79*11,105,79]],
        width:105,
        height:79,
        image:fish6Image,
        coinLevel:2,
        speedRange:[3,4],
        multiple:1,
        probability:0.3
    }
    ,extend:Fish
});
Syu.define('Fish7',{
    static:{
        indexLen:6,    
        swimingIndex:initIndex([0,0,92,151],6),
        deadIndex:[[0,151*6,92,151],[0,151*7,92,151],[0,151*8,92,151],[0,151*9,92,151]],
        width:92,
        height:151,
        image:fish7Image,
        coinLevel:2,
        speedRange:[3,7],
        multiple:2,
        probability:0.2
    }
    ,extend:Fish
});
Syu.define('Fish8',{
    static:{
        indexLen:8,    
        swimingIndex:initIndex([0,0,174,126],8),
        deadIndex:[[0,126*8,174,126],[0,126*9,174,126],[0,126*10,174,126],[0,126*11,174,126]],
        width:174,
        height:126,
        image:fish8Image,
        coinLevel:2,
        speedRange:[3,6],
        multiple:3,
        probability:0.15
    }
    ,extend:Fish
});
Syu.define('Fish9',{
    static:{
        indexLen:8,    
        swimingIndex:initIndex([0,0,166,183],8),
        deadIndex:[[0,183*8,166,183],[0,183*9,166,183],[0,183*10,166,183],[0,183*11,166,183]],
        width:166,
        height:183,
        image:fish9Image,
        coinLevel:2,
        speedRange:[3,7],
        multiple:4,
        probability:0.1       
    }
    ,extend:Fish
});
