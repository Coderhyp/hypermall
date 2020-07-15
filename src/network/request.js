import axios from 'axios'

export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  //2.axios的拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },err =>{
    // console.log(err);
  });
  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },error => {
    console.log(error);
  })

  //3.发送真正的网络请求
  return instance(config)

}

