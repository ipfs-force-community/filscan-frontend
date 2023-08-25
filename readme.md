--registry https://registry.npmmirror.com/


// pm2 node server.js --watch --name filscan_main -- --port 9090
// pm2 start npm --watch --name filscan_main -- run main

 pm2 start npm --watch --name filscan_maintain -- run dev

//pre
pm2 start npm --watch --name filscan_main -- run start:pre

//ha 
pm2 start npm --watch --name filscan_ha -- run start:ha


//test 
pm2 start npm --watch --name filscan_main -- run start


//main
//pm2 start npm --watch --name filscab_cail -- run calibration
查看端口号占有情况
lsof -i:端口号

查询端口号的进程
ps -ef |grep 端口号

杀死某进程
kill -9  进程号