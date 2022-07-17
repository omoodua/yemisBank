// Get logged Client's info.
function ClientInfoName(cName){
if(localStorage.getItem("loggedClientName") === undefined) {
  cName = `Client`;
} else {
  cName = localStorage.getItem("loggedClientName");
}
return cName.replaceAll('"', '');
}

function ClientInfoEmail(cEmail){
  if(localStorage.getItem("loggedClientEmail") === undefined) {
    cEmail = ``;
  } else {
    cEmail = localStorage.getItem("loggedClientEmail");
  }
  return cEmail.replaceAll('"', '');
  }

export {
  ClientInfoName,
  ClientInfoEmail
}


