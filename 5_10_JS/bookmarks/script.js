//button_main
const vCBtn = document.getElementById("view-category-button");
const aBBtn  = document.getElementById("add-bookmark-button");
//button_form
const gB1Btn = document.getElementById("close-form-button");
const aBBtnForm = document.getElementById("add-bookmark-button-form");
//button_list
const gB2Btn = document.getElementById("close-list-button");
const dBBtn = document.getElementById("delete-bookmark-button");
//section
const mSct = document.getElementById("main-section");
const fSct = document.getElementById("form-section");
const lSct = document.getElementById("bookmark-list-section");
//<h2>
const h2s = document.querySelectorAll(".category-name");
//<select>
const slt = document.getElementById("category-dropdown");
//<input>
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
//div_list
const cList = document.getElementById("category-list");




let bookmarks = [];
let bm = {};
// localStorage.clear();

/********************/
/***** FUNCTION *****/
/********************/
//fct_1
const getBookmarks = () => {
  try{
    const data = JSON.parse(localStorage.getItem("bookmarks"));
    return Array.isArray(data) && data.every(item=>{
      return item != null
      && "name" in item 
      && "category" in item
      && "url" in item;
    }) ? data : [];
  }catch(e){
    return [];
  }
}

//fct_2
const displayOrCloseForm = () => {
  mSct.classList.toggle("hidden");
  fSct.classList.toggle("hidden");
}

//fct_3
const displayOrHideCategory = () => {
  mSct.classList.toggle("hidden");
  lSct.classList.toggle("hidden");
}

//fct_reset
function reset(){
  nameInput.value = "";
  urlInput.value = "";
  cList.innerHTML = "";
}

//fct_change_title
function cTitle(){
  h2s.forEach(h2=>h2.innerText = slt.value.replace(slt.value[0],slt.value[0].toUpperCase()));
}

//fct_showList
function showList(){
    cList.innerHTML = "";
  //过滤:找出对应种类的标签们
  const arrays = getBookmarks().filter(item=>item.category === slt.value);
  if(!arrays.length){
    cList.innerHTML = `<p>No Bookmarks Found</p>`;
  }else{
    //添加
    arrays.forEach(item=>{
      cList.innerHTML += 
      `<div>
        <input 
          id="${item.name}" 
          value="${item.name}"
          type="radio" 
          name="${item.category}"
        />
        <label for="${item.name}"> 
          <a href="${item.url}">${item.name}</a>
        </label>
      </div>`;
    });
  }
}

/********************/
/***** LISTENER *****/
/********************/
//main
aBBtn.addEventListener("click",()=>{
  cTitle();
  displayOrCloseForm();
});
vCBtn.addEventListener("click",()=>{
  cTitle();
  displayOrHideCategory();
  showList();
});


//form
gB1Btn.addEventListener("click",()=>{
  reset();
  displayOrCloseForm();
});
aBBtnForm.addEventListener("click",()=>{
  bm = {};//清空上一次的残留
  if(!nameInput.value || !urlInput.value){//如果某项输入为空则不继续进行
    alert("Please input value");
    return;
  }
  //去重:按照name为标准判断(既然name=id的情况下应该不重复) + 种类
  //不允许同种类且同name的数据再加入
  const array = getBookmarks();
  const flag = array.some(item=>item.name === nameInput.value && item.category === slt.value);
  if(flag){
    alert("Duplicate input!");
    return;//DOM 事件监听器里，完全可以用 return 提前终止当前逻辑
  }
  bm.name = nameInput.value;
  bm.category = slt.value;
  bm.url = urlInput.value;
  //添加新值,但要先获取localStorage的值到array里,然后增加)
  bookmarks = getBookmarks();
  bookmarks.push(bm);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  console.log(JSON.parse(localStorage.getItem("bookmarks")));
  displayOrCloseForm();
  reset();
});

//listener_list
gB2Btn.addEventListener("click",()=>{
  reset();
  displayOrHideCategory();
});
dBBtn.addEventListener("click",()=>{//checked
  const checkedItem = document.querySelector(`[name="${slt.value}"]:checked`);
  if(!checkedItem){
    alert("Please check at least on item!");
    return;
  }
  //删本地存储
  //这里推荐使用getBookmarks()实时再获取一遍值,因为bookmarks是全局的,其他地方能修改调用,万一改了已经不能真实反映localStorage的值了,你还拿它做修改就错了
  bookmarks = getBookmarks()//!(A * B) = !A + !B
  .filter(item=>item.name !== checkedItem.id || item.category !== checkedItem.name);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  //更新前端显示
  showList();
});





//笔记
//(1) parentElement比较笨拙,它只找父亲
/**
 * <div>
 *   <div>  <---只找这个
 *     <p></p>
 *   </div>
 * </div>
 */
//closest("类选择器"),比较灵活,但是它往上还是找符合条件的第一个
//(2) 删除父容器最好用.remove()
// checkedItem.closest('div').remove();
