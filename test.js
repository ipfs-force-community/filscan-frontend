 function isEmail(email) {
  // 判断字符串中是否包含@符号和至少一个.符号
  if (email.includes('@') && email.includes('.')) {
    // 判断@符号是否在.符号之前，并且.符号不在末尾
    if (email.indexOf('@') < email.indexOf('.') && email.indexOf('.') < email.length - 1) {
      return true;
    }
  }
  return false;
}

console.log('email',isEmail('zixian@kunyaokeji.com'))