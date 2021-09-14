let ss = SpreadsheetApp.openByUrl("YOUR_SHEET_LINK");
const ws = ss.getSheetByName("Spotify");
const logs = ss.getSheetByName("Logs");
const range = ws.getDataRange();
const values = range.getValues();

function doGet(e) {
  const tmpl = HtmlService.createTemplateFromFile('Index');
  tmpl.options = getUsers();
  const output = tmpl.evaluate();
  output.setTitle('Spotify Manager');
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

function getUsers(){
  let users = values.slice(2).map(row => row[0])
  let options = ``
  for(user of users){
    options+=`<option value="${user}">${user}</option>`
  }
  return options
}

function checkPayment(){
  let payments = []
  let currentMonth = new Date().getMonth()
  for(let i = 2; i<values.length; i++){
    let row = values[i]
    payments.push({member: row[0], lastMonthPaid: row[currentMonth], email: row[13]})
  }
  return payments
}

function addPayment(member, month){
  for(let i = 2; i<values.length; i++){
    let row = values[i]
    if(member.toLowerCase() == row[0].toLowerCase()){
      let letter = numToAlphabet(parseInt(month)+1)
      Logger.log(`${letter}${i+1}`)
      ws.getRange(`${letter}${i+1}`).setValue(true)
      let paymentCode = Math.floor(100000 + Math.random() * 900000)
      sendPaid(ws.getRange(`N${i+1}`).getValue(), paymentCode)
      logs.appendRow([paymentCode, new Date(), member, month])
    }
  }
}


function numToAlphabet(num){
  return String.fromCharCode(num + 64)
}

function emailPayments(){
  let payments = checkPayment()
  for(payment of payments){
    if(payment.lastMonthPaid == false) {
      sendReminder(payment.email)
      alertOwner(payment.member)
    }
  }
}

function sendReminder(email){
    MailApp.sendEmail({
      name: "Spotify Family",
      subject: "Reminder | Spotify Family Payment",
      to: email,
      htmlBody: "You haven't paid your spotify family plan yet."
  });
}

function sendPaid(email, paymentNumber){
    MailApp.sendEmail({
      name: "Spotify Family",
      subject: "Alert | Payment Confirmed",
      to: email,
      htmlBody: `Payment Confirmed for the last month. Payment Number: ${paymentNumber}`
  });
}

function alertOwner(member){
    MailApp.sendEmail({
      name: "Spotify Family",
      subject: "Mancanza Pagamento",
      to: "YOUR_EMAIL",
      htmlBody: `${member} hasn't paid the spotify family plan yet`
  });
}


