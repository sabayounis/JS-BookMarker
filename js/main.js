

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(event){
	
	var siteName= document.getElementById('siteName').value;
	var siteUrl= document.getElementById('siteUrl').value;
	if(! validationForm(siteName, siteUrl)){
	return false;
	
	
	}
	
	var bookmark={
		name: siteName,
		url:siteUrl
	}
	/*
		localStorage.setItem('test', 'hello world');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
	console.log(localStorage.getItem('test')); */
	
 	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		
	}
	document.getElementById('myForm').reset();
	fetchBookmark();
	event.preventDefault();
	
	
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url==url){
			
			bookmarks.splice(i,1);
			
			
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmark();
}

function fetchBookmark(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults= document.getElementById('bookmarksResults');
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		
		bookmarksResults.innerHTML += '<div class="well">'+
		'<h3>'+name+
		' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
		' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
		'</h3>'+
		'</div>';
	}
}
 function validationForm(siteName, siteUrl){
 if(!siteName || !siteUrl){
		confirm('please fill the form');
		return false;
		
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
 
 if( !siteUrl.match(regex)){
 
 alert('use a correct url');
return false 
 }
 return true;
 }

