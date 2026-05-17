class BankAccount{
  constructor(){
    this.balance = 0;
    this.transactions = [];
  }
  deposit(money){
    if(money<=0){
      return "Deposit amount must be greater than zero."
    }
    this.transactions.push({
      type:"deposit",
      money:money,
    });
    this.balance += money;
    return `Successfully deposited $${money}. New balance: $${this.balance}`

  }
  withdraw(money){
    if(money <= 0){
      return "Insufficient balance or invalid amount.";
    }
    if(money > this.balance){
      return "Insufficient balance or invalid amount.";
    }
    this.transactions.push({
      type:"withdraw",
      money:money,
    });
    this.balance -= money;
    return `Successfully withdrew $${money}. New balance: $${this.balance}`;
  }
  checkBalance(){
    return `Current balance: $${this.balance}`;
  }
  listAllDeposits(){//列出所有存款
    return `Deposits: ${this.transactions.filter(item=>item.type === "deposit").map(item=>item.money)}`;

  }
  listAllWithdrawals(){//...提款,像这种显示以后使用map就可以
    return `Withdrawals: ${this.transactions.filter(item=>item.type === "withdraw").map(item=>item.money)}`;
  }
}

const myAccount = new BankAccount();
myAccount.deposit(10);
myAccount.deposit(35);
myAccount.withdraw(25);
myAccount.deposit(35);
myAccount.withdraw(90);
myAccount.withdraw(10);
myAccount.deposit(90);
console.log(myAccount.listAllDeposits());

