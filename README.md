# Spotify Family Manager
Simple Web App based on [Google Apps script](https://script.google.com/) to keep track of your friends' payments for the shared Spotify Family Plan.

## How Does it work
The webapp uses a google sheet like a database, every row is a month and every column is a member, and TRUE/FALSE stands for month paid or not.
The last row is the member's email, used for alerting them automatically in case they didn't pay the subscription yet.
<img src="https://i.imgur.com/ixQai7G.png"> </img>  

## The Web Page
The webpage is simple and it's made in bootstrap, it contains just two selector, one for the member and one for the month, once clicked on "Confirm Payment" both you and member will receive a confirmed payment email, and the action will be saved in the "Logs" Sheet. 

<img src="https://i.imgur.com/kFlqvmB.png"></img>
<br>
Logs Sheet:  

<img src="https://i.imgur.com/jF8NlTV.png"></img>

## Conclusions
The app will notify you and the user in case they didn't pay everytime the function `checkPayment()` is runned, Use Apps Script's Triggers to run the function every 24 hours to notify the members daily



