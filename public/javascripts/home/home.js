var liArray = $(".images-list ul li");
var index = 0;
var time = 1000;
var intime = 5000;
//左  点击滑动
$(".loca-left").on('click',function(){
	if(index!=0){
		index -= 1;
	}else{
		index = liArray.length-1;
	}
	fade(time,index)
});
//右  点击滑动
$(".loca-right").on('click',function(){
	if(index<liArray.length-1){
		index += 1;
	}else{
		index = 0;
	}
	fade(time,index);
});

function fade(time,index){
	liArray.slideLeftHide(time);
	liArray.eq(index).slideLeftShow(time);
}

// liArray.show();
setInterval(function(){
	if(index<liArray.length-1){
		index += 1;
	}else{
		index = 0;
	}
	fade(time,index);
},intime);
$.fn.slideLeftHide = function( speed, callback ) {  
        this.animate({  
            width : "hide",  
            paddingLeft : "hide",  
            paddingRight : "hide",  
            marginLeft : "hide",  
            marginRight : "hide"  
        }, speed, callback );  
    };  
    jQuery.fn.slideLeftShow = function( speed, callback ) {  
        this.animate({  
            width : "show",  
            paddingLeft : "show",  
            paddingRight : "show",  
            marginLeft : "show",  
            marginRight : "show"  
        }, speed, callback );  
    };  