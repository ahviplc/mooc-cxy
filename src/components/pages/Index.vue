<template>
    <div class="index" style="background: #f6f6f6;">
      <div class="banner">
        <img src="../../assets/zhufengmian2.jpg">
      </div>

      <div class="study">
        <router-link to="/video"><button>加入学习</button></router-link>
      </div>

      <div class="containerMain">
        <div class="container_1">
          <h2>{{title1}}</h2>
        </div>

        <div class="container_2">
          <p> {{introduction1}}</p>
        </div>

        <div class="container_3">
          <ul class="style">
            <li v-for="item in items">
              <a><img :src="item.pic">
                <p>{{item.dic}}</p></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="split">
      </div>

      <div class="containerMain">
        <div class="container_1">
          <h2>{{title2}}</h2>
        </div>

        <div class="container_2">
          <p> {{introduction2}}</p>
        </div>

        <div class="container_3">
          <ul class="style">
            <li v-for="item in items2">
              <a><img :src="item.pic">
                <p>{{item.dic}}</p></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="split">
      </div>

      <div class="containerMain">
        <div class="container_1">
          <h2>{{title3}}</h2>
        </div>

        <div class="container_2">
          <p> {{introduction3}}</p>
        </div>

        <div class="container_3">
          <ul class="style">
            <li v-for="item in items3">
              <a><img :src="item.pic">
                <p>{{item.dic}}</p></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer">
        <div class="footerContent">
          <div class="footerItem" v-for="footerItem in footerItems">
            {{footerItem}}
          </div>
          <div class="footerRight">
            {{footerRight}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
      data(){
        return {
          title1:"第一关 产学研基本概念入门",
          introduction1:"产学研相结合，是科研、教育、生产不同社会分工在功能与资源优势上的协同与集成化，是技术创新上、中、下游的对接与耦合。",
          title2:"第二关 基础农业知识入门",
          introduction2:"农业（Agriculture）是利用动植物的生长发育规律，通过人工培育来获得产品的产业。农业属于第一产业，研究农业的科学是农学。农业的劳动对象是有生命的动植物，获得的产品是动植物本身。农业是提供支撑国民经济建设与发展的基础产业",
          title3:"第三关 产学研教育应用进阶",
          introduction3:"产学研合作教育就是充分利用学校与企业、科研单位等多种不同教学环境和教学资源以及在人才培养方面的各自优势，把以课堂传授知识为主的学校教育与直接获取实际经验、实践能力为主的生产、科研实践有机结合的教育形式。",
          items:[
            {
              pic:require('../../assets/2.jpg'),
              dic:'科研'
            },
            {
              pic:require('../../assets/3.jpg'),
              dic:'教育'
            },
            {
              pic:require('../../assets/4.jpg'),
              dic:'生产'
            }
          ],
          items2:[
            {
              pic:require('../../assets/5.jpg'),
              dic:'种植业'
            },
            {
              pic:require('../../assets/6.png'),
              dic:'畜牧业'
            },
            {
              pic:require('../../assets/7.jpg'),
              dic:'水产业'
            }
          ],
          items3:[
            {
              pic:require('../../assets/8.jpg'),
              dic:'校企联合'
            },
            {
              pic:require('../../assets/9.jpg'),
              dic:'产学结合'
            },
            {
              pic:require('../../assets/10.jpg'),
              dic:'互利互惠'
            }
          ],
          //footer内容
          footerItems:["网站首页","企业合作","人才招聘","联系我们","专家招募","常见问题","意见反馈","友情链接"],
          //footer版权声明
          footerRight:"Copyright © 2018 cxy.com All Rights Reserved | 苏ICP备 12003892号-11"
        }
      },
    }
</script>

<style scoped>
  .split{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #B9B6C0;
    margin-top: 30px;

  }
  .banner{
    background: #f6f6f6;
    position:relative;
    clear: both;

  }
  .banner img{
    width:100%;
    height:500px;
    margin-left: auto;
    position:relative;
    z-index: 0;
    margin-right: auto;
    display: block;
  }
  .study {
    height: 40px;
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
  }
  button{
    margin-left: 600px;
    width: 160px;
    height: 40px;
    background: #a2b740;
    color: white;
    cursor: pointer;
    border-radius: 10px;
  }
  .containerMain{
    margin-top: 50px;
    width: 1000px;
    height: 380px;
    margin-left: auto;
    margin-right: auto;
background: #f6f6f6;
  }
  .container_1{
    color: #7B7788;
    text-align: center;
  }
  .container_2{
    width: 685px;
    margin: 0 auto 20px;
    overflow: hidden;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    color: #625F6D;
  }
  .container_3{
    margin-top: 30px;
    width: 1000px;
    height: 260px;
    text-align: center;
    font-family: Serif;
  }
  .container_3 ul.style li {
    border-radius: 10px;
    display: inline-block;
    margin: 5px 8px 15px;
    background: #f6f6f6;
    width: 280px;
    height: 220px;
    border: 1px solid #9E9BA8;
    clear: both;
    overflow: hidden;
    font-size: 0;
  }
  .container_3 ul li p{
    color: black;
    line-height: 30px;
    font-size:20px;
    margin-top: 20px;
  }
  .container_3 ul li img{
    margin: 0;
    padding: 0;
    overflow: hidden;
    transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;

  }
  .style a:hover img{
    transform:scale(1.2,1.2);
    -ms-transform:scale(1.2,1.2);
    -webkit-transform:scale(1.2,1.2);
  }
  .footer {
    width: 100%;
    height: 100px;
    background-color: black;
  }
  .footer .footerContent{
    margin-left: 115px;
  }
  .footer .footerItem {
    float: left;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
    color: gainsboro;
    font-size: 10px;
  }
  .footer .footerRight {
    clear: both;
    font-size: 10px;
    color: darkgray;
  }
</style>
