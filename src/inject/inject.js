chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			xxx();
		}
	}, 10);
});

function xxx(){
		var accountId = document.querySelectorAll('[data-testid="aws-my-account-details"]')[0].innerText;
		let AWSMA = new AWSMAClass("AWSMenuAccounts");
		AWSMA.getAccount(accountId, function(account){
			if(account === null){
				account = {id: accountId, name: accountId,colour:accountId.hashCode()}
				AWSMA.updateAccount(account);
			}
			updateLabel(account.name);
			restyleMenuClasses(account.colour);
		});
	}
