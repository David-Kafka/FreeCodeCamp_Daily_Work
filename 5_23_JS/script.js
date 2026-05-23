//1
function isPalindrome(str){
  const newStr = str.toLowerCase();
  if(newStr ===reverseStr(newStr)){
    return true;
  }
  return false;
}

function reverseStr(str){
  if (str === "") return "";
  return reverseStr(str.slice(1))+str[0];
}

//2
function findPalindromeBreaks(words){
  if (!words.length) return [];
  return [...words.keys()].filter(i => ! (isPalindrome(words[i])));
} 
const arr = ["aba","bcd","bcb","cad"];
console.log(findPalindromeBreaks(arr).length);


//3
function findRepeatedPhrases(words,phraseLength){
  if(words.length < phraseLength)return [];
  const newArr = sliceArrays(words,phraseLength);
  const newObj = findRepeated(newArr);
  //返回重复元素的位置(注:使用了keys()后,就不是item而是i了)
  return [...newArr.keys()].filter(i=>newObj[newArr[i]]>1);
}

//切片
function sliceArrays(words,phraseLength){
  const arr = [];
  for(let i = 0; i < words.length-phraseLength+1; i++){
    const wordsPhrase = words.slice(i,i+phraseLength).join("");
    arr.push(wordsPhrase);
  }
  return arr;
}

//查重
function findRepeated(words){
  const count = {};
  words.forEach(word=>{
    if(Object.hasOwn(count,word)){
      count[word]++;
    }else{
      count[word]=1;
    }
  });
  return count; 
}

//4
function analyzeTexts(texts,phraseLength){
  if(!texts.length) return[];
  const retArr = [];
  texts.forEach(text=>{
    const arr = findRepeatedPhrases(text,phraseLength);
    const num = findPalindromeBreaks(text); 
    retArr.push({
      "repeatedPhrases":arr,
      "palindromeBreaks":num
    });
  });
  return retArr;
}
const texts = [
  ["hello", "world", "hello", "world", "test"],
  ["a", "b", "a", "b", "c"],
  ["level", "racecar", "test", "level"]
];
const phraseLength = 2;
console.log(analyzeTexts(texts,phraseLength));


/** 输出样子（数组里放对象）
[
  { repeatedPhrases: [], palindromeBreaks: 2 },
  { repeatedPhrases: [0,2], palindromeBreaks: 1 }
]  */



