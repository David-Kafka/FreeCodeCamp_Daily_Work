function permuteString(str, prefix = "",  resultArr=[]){
  const arr = [...str ];
  if(arr.length > 0){
    arr.forEach((ch,i)=>{
      const newPrefix = prefix + ch;
      let copyArr = [...arr]; //直接写=,只是把引用赋值过去了,根本没有删除
      copyArr.splice(i,1);//如果不删除副本来获取剩下的,那么会影响到循环
      permuteString(copyArr,newPrefix,resultArr);
    });
  }else{
    resultArr.push(prefix);
  }
  return [...new Set(resultArr)];
}
console.log(permuteString("fcc"));

