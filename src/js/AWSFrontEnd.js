String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
	}
	return hash.toString(16).slice(-6);
};

function restyleMenuClasses(colour){
	document.querySelectorAll('[data-testid="awsc-nav-header-viewport-shelf-inner"]')[0].style.backgroundColor = colour;
}

function updateLabel(name){
	document.querySelectorAll('[data-testid="awsc-nav-account-menu-button"]')[0].children[0].innerText = name;
}
