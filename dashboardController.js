function dashboardController($scope,$http,$rootScope) {


$scope.buyerFlagLocal=$rootScope.buyerFlag;


if($scope.buyerFlag==true)
{

$scope.showBuyerAgreement=true;

var jsonQuery={
  "jsonrpc": "2.0",
  "method": "query",
  "params": {
    "type": 1,
    "chaincodeID": {
      "name": "5efc5581ed544c77916d2b2a097a1a70c5ed9e4cfa51dfaebcbc4d6d8ff74b262eea0676d14f63ec21f5dc0a34dbca2d3d1c9d99f0031c35284c5c1d594ef08b"
    },
    "ctorMsg": {
      "args": ["GetContract","BuyerUser"]
    },
    "secureContext": "jim"
  },
  "id": 2
} ;

$http({
  method: 'POST',
  url: 'http://192.168.94.100:7050/chaincode',
  headers: {
      'Content-type': 'application/json'
  },
  data:jsonQuery
}).then(function successCallback(response) {

response.data.result.message=JSON.parse(response.data.result.message);

  /*for (var i = 0, len = response.data.result.message.length; i < len; i++){
      response[i].fullname = JSON.parse(response[i].fullname)
      //This will convert the strings into objects before Ng-Repeat Runs
    //Now we will set customers = to response
     $scope.customers = response

   }*/
  console.log(response.data)

  $scope.articleList=response.data.result.message[0].ORDER_INFO.ARTICALE_LIST;

  $scope.details=response.data.result.message[0].ORDER_INFO;


//$state.go('dashboard',{});
}, function errorCallback(response) {
  console.log(response)
});


}
else if($rootScope.buyerFlag==false)
{
  $scope.showBuyerAgreement=false;
}




 $scope.isClosed = false;
 $scope.test={};
 $scope.test.openNav=true

$scope.buyerList=[{id:0, name:'--Please Select--'},{id:1, name:'BuyerUser'}];

$scope.selectedBuyer=$scope.buyerList[0];




$scope.sellerName="Seller1";

$scope.articles=[{selectedArticleName:"",articleName:[{id:0, name:'--Please Select--'},{id:1, name:'Article1'},{id:2, name:'Article2'},{id:3, name:'Article3'},{id:4, name:'Article4'},{id:5, name:'Article5'}],
selectedArticleQty:"",articleQuantity:[{id:0, name:'--Please Select--'},{id:1, name:'Quantity1'},{id:2, name:'Quantity2'},{id:3, name:'Quantity3'},{id:4, name:'Quantity4'},{id:5, name:'Quantity5'}],
selectedArticlePrice:"",articlePrice:[{id:0, name:'--Please Select--'},{id:1, name:'Price1'},{id:2, name:'Price2'},{id:3, name:'Price3'},{id:4, name:'Price4'},{id:5, name:'Price5'}]}];

$scope.articleName=$scope.articles[0].articleName[0];
$scope.articleQuantity=$scope.articles[0].articleQuantity[0];
$scope.articlePrice=$scope.articles[0].articlePrice[0];


$scope.addAnotherArticle=function()
{
$scope.articles.push({selectedArticleName:"",articleName:[{id:0, name:'--Please Select--'},{id:1, name:'Article1'},{id:2, name:'Article2'},{id:3, name:'Article3'},{id:4, name:'Article4'},{id:5, name:'Article5'}],
selectedArticleQty:"",articleQuantity:[{id:0, name:'--Please Select--'},{id:1, name:'Quantity1'},{id:2, name:'Quantity2'},{id:3, name:'Quantity3'},{id:4, name:'Quantity4'},{id:5, name:'Quantity5'}],
selectedArticlePrice:"",articlePrice:[{id:0, name:'--Please Select--'},{id:1, name:'Price1'},{id:2, name:'Price2'},{id:3, name:'Price3'},{id:4, name:'Price4'},{id:5, name:'Price5'}]});
};

$scope.sendContract=function()
{
console.log($scope.articlePrice.toString());
$scope.articleListToDb=[];

$rootScope.uniqueId=(Date.now()).toString();

for(var i=0; i<$scope.articles.length; i++)
{
  $scope.articleListToDb.push({ARTICLE_DESC : $scope.articles[i].selectedArticleName.name,
  ARTICLE_QTY : $scope.articles[i].selectedArticleQty.name,
  ARTICALE_PRICE : $scope.articles[i].selectedArticlePrice.name});
}





$rootScope.secondUniqueId=(Date.now()).toString();

  var contractDetails={
  	CONTRACT_ID : $rootScope.uniqueId,
  	ORDER_INFO : $rootScope.secondUniqueId,
  	PAYMENT_COMMITMENT : true,
  	PAYMENT_CONFIRMATION : true,
  	INFORMATION_COUNTERPARTY : true,
  	FORFEITING_INVOICE : true,
  	CONTRACT_CREATE_DATE : "10-10-2017",
  	PAYMENT_DUE_DATE : "09-09-2017",
  	INVOICE_STATUS : "started",
  	PAYMENT_STATUS : "started",
  	CONTRACT_STATUS : "started",
  	DELIVERY_STATUS : "started"
  };
  var articleDetails={
  	ORDER_ID :  $rootScope.secondUniqueId,
  	ARTICALE_LIST : $scope.articleListToDb,
  		/*[
  			{
  				ARTICLE_DESC : $scope.articleName.toString(),
  				ARTICLE_QTY : $scope.articleQuantity.toString(),
  				ARTICALE_PRICE : $scope.articlePrice.toString()
  			},
  			{
  				ARTICLE_DESC : "test2",
  				ARTICLE_QTY : "20",
  				ARTICALE_PRICE : "20"
  			}
  		],*/
  	BUYER_INFO : "BuyerUser",
  	SELLER_INFO : "SellerUser",
  	SHIPMENT_INFO : "NA",
  	TOTAL_AMOUNT : "500"
  };

  var config = {headers:  {
      'Accept': 'application/json;odata=verbose',
      "content-type": "application/json",
  }
};

var dataToSend={
  "jsonrpc": "2.0",
  "method": "invoke",
  "params": {
      "type": 1,
      "chaincodeID":{
          "name":"f47d89813519f341718942a5ea27c7ef95df2653ffbbfa28dd2cad60a6bbe3236cc89a42c93f1f3216e303d199839c1a3117571bc1b287e1964a597fb79f11ca"
      },
      "ctorMsg": {
         "args":["SaveContract",JSON.stringify(contractDetails),JSON.stringify(articleDetails)]
      },
      "secureContext": "jim"
  },
  "id": 3
}


$http({
  method: 'POST',
  url: 'http://192.168.94.100:7050/chaincode',
  headers: {
      'Content-type': 'application/x-www-form-urlencoded'
  },
  data:dataToSend
}).then(function successCallback(response) {
  console.log(response.data)
//$state.go('dashboard',{});
}, function errorCallback(response) {
  console.log(response)
});



};


 $scope.openNav1=function()
 {

 if($scope.isClosed == false)
 {

 $scope.test.openNav=false;
 $scope.isClosed = true;

 }
 else if($scope.isClosed == true)
 {
 $scope.test.openNav=true;
 $scope.isClosed = false;

 }

 }

}


/*$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;
    trigger.click(function () {
      hamburger_cross();
    });
    function hamburger_cross() {
      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});*/
