class AWSMAClass{
	constructor (){}

	getAccounts(callback){
		chrome.storage.sync.get("AWSMenuAccounts", function(items) {
			if(items === undefined ) {
				items["AWSMenuAccounts"] = [];
			}
			callback(items["AWSMenuAccounts"]);
		});
	}

	getAccount(accountId, callback){
		this.getAccounts(function(data){
			if(data!=undefined && data.hasOwnProperty(accountId))
			{
				callback(data[accountId]);
			} else {
				callback(null);
			}
		});
	}

	saveAccounts(accounts, callback){
		chrome.storage.sync.set({"AWSMenuAccounts": accounts});
		if(callback !== undefined) callback()
	}

	updateAccount(account){
		this.getAccounts((function(accounts){
			if(accounts == undefined) accounts = {};
			accounts[account.id] = account;
			this.saveAccounts(accounts);
		}).bind(this))
	}
}