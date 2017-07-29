var layer0,
    layer1,
    layer2,
    layer3,
    layer4,
    ctx0,
    ctx1,
    ctx2,
    ctx3,
    ctx4,
    //taskRunner=new Syu.util.TaskRunner(10),
    backGroundImage,
    fish1Image,
    fish2Image,
    fish3Image,
    fish4Image,
    fish5Image,
    fish6Image,
    fish7Image,
    fish8Image,
    fish9Image,
    fish10Image,
    shark1Image,
    shark2Image,
    levelBaeImage,
    bottomBarImage,
    cannon1Image,
    cannon3Image,
    cannon4Image,
    cannon5Image,
    cannon6Image,
    cannon7Image,
    bullet1Image,
    bullet2Image,
    bullet3Image,
    bullet4Image,
    bullet5Image,
    bullet6Image,
    bullet7Image,
    web1Image,
    web2Image,
    web3Image,
    web4Image,
    web5Image,
    web6Image,
    web7Image,
    coin1Image,
    coin2Image,
    NumnerImage,
    coinTextImage,
    cont,
    energyImage;

(function(){
    backGroundImage=new Image();
    backGroundImage.src='images/game_bg_2_hd.jpg';
    fish1Image=new Image();
    fish1Image.src='images/fish1.png'; 
    fish2Image=new Image();
    fish2Image.src='images/fish2.png'; 
    fish2Image=new Image();
    fish2Image.src='images/fish2.png';
    fish3Image=new Image();
    fish3Image.src='images/fish3.png'; 
    fish4Image=new Image();
    fish4Image.src='images/fish4.png'; 
    fish5Image=new Image();
    fish5Image.src='images/fish5.png'; 
    fish6Image=new Image();
    fish6Image.src='images/fish6.png'; 
    fish7Image=new Image();
    fish7Image.src='images/fish7.png'; 
    fish8Image=new Image();
    fish8Image.src='images/fish8.png'; 
    fish9Image=new Image();
    fish9Image.src='images/fish9.png'; 
    fish10Image=new Image();
    fish10Image.src='images/fish10.png'; 
    shark1Image=new Image();
    shark1Image.src='images/shark1.png';
    shark2Image=new Image();
    shark2Image.src='images/shark2.png';
    levelBaeImage=new Image();
    levelBaeImage.src='images/level_bar.png';
    bottomBarImage=new Image();
    bottomBarImage.src='images/bottom-bar.png';
    cannon1Image=new Image();
    cannon1Image.src='images/cannon1.png';
    cannon2Image=new Image();
    cannon2Image.src='images/cannon2.png';
    cannon3Image=new Image();
    cannon3Image.src='images/cannon3.png';
    cannon4Image=new Image();
    cannon4Image.src='images/cannon4.png';
    cannon5Image=new Image();
    cannon5Image.src='images/cannon5.png';
    cannon6Image=new Image();
    cannon6Image.src='images/cannon6.png';
    cannon7Image=new Image();
    cannon7Image.src='images/cannon7.png';    
    bullet1Image=new Image();
    bullet1Image.src='images/bullet1.png';
    bullet2Image=new Image();
    bullet2Image.src='images/bullet2.png';
    bullet3Image=new Image();
    bullet3Image.src='images/bullet3.png';
    bullet4Image=new Image();
    bullet4Image.src='images/bullet4.png';
    bullet5Image=new Image();
    bullet5Image.src='images/bullet5.png';
    bullet6Image=new Image();
    bullet6Image.src='images/bullet6.png';
    bullet7Image=new Image();
    bullet7Image.src='images/bullet7.png';    
    web1Image=new Image();
    web1Image.src='images/web1.png';  
    web2Image=new Image();
    web2Image.src='images/web2.png'; 
    web3Image=new Image();
    web3Image.src='images/web3.png'; 
    web4Image=new Image();
    web4Image.src='images/web4.png'; 
    web5Image=new Image();
    web5Image.src='images/web5.png'; 
    web6Image=new Image();
    web6Image.src='images/web6.png'; 
    web7Image=new Image();
    web7Image.src='images/web7.png';  
    coin1Image=new Image();
    coin1Image.src='images/coinAni1.png';
    coin2Image=new Image();
    coin2Image.src='images/coinAni2.png';    
    NumnerImage=new Image();
    NumnerImage.src='images/number.png';
    coinTextImage=new Image();
    coinTextImage.src='images/coinText.png';
    energyImage=new Image();
    energyImage.src='images/energy-bar.png';
})();

var initCanvas=function(){
    layer0=document.getElementById('layer0');
    layer1=document.getElementById('layer1');
    layer2=document.getElementById('layer2');
    layer3=document.getElementById('layer3');
    layer4=document.getElementById('layer4');
    cont=document.getElementById('container');
    layer0.width=layer1.width=layer2.width=layer3.width=layer4.width=cont.offsetWidth;
    layer0.height=layer1.height=layer2.height=layer3.height=layer4.height=cont.offsetHeight;
    ctx0=layer0.getContext('2d');
    ctx1=layer1.getContext('2d');
    ctx2=layer2.getContext('2d');
    ctx3=layer3.getContext('2d');
    ctx4=layer4.getContext('2d');
}

