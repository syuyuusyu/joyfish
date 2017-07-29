Syu.arrayRemoveAndDelete(true);
var paintTask=new Syu.util.TaskRunner(10);

var drawBackGround=function(){
    for(var i=1;i<5;i++){
        window['ctx'+i].clearRect(0,0,layer0.width,layer0.height)
    }    
    
    ctx0.drawImage(backGroundImage,0,0);
    ctx0.drawImage(bottomBarImage,86,layer0.height-70);

   
};

var client=new GameClient();

var startPoint=[50,100,150,200,250,300,350,400,450,500,550,600];
var fishSequence=[1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,10,10,11];
//var fishSequence=[11];
var initFish=function(){
    var x=(Math.round(Math.random())==1)?-300:1400,
        y=startPoint[Math.floor(Math.random()*startPoint.length)];
    switch(fishSequence[Math.floor(Math.random()*fishSequence.length)]){
        case 11:
            new Shark(client,x,y);
            break;
        case 10:
            new Turtles(client,x,y);
            break;  
        case 1:
            new Fish1(client,x,y);
            break;  
        case 2:
            new Fish2(client,x,y);
            break;  
        case 3:
            new Fish3(client,x,y);
            break;  
        case 4:
            new Fish4(client,x,y);
            break;  
        case 5:
            new Fish5(client,x,y);
            break;  
        case 6:
            new Fish6(client,x,y);
            break;  
        case 7:
            new Fish7(client,x,y);
            break;  
        case 8:
            new Fish8(client,x,y);
            break;  
        case 9:
            new Fish9(client,x,y);
            break;              
    }
}

var test=function(){
    this.something='something';
}

var test1=Syu.extend(test,{
    constructor:function(){test1.superclass.constructor.call(this,{})}
});

window.onload=function(){
    var test3=new test1();
    console.log(test3.something);
    initCanvas();   
    //alert(window.innerHeight+' '+window.innerWidth);
    var cannon=new Cannon(client),
        mouseX=0,
        mouseY=0,
        bbox = layer0.getBoundingClientRect(),
        left =bbox.left,
        top =bbox.top>0?bbox.top:0;
    document.getElementById('container').addEventListener('mousemove',function(e){
        mouseX=e.pageX;
        mouseY=e.pageY;
    });
    if('ontouchstart' in window){
        document.addEventListener('touchstart', function(e){
            //e.preventDefault();
            var touch = e.touches[0];
            mouseX=touch.pageX;
            mouseY=touch.pageY;
            cannon.angle=-Math.asin((512+left-mouseX)/Math.sqrt((512+left-mouseX)
                    *(512+left-mouseX)+(layer1.height-10+top-mouseY)*(layer1.height-10+top-mouseY)));     
            cannon.fire();
        },false);
        
    }else{
        document.getElementById('container').addEventListener('mousedown',function(e){
            e.preventDefault();
            mouseX=e.pageX;
            mouseY=e.pageY;
            cannon.angle=-Math.asin((512+left-mouseX)/Math.sqrt((512+left-mouseX)
                    *(512+left-mouseX)+(layer1.height-10+top-mouseY)*(layer1.height-10+top-mouseY)));     
            cannon.fire();
        });
    }

    
    client.on('removeBullet',function(b){
       new Web(client,b.x,b.y,b.layer,b.level);
    });
    client.on('removeFish',function(f){
        new Coin(client,f.cx,f.cy,f.layer,f.constructor.coinLevel,f.constructor.multiple);
    });

//    cannon.draw();
    //ctx1.drawImage(cannon7Image,0,0,74,94,512-36,layer1.height-10-84,74,94);
    
    paintTask.runTask(function(count){        
        drawBackGround();
        cannon.angle=-Math.asin((512+left-mouseX)/Math.sqrt((512+left-mouseX)
                *(512+left-mouseX)+(layer1.height-10+top-mouseY)*(layer1.height-10+top-mouseY)));         
        client.iterate();

    },{interval:20});
//    
    paintTask.runTask(initFish,{interval:500}) ;   
    
    
    
    window.onkeydown=function(evt){
	switch(evt.keyCode){
		case 37:
			if(cannon.level>1)
               cannon.level--
            else
               cannon.level=7 
			break;
		case 39:
			if(cannon.level<7)
               cannon.level++
            else
               cannon.level=1 				
			break;
	   }	
    }
}
    

