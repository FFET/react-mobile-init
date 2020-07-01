/**
 * @author Jay
 * @date 2020-06-23
 * @description node ssh deploy
 */

const fs = require("fs");
const path = require("path");
const NodeSSH = require("node-ssh");
const ssh = new NodeSSH();

ssh
  .connect({
    host: "i.shanghaim.net",
    username: "root",
    privateKey: "/Users/jay/.ssh/s_rsa"
  })
  .then(function() {
    console.log("连接成功----------------");

    // 上传文件
    ssh.putFile("mobile.zip", "/home/html/mobile.zip").then(
      function() {
        console.log("上传成功");

        ssh
          .execCommand("sh deploy.sh", {
            cwd: "/home/html/",
            stream: "stdout",
            options: { pty: true }
          })
          .then(function(result) {
            console.log(result);
            console.log("断开连接----------------");
            process.exit(0);
          })
          .catch((error) => {
            console.log(error);
            process.exit(0);
          });
      },
      function(error) {
        console.log("上传失败", error);
        process.exit(0);
      }
    );
  });
