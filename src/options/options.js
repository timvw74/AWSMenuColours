function save_options() {
    var accounts = {};
    var table = document.getElementById('accounts');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var account = {};
        var del;
        for (var j = 0, col; col = row.cells[j]; j++) {
            if(col.dataset.name !== "delete"){
                account[col.dataset.name] = col.dataset.value;
            } else{
                del = col.dataset.value=="true"? true : false;
            }
        }
        if(del === false){
            accounts[account.id] = account;
        }
    }
    console.log(accounts);
    let AWSMA = new AWSMAClass();
    AWSMA.saveAccounts(accounts, function(){
        window.close();
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);



function createRow(account){
    var tr = document.createElement("tr");
    tr.dataset.id = account.id;

    var tdid = document.createElement("td");
    tdid.classList = "tg-yw4l";
    tdid.dataset.name = "id";
    tdid.dataset.value = account.id;
    tdid.appendChild(document.createTextNode(account.id));
    tr.appendChild(tdid);


    var tdname = document.createElement("td");
    tdname.classList = "tg-yw4l";
    var namelabel = document.createElement("input");
    namelabel.value = account.name;
    namelabel.onchange = function(){tdname.dataset.value = this.value};
    tdname.appendChild(namelabel);
    tdname.dataset.name = "name";
    tdname.dataset.value = account.name;
    tr.appendChild(tdname);
    
    var tdcolour = document.createElement("td");
    tdcolour.classList = "tg-yw4l";
    tdcolour.dataset.name = "colour";
    var colourInput = document.createElement("input");
    colourInput.type="color";
    colourInput.value = account.colour;
    colourInput.onchange = function(){tdcolour.dataset.value = this.value};
    tdcolour.appendChild(colourInput);
    tdcolour.dataset.value = account.colour;
    tr.appendChild(tdcolour);

    var tddelete = document.createElement("td");
    tddelete.classList = "tg-yw4l";
    var check = document.createElement("input");
    check.name = account;
    check.type = "checkbox";
    check.onchange = function(){tddelete.dataset.value = this.checked};
    tddelete.appendChild(check);
    tddelete.dataset.name = "delete";
    tddelete.dataset.value = false;
    tr.appendChild(tddelete);
    
    return tr;
}

function restore_options(){
    let AWSMA = new AWSMAClass();
    AWSMA.getAccounts(function(accounts){
        var table = document.getElementById("accounts");
        for (var accountId in accounts){
            table.appendChild(createRow(accounts[accountId]));
        }
    });
}

var image = document.getElementById("logo");
image.src = chrome.extension.getURL("../../icons/icon128.png");
