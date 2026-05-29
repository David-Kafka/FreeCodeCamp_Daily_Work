function initList() {
  return {
    head: null,
    length: 0
  };
}

function isEmpty(list) {
  return list.length === 0;
}

function add(list, element) {
  const node = { element, next: null };

  if (isEmpty(list)) {
    list.head = node;
  } else {
    let current = list.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  list.length++;
}

function remove(list, element) {
  let previous = null;
  let current = list.head;

  while (current !== null && current.element !== element) {
    previous = current;
    current = current.next;
  }

  if (current === null) return;

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
}

function contains(list, element) {
    if(!list.length)return false;
    let current =  list.head;
    while(current.next !== null){
      current = current.next;
      if(current.element === element){
        return true;
      }
    }
    return false;
}

function getAt(list, index) {
    if(!list.length)return undefined;
    if(isNaN(index) || index < 0 || index >= list.length || !Number.isInteger(index)) return undefined;
    let current = list.head;
    let count = 0;
    while(count !== index){
      current = current.next;
      count++;
    }
    return current.element;
}

/**
  list 有 head 和 length
    head 有 element 和 next(not null)
    node 有 element 和 next(null)
 */
function insertAt(list, index, element) {
  if(index < 0 || index > list.length)return;
  if(index === list.length || isEmpty(list)) {
    add(list, element);
    return;
  }
  const node = { element, next: null };

  if(index === 0){
    node.next = list.head;
    list.head = node;
    list.length++;
    return;
  }
  let current = list.head;
  let count = 0;

  while(current.next !== null && count !== index-1){
    current = current.next;
    count++;
  }
  node.next = current.next
  current.next = node;
  list.length++;
  return list;
}

function removeAt(list, index) {
  if(index < 0 || index >= list.length || isEmpty(list))return;
  if(index === list.length-1 || list.length === 1) {
    remove(list, getAt(list, index));
    return;
  }

  if(index === 0){
    list.head = list.head.next;
    list.length--;
    return;
  }
  let current = list.head;
  let count = 0;
  while(current.next != null && count !== index-1){
    current = current.next;
    count++;
  }
  current.next = current.next.next;
  list.length--;
}

function clear(list) {
  list.head = null;
  list.length = 0;
}

const myList = initList();
add(myList,4);
add(myList,1);
add(myList,2);
add(myList,3);
console.log(myList);
// console.log(contains(myList,2)); 
console.log(getAt(myList,2));
/**
  { 
    node:{
      element:element,
      next:{ 
        element: 1, 
        next: 
          { 
            element: 2, 
            next: [Object] 
          } 
      }
    }
    head: 
      {
        element:element,
        next:{ 
          element: 1, 
          next: 
            { 
              element: 2, 
              next: [Object] 
            } 
        }
      },
    length: 3 
  }

    { 
      head: 
        { 
          element: 4, 
          next: 
            { 
              element: 1, 
              next: [Object] 
            } 
          },
      length: 4 
    }
 */
