const multipleInputItems12 = document.querySelectorAll("#personal-info, #product-info");
const multipleInputItems3 = document.querySelector("#complaints-group");
const multipleInputItems4 = document.querySelector("#solutions-group");
const otherComplaint = document.querySelector("#other-complaint");
const otherSolution = document.querySelector("#other-solution");
const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");


const orderNo = document.querySelector("#order-no");
const productCode = document.querySelector("#product-code");
const quantity = document.querySelector("#quantity");
//select all
const complaintsGroup = document.querySelectorAll("[name='complaint']");
const complaintDescription = document.querySelector("#complaint-description");
const complaintDescriptionContainer = document.querySelector("#complaint-description-container");
const solutionsGroup = document.querySelectorAll("[name='solutions']");
const solutionDescription = document.querySelector("#solution-description");
const solutionDescriptionContainer = document.querySelector("#solution-description-container");

//结果数组
let returnObj = {
  "full-name": false,
  "email": false,
  "order-no": false,
  "product-code": false,
  "quantity": false,
  "complaints-group": false,
  "complaint-description": true,
  "solutions-group": false,
  "solution-description": true,
};

//验证表单输入内容是否合法
function validateForm() {
  //Get values
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const orderNoValue = orderNo.value.trim();
  const productCodeValue = productCode.value.trim();
  const quantityValue = quantity.value.trim();
  let complaintChecked = [];  
  complaintsGroup.forEach(item=>complaintChecked.push(item.checked));
  const complaintDescriptionValue = complaintDescription.value.trim();
  let solutionsChecked = [];
  solutionsGroup.forEach(item=>solutionsChecked.push(item.checked));
  const solutionDescriptionValue = solutionDescription.value.trim();

  //Regexs
  const regexName = /^[a-z'-\s]{1,15}(?:[a-z'-\s]){1,4}$/i;
  const regexEmail = /^[a-z0-9]{1,15}@[a-z0-9]{1,15}\.[a-z0-9]{1,10}$/i;
  const regexOrderNo = /^2024[\d]{6}$/;
  const regexProductCode = /^[a-z]{2}\d{2}\-[a-z]\d{3}\-[a-z]{2}\d$/i;
  const regexQuantity = /^[1-9]\d*$/;
  //必须要加头尾限制,否则会出现实际超过20,但是找到20符合.的内容就返回true
  //多行输入
  const regexComplaintDescription = /^[\s\S]{20,}$/;
  const regexSolutionDescription = /^[\s\S]{20,}$/;

  //Verify: regex.test(str)
  returnObj["full-name"] = regexName.test(fullNameValue);
  returnObj["email"] = regexEmail.test(emailValue);
  returnObj["order-no"] = regexOrderNo.test(orderNoValue);
  returnObj["product-code"] = regexProductCode.test(productCodeValue);
  returnObj["quantity"] = regexQuantity.test(quantityValue);

  //1.have to choose one of them
  returnObj["complaints-group"] = complaintChecked.some(item=>item===true);
  //2.if they choosed "other", there are at least 20 characters
  if(otherComplaint.checked){
    returnObj["complaint-description"] = regexComplaintDescription.test(complaintDescriptionValue);
  }else{
    returnObj["complaint-description"] = true;
  }
  returnObj["solutions-group"] = solutionsChecked.some(item=>item===true);
  if(otherSolution.checked){
    returnObj["solution-description"] = regexSolutionDescription.test(solutionDescriptionValue);
  }else{
    returnObj["solution-description"] = true;
  }
  return returnObj;
}

function isValid(res) {
  let isReturnValid = Object.values(res).every((item) => item === true);
  return isReturnValid;
}

/**监听器 */
//前两个父容器:子元素id能和返回对象中的属性名对应上
multipleInputItems12.forEach(item=>{
  item.addEventListener("change", (e) => {
    validateForm();
    const element = e.target;
    const attribute = element.id;
    if (returnObj[attribute]) {
      e.target.style.border = "green 2px solid";
    }else{
      e.target.style.border = "red 2px solid";
    }
  })
});

//多选,子元素id和返回对象对不上
multipleInputItems3.addEventListener("change",()=>{
  validateForm();
  if (returnObj["complaints-group"]) {
    multipleInputItems3.style.borderColor = "green";
  }else{
    multipleInputItems3.style.borderColor = "red";
  }
});

//多选框other控制另一个fieldset的消失和出现
otherComplaint.addEventListener("change",()=>{
  if(otherComplaint.checked){
      complaintDescriptionContainer.classList.add("show");
  }else{
      complaintDescriptionContainer.classList.remove("show");
  }
});

//选中隐藏输入框1,让边框变绿
complaintDescription.addEventListener("input",()=>{
  validateForm();
  if(returnObj["complaint-description"]){
    complaintDescription.style.borderColor = "green";
  }else{
    complaintDescription.style.borderColor = "red";
  }
});

//选中隐藏输入框2,让边框变绿
solutionDescription.addEventListener("input",()=>{
  validateForm();
  if(returnObj["solution-description"]){
    solutionDescription.style.borderColor = "green";
  }else{
    solutionDescription.style.borderColor = "red";
  }
});

//单选选项切换用change事件能读到
multipleInputItems4.addEventListener("change",()=>{
  validateForm();
  if (returnObj["solutions-group"]) {
    multipleInputItems4.style.borderColor = "green";
  }else{
    multipleInputItems4.style.borderColor = "red";
  }
  if(otherSolution.checked){
      solutionDescriptionContainer.classList.add("show");
  }else{
      solutionDescriptionContainer.classList.remove("show");
  }
});

const form = document.querySelector("#form"); // 项目默认的表单id就是form
form.addEventListener("submit", (e) => {
  const validationResult = validateForm();
  isValid(validationResult);
});
