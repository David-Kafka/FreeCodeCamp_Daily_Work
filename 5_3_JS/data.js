const currentDate = new Date();
// const  = now.getDate();

let currentDateFormat = `Current Date and Time: ${currentDate}`;
console.log(currentDateFormat);

const formatDateMMDDYYYY = (now) =>{
  return `Formatted Date (MM/DD/YYYY): ${now.toLocaleDateString()}`;
}
// console.log(`Formatted Date (MM/DD/YYYY): ${currentDate.toLocaleDateString()}`);

const formatDateLong = (now) => {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return `Formatted Date (Month Day, Year): ${now.toLocaleDateString("en-US",options)}`;
}
