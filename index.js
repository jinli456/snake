$(function(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
		/*var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		var color="rgba("+r+","+g+","+b+",0.8)";*/
			$('<div>')
			.attr('id',i+'_'+j)
			.addClass('block')
			.css('backgroundColor','#222')
			.appendTo('.screen')
		};
	};
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
	var tru={};
	function findDiv(x,y){
		return $('#'+x+'_'+y);
	}
	$.each(she,function(i,v){
		findDiv(v.x,v.y).addClass('she')
	;
	})
	direction='you';
	$(document).on('keyup',function(e){
		var biao={37:'zuo',38:'shang',39:'you',40:'xia'}
		var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40}
		if(Math.abs(e.keyCode-fanbiao[direction])===2){
			return;
		}
		if(biao[e.keyCode]){
			direction=biao[e.keyCode]
		}
	})

	function fangshiwu(){
		do{
			var x=Math.floor(Math.random()*19)
			var y=Math.floor(Math.random()*19)
		}while(tru[x+'_'+y])		
		findDiv(x,y).addClass('shiwu')
		return{x:x,y:y};
	}
	var shiwu=fangshiwu();

	function move(){
		var jiutou=she[she.length-1];
		if(direction=='you'){
			var xintou={x:jiutou.x,y:jiutou.y+1}
		}if(direction=='zuo'){
			var xintou={x:jiutou.x,y:jiutou.y-1}
		}if(direction=='shang'){
			var xintou={x:jiutou.x-1,y:jiutou.y}
		}if(direction=='xia'){
			var xintou={x:jiutou.x+1,y:jiutou.y}
		}
		if(tru[xintou.x+'_'+xintou.y]){
			clearInterval(t)
			alert('游戏结束')
			return;	
		}
		if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			clearInterval(t)
			alert('游戏结束')
			return;
		}
			she.push(xintou)
			tru[xintou.x+'_'+xintou.y]=true;
			findDiv(xintou.x,xintou.y).addClass('she')
		if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
			findDiv(shiwu.x,shiwu.y).removeClass('shiwu');
			shiwu=fangshiwu();
		}else{
			var weiba=she.shift();
			findDiv(weiba.x,weiba.y).removeClass('she')
			delete tru[weiba.x+'_'+weiba.y]
		}	
		
	}

	function zanting(){
        clearInterval(t) 
        }
	$(".btn").on("click",function(){
		 t=setInterval(move,400);
	})
	
	$(".zanting").on("click",function(){
		 zanting();
	})
	$(".reset").on("click",function(){
		 location.reload();
	})
})