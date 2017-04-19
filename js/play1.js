$(function(){
    //随机更换背景
    changeBG();
    function changeBG(){
        var num=parseInt(Math.random()*20+1);
        $("body").removeClass().addClass("bg"+num).css('background-size','cover');
    }

    $('.well-box').append('<div class="well"></div><div class="well"></div><div class="well"></div><div class="well"></div>');
    $('.well').each(function(index,ele){
        $(this).css({
            'width':parseFloat(Math.random()*50+100)+'px',
            'left':Number(Math.random()*100*index+350*index)+'px'
        });
    });

    var sticklength= 0,manleft= 0,timeoutRun=null,timeoutStop=null,i= 0,num=1;

    $('body').on('click','.btnClick',function(){
        //$('.btnClick').stop(false,true).click(function(){
        if(i<$('.well').length-1){
            sticklength=$('.well')[i+1].offsetLeft-$('.stick')[i].offsetLeft+$('.well').width();
            //manleft=sticklength+$('.man')[0].offsetLeft;
            manleft=$('.well')[i+1].offsetLeft+$('.well').eq(i+1).width()-$('.man').width()-$('.man')[0].offsetLeft;
            $('.stick').eq(i).animate({
                width:sticklength
            },500,function(){
                $(this).addClass('stickDown');
                timeoutRun=setTimeout(running,1000);
            });
            if(manleft>($('.well')[i+1].offsetLeft+$('.well').eq(i+1).width())){
                $('.man img').animate('rotate');
            }else{

            }
            i++;
            $('.container').append('<div class="stick"></div>');
            $('.stick').eq(i).css('left',manleft+$('.man').width());
            if(i==($('.well').length-1)){
                setTimeout(function(){
                    if($('.dialog').length){
                        $('.dialog').show();
                    }else{
                        $('body').append('<div class="dialog"><p class="dialog-btn"><a class="play-agin" href="javascript:;">重玩一次</a><a class="play-go" href="javascript:;">继续闯关</a></p></div>');
                    }
                },2000)
            }
        }
    });

    $('body').on('click','.play-agin',function(){
        window.location.reload();
    });

    $('body').on('click','.play-go',function(){
        changeBG();
        $('.dialog').hide();
        $('.play-title').html('关卡'+(++num));
        $('.stick').not($('.stick').eq(0)).remove();
        $('.stick').eq(0).width(0).removeClass('stickDown');
        $('.man img').css('left',0);
    });


    function running(){
        $('.man img').attr('src','img/stick.gif').animate({'left':manleft},700,function(){
            $('.man img').attr('src','img/stick_stand.png');
        });
    }




});
