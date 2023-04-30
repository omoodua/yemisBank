// Import the User model
const User = require("../models/user.models");

// Account open
const account_post = async (req, res) => {
  const { acctName, balance, id } = req.body; 
  
  try {
    const user = await User.findById(id);
    
    const newAccount = { acctName, balance };

    user.accounts.push(newAccount);
    
    user["totalBalance"] = parseInt(user["totalBalance"]) + parseInt(balance);

    user.markModified("accounts");
    
    user.markModified("totalBalance");
    
    const result = await user.save();

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Account deposit
const account_deposit = async (req, res) => {
  const { amount, acctID, id } = req.body; 
  
  try {
    // Find user
    const user = await User.findById(id);

    // Get account index from accounts array
    let acctIndex = 0;

    for (let i = 0; i < user["accounts"].length; i++) {
      if (user["accounts"][i]["_id"].equals(acctID)) {
        acctIndex = i;
      }
    }
    
    // Save new balance
    let newAcctBal = parseInt(user["accounts"][acctIndex].balance) + parseInt(amount);

    // Save total balance
    let newTotalBal = parseInt(user["totalBalance"]) + parseInt(amount);

    // Update
    user["accounts"][acctIndex].balance = newAcctBal;
    
    user["totalBalance"] = newTotalBal;

    // Mark modified
    user.markModified("accounts");
    
    user.markModified("totalBalance");
    
    // Save
    const result = await user.save();
    
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "Failed at the controller level" });
  }
};

// Account withdraw
const account_withdraw = async (req, res) => {
  const { amount, acctID, id } = req.body; 
  
  try {
    // Find user
    const user = await User.findById(id);

    // Get account index from accounts array
    let acctIndex = 0;

    for (let i = 0; i < user["accounts"].length; i++) {
      if (user["accounts"][i]["_id"].equals(acctID)) {
        acctIndex = i;
      }
    }
    
    // Save new balance
    let newAcctBal = parseInt(user["accounts"][acctIndex].balance) - parseInt(amount);

    // Save total balance
    let newTotalBal = parseInt(user["totalBalance"]) - parseInt(amount);

    // Update
    user["accounts"][acctIndex].balance = newAcctBal;
    
    user["totalBalance"] = newTotalBal;
    
    // Mark modified
    user.markModified("accounts");
    
    user.markModified("totalBalance");
    
    // Save
    const result = await user.save();
    
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Account close
const account_close = async (req, res) => {
  const { acctID, id } = req.body; 
  
  try {
    // Find user
    const user = await User.findById(id);

    // Get account index from accounts array
    let acctIndex = 0;
    let balance = 0;

    for (let i = 0; i < user["accounts"].length; i++) {
      if (user["accounts"][i]["_id"].equals(acctID)) {
        acctIndex = i;
        balance = user["accounts"][i]["balance"];
      }
    }
    
    // Save total balance
    let newTotalBal = parseInt(user["totalBalance"]) - parseInt(balance);

    // Update
    user["accounts"].splice(acctIndex, 1);
    
    user["totalBalance"] = newTotalBal;
    
    // Mark modified
    user.markModified("accounts");
    
    user.markModified("totalBalance");
    
    // Save
    const result = await user.save();
    
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};


module.exports = {
  account_post,
  account_deposit,
  account_withdraw,
  account_close
};