var vm = new Vue({
    el:"#musicplayer",
    data:{
        keywords:"五月天",
        musiclist:[],
        musicurl:"",
        move:['gan'],
        xuan:[],
        imgsrc:"images/山.jpg",
        hotComment:[]
    },
    mounted () {     
        document.getElementsByTagName('input')[0].focus()
     },
    methods:{
        getlist:function(){
            var that=this;
           axios.get("https://autumnfish.cn/search?keywords="+this.keywords).then(function(response){               
                that.musiclist=response.data.result.songs;
           },function(err){
               console.log(err+"搜索出错了");
           })
        },
        playmusic:function(musicid){
            var that2=this;
            axios.get("https://autumnfish.cn/song/url?id="+musicid).then(function(response){   
                that2.musicurl=response.data.data[0].url; 
            },function(err){
                console.log(err+"url请求出错")
            })
            axios.get("https://autumnfish.cn/song/detail?ids="+musicid).then(function(response){
                that2.imgsrc=response.data.songs[0].al.picUrl;
            },function (err) {
                console.log(err+"图片请求失败")
            })
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicid).then(function(response){
                that2.hotComment=response.data.hotComments;
                console.log(response);
            },function(err){
                console.log(err+"评论请求失败")
            }) 
        },
        onPause:function(){
            this.move.push("ni");
            this.xuan.splice(0,this.xuan.length);
        },
        onPlay:function(){        
            this.move.splice(1,1);
            this.xuan.push("xuan");
        }
    }       
})

