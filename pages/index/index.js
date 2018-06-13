//index.js

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
};
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
};

Page({
  data: {
    nowTemp: ``,
    nowWeather: ``,
    nowWeatherBackground: ``
  },
  //页面加载时获取
  onLoad() {
    this.getNow()
  },
  //向下拉刷新
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh();
      console.log('执行了');
    })
  },

  //获取现在的天气
  getNow(callback){
    //发出请求
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        console.log(res)
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        console.log(temp, weather);

        this.setData(
          {
            nowTemp: temp + "°",
            nowWeather: weatherMap[weather],
            nowWeatherBackground: '/images/' + weather + '-bg.png'
          }
        )
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      //接口调用结束的回调函数（成功、失败都会执行）
      complete: () => {
        //在callback不为空的情况下执行callback
        callback && callback();
      }
    })
  },
})
