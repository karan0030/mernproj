exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            return res.status(400).send(err)
        }else{
               res.send(response)
        }
      });
} 

exports.processPayment=(req,res)=>{

    let nonceFromTheClient=req.body.paymentMethodNonce

    let amountfromClient= req.body.amount
    gateway.transaction.sale({
        amount: amountfromClient,
        paymentMethodNonce: nonceFromTheClient,
      
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if(err){
            return res.status(400).json(err)
        }else{
               res.json(result)
        }
      });

}

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "z2bjb8c8rq4y5wpj",
  publicKey: "f8m8b9wf6q3xkdg2",
  privateKey: "7f89a9189d67afc837c6e71c012d6ed3"
});




