$(function (){
    changeBG();
    function changeBG(){
        var num=parseInt(Math.random()*20+1);
        $("body").removeClass().addClass("bg"+num).css('background-size','cover');
    }

   /* var type=true;//控制棍子
    var index=0;//控制墙
*/

    $(".btnClick").mousedown(function(){
        var maxTop=$(".container").offset().top;
        if(type){
            $(".stick").animate({"width":maxTop+"px"},1000);
        }

    }).mouseup(function(){
        $(".stick").stop();
        if(type){
            $(".stick").addClass("stickDown");
            setTimeout(running,350);
        }
        type=false;
    });

    function running(){
        var mW=$(".man").width();
        var sW=$(".stick").width();
        var sL=parseFloat($(".stick").css("left"));
        $(".man img").attr("src","img/stick.gif");
        $(".man").animate({"left":(sW+sL-mW/2)+"px"},1000);
        setTimeout(standMan,1010);
    }

    function standMan(){
        $(".man img").attr("src","img/stick_stand.png");
        //判断是否成功
        //当前墙的左边距离，当前墙的宽度，下一个墙的左边距离
        var sW=$(".stick").width();
        var wW=$(".well:eq("+index+")").width();
        var wL=parseFloat($(".well:eq("+index+")").css("left"));
        var nwL=parseFloat($(".well:eq("+index+")").next().css("left"));
        var nwW=$(".well:eq("+index+")").next().width();
        //成功
        if(sW>=(nwL-(wW+wL)) && sW<=(nwL-(wW+wL)+nwW)){
            //棍子要初始化
            $(".stick").css("left",(nwL+nwW)+"px").width(0).removeClass("stickDown");
            //小人要站在下一个墙上
            $(".man").css("left",(nwL+nwW-$(".man").width())+"px");
            $(".container").animate({"left":"-"+nwL+"px"},1000,function(){
                index++;
                if(index==$(".well-box .well").length-1){
                    createSuccess();
                }else{
                    type=true;
                }
            });

        }else{
        //失败
            type=false;
            $(".man img").addClass("rotate");
            setTimeout(createFailed(),350);
        }
    }
});

