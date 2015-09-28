$(document).ready(function(){
/*Using document ready runs code only after the DOM is ready for js code to run more on that here: https://learn.jquery.com/using-jquery-core/document-ready */
	function postData() {	
		var userName = 'TWTR_user';
     	var currentTweet = {
        text: $('#tweetBox').val(),
        userName: userName
     	 }
		var strCT = JSON.stringify(currentTweet)
		var post = (currentTweet.text)
		$.post('http://localhost:3000/messages', strCT);
		$('<li>').text(post).prependTo('.postedTweets')
			
	}
	
	$("#tweetBtn").click(postData);

	function getData() {
		/*This function should make a get request from 'database', parse the data and prepend each to the page*/
		$.get("/messages" , function (data, tweet){
							var dataStr = data.toString();
							//console.log(dataStr);
							
							var dataArray = dataStr.split('\n');
							//console.log(dataArray);
							for (var index = 0; index < dataArray.length-1; index++){
								var soloTweet = dataArray[index];
								console.log(soloTweet);
								var parseTweet = JSON.parse(soloTweet);
								var post = "TWTR_user: " + parseTweet.text;
								$('<li>').text(post).prependTo('.postedTweets')
								
							}
							})
	}

	/*Calls function once page loaded to display tweets to page*/
	getData();

});