<template>
<div>Bot昵称：{{ bot_name }}</div>   <!--下面定义完了就可以在这里调用了-->
<div>Bot战力：{{ bot_rating }}</div> <!--调用的话是用两个大括号括起来-->
<router-view/>
</template>

<script>
import $ from 'jquery'; //这里我们使用Ajax来引入数据

//然后需要定义变量
import {ref} from 'vue';


export default { //这个写法是固定的
  name: "APP",
  setup: () => { //这里是函数的入口
    let bot_name = ref("");
    let bot_rating = ref("");

    $.ajax({  //使用ajax来取数据
        url: "http://127.0.0.1:3000/pk/getbotinfo/",
        type: "get",
        success: resp => {
          bot_name.value = resp.name;
          bot_rating.value = resp.rating
        }
    });

    return {
      bot_name,
      bot_rating 
    }
  }
}
</script>

<style>
body{
  background-image: url("@/assets/background.png");
  background-size: cover;
}
</style>
