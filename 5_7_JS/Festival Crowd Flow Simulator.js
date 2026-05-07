/**
simulateFestival（总控）
  ↓ 每秒
    handleGateAtTick（处理单个口）
      ↓
      processGateFlow（计算能进多少、溢出多少）
      ↓
      rerouteOverflow（溢出就转给下一个口）
  ↓ 最后
printSummary（输出结果）
*/
const morningGates = [
  { id: "North", capacity: 5, queue: [3, 6, 2, 4] },
  { id: "East", capacity: 3, queue: [2, 4, 3, 5] },
  { id: "South", capacity: 4, queue: [1, 2, 3, 1] },
  { id: "West", capacity: 2, queue: [4, 1, 2, 3] },
];

const nightGates = [
  { id: "North", capacity: 4, queue: [6, 2, 5, 1] },
  { id: "East", capacity: 2, queue: [3, 3, 4, 2] },
  { id: "South", capacity: 5, queue: [2, 1, 2, 3] },
  { id: "West", capacity: 3, queue: [5, 2, 1, 4] },
];

//输出：一个对象 { North:0, East:0, South:0, West:0 } 方便统计
function initializeThroughput(gates) {
  const summary = {};
  for (const gate of gates) {
    summary[gate.id] = 0;
  };
  return summary;
}
//单个门的处理
//输出: 对象{processed:xx, overflow:xx}
function processGateFlow(gate, tickIndex) {
  let currentTickQueue = gate.queue[tickIndex];
  let processed = 0;
  while (currentTickQueue > 0 && processed < gate.capacity) {
    currentTickQueue--;
    processed++;
  }
  return {
    processed: processed,
    overflow: currentTickQueue
  };
}

//把溢出的人转到下一个检票口
function rerouteOverflow(gates, currentGate, tickIndex, overflowAmount) {
  const currentIndex = gates.indexOf(currentGate);
  const nextGateIndex = (currentIndex + 1) % gates.length;
  gates[nextGateIndex].queue[tickIndex] += overflowAmount;
  console.log(
    overflowAmount + " attendees rerouted to " +
    gates[nextGateIndex].id
  );
}

//处理单个门分为两个步骤: 处理当前门 --> 有溢出转到别的门
function handleGateAtTick(gates, gate, tickIndex, throughputSummary) {
  console.log("\nProcessing " + gate.id + "...");
  console.log(
    gate.queue[tickIndex] + " attendees arriving."
  );
  //单个门处理
  const result = processGateFlow(gate, tickIndex);
  throughputSummary[gate.id] += result.processed;
  if (result.overflow > 0) {//如果有溢出
    console.log(
      "Overflow of " + result.overflow +
      " attendees. Rerouting..."
    );
    //执行转移函数
    rerouteOverflow(gates, gate, tickIndex, result.overflow);
  }
}

//打印最后的结果
function printSummary(summary) {
  console.log("\nThroughput Summary");
  for (const gateId in summary) {
    console.log(
      gateId + ": " + summary[gateId] +
      " attendees processed"
    );
  }
}

//整个模拟的总函数相当于main
function simulateFestival(gates, timeBlock) {
  console.log("\n" + timeBlock + " Simulation");
  const throughputSummary = initializeThroughput(gates); //拿到统计本
  const maxTicks = gates[0].queue.length; 
  let tickIndex = 0;

  //四个时段,都要处理
  while (tickIndex < maxTicks) {
    console.log("\nTick " + (tickIndex + 1));
    for (const gate of gates) {
      //两个函数被集成到这里
      handleGateAtTick(gates, gate, tickIndex, throughputSummary);
    }
    tickIndex++;
  }
  //打印
  printSummary(throughputSummary);
}

//验证输出
simulateFestival(morningGates, "Morning");
simulateFestival(nightGates, "Night");
