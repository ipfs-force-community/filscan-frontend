--registry https://registry.npmmirror.com/


// pm2 node server.js --watch --name filscan_main -- --port 9090
// pm2 start npm --watch --name filscan_main -- run main

pm2 start npm --watch --name filscan_main -- run proMain

 pm2 start npm --watch --name filscan_maintain -- run dev

//pre
pm2 start npm --watch --name filsan_main -- run start:pre

//ha 
pm2 start npm --watch --name filscan_ha -- run start:ha


//test 
pm2 start npm --watch --name filscan_main -- run start

//pro 
pm2 start npm --watch --name filscan_pro -- run start:pro


//main
//pm2 start npm --watch --name filscab_cail -- run calibration
查看端口号占有情况
lsof -i:端口号

查询端口号的进程
ps -ef |grep 端口号

杀死某进程
kill -9  进程号

eslint --fix src pages packages store utils



xxxxxxxxxxxx88888dxxxxxx



//消息详情 dex 
//地址详情 



//------


eth Address 多签账户 显示 f0121 