// The object 'Contracts' will be injected there, which will contain all data for all contracts, keyed on contract name: 
//Contracts['HelloWorld']= {
//abi:[],
//address:"Ox..",
//endpoint: "http://..."
//}

//Create an instance of the smart contract, passing it as a property,
//which allows web3js to interact with it.

Function Coin(Contract) {
  this.web3 = null;
  this.instance = null;
  this.Contract = Contract;
}

//Initialize the 'Coin' object and create an instance of the web3j library, 
Coin.prototype.init = function() {
  //The initilization function defines the interface for the contract using the web3js contract obeject and then defines the
  //address of the instance of the contract for the 'Coin' object.
  
  //Create a new Web3 instanceusing either the Metamask provider or an independent provider created as the endpoint configured
  // for the contract.
 this.web3 = new Web3(
 (window.web3 && window.web3.currentProvider) ||
  new Web3.providers.HttpProvider(this.Contract.endpoint));
  
   //Create the contract interface using the ABI provided in the configuraiton.
var contract_interface = this.web3.eth.contract(this.Contract.abi);
 
  //Create the constract instance for the specific address provided in the configuration.
this.instance = contract_interface.at(this.Contract.address);
};

  //Function triggered by "Check Balance" Button to display account balance. 
Coin.prototype.showAddressBalance = function(hash, cb) {
var that = this;

  //Get input values, the address to check the balance of var address = $("#balance-address").val();
  
  //Validate address using utility function.
 if(!isValidAddress(address)) {
  console.log("invalid address");
    return;
 }
 
 //Check the balance from the address passed and output the value
this.getBalance(address, function(error,balance) {
  if(error) {
    console.log(error)
    }
   else {
    console.log(balance.toNumber());
    $("#message").text(balance.toNumber());
    }
   }}
  }
  
    //Get balance of Tokens found by address from contract
  Coin.prototype.getBalance = function(address, cb) {
    this.instance.balance(address, function(error, result) {
    cb(error, result);
   })
 }
 
  //Send Tokens to another address when the "send" button is clicked
Coin.prototype.createTokens = function() {
  var that = this;
  
  //Get input values for address and amount
 var address =$("#create-address").val();
 var amount = $("#create-amount").val();
 console.log(amount);
 
  //Validate address using utility function
 if(!isValidAddress(address)){
  console.log("invalid address"):
  return;
 }
 
 //Validate amount using utility function
if(!isValidAmount(amount)){
console.log("invalid amount");
return;
}

//Transfer amount to other address
//Use the public mint function from the smart contract
this.instance.mint(address,amount, {from:window.web3.eth.accounts[0],gas:100000, gasPrice:100000, gasLimit:100000},

  //If there is an error, log it
function(error, txHash) {
  if(error) {
  console.log(error);
  }
  //If success then wait for confirmation of transaction with utility function and clear form values while waiting
  
  else {
    that.waitForReceipt9txHash, function(receipt) {
      if(receipt.status) {
      $("#create-address").val("");
      $("#create-amount").val("");
     }
     else{
      console.log("error");
      }
     }};
    }
   }
  )
 }
 
 //Waits for receipt of transaction
 
 Coin.prototype.waitForReceipt = function(hash,cb) {
 var that = this;
 
  //checks for transaction receipt using web3 library method
this.web3.eth.getTransactionReceipt(hash, function(err, receipt){
  if(err) {
    error(err);
    }
   }else {
    // Tray again in 2 Second
   window.setTimeout(function() {
    that.waitForReceipt(hash,cb);
   }, 2000);
   }
  });
 }
 
  //Check if it has the basic requirements of an address
 function isValidAddress(address) {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
 }
 
 //Basic validation of amoutn. Bigger than 0 and typed number
 
 function isValidAmount(amount) {
  return amount > 0 && typed Number(amount) == 'number';
 }
 
  //Bind functions to the buttons defined in app.html
 Coin.prototype.bindButtons = function() {
  var that = this;
  
  $(document).on("click" , "#button-check", function() {
    that.createTokens();
    });
    
  $(document).on("click","#button-check", function() {
    that.showAddressBalance();
    });
   }
   
  //Create the instance of the 'Coin' object
 Coin.prototype.onReady=function() {
  this.bindButton();
  this.init();
  };
  
  if(typeof(contracts)==="undefined")var Contracts={ Coin: abi: [] }};
    var coin = newCoin(Contracts['Coin']);
    
   $(document).ready(function() {
   coing.onReady();
   });
   

  
  
