$(document).ready(function(){
	
//	assignDataToTable();
	
	$('table').on('click', 'button[id="edit"]', function(e){
		
		var postId = $(this).closest('tr').children('td:first').text();
		var postTitle = $(this).closest('tr').children('td:nth-child(2)').text(); 
	    var postContent = $(this).closest('tr').children('td:nth-child(3)').text(); 
	    var postCreated = $(this).closest('tr').children('td:nth-child(3)').text();
		
	    alert(postId);
	    
	    var todo = {
	        	id: postId,
	        	title: postTitle,
	        	content: postContent,
	        	created: postCreated
	        };
	    
	    $.ajax({
	    	type:"GET",
	        url:"http://localhost:8080/edit"+id,
	        data: JSON.stringify(todo) 
	        success: function(data){
	        	alert("dsdsdsdss");
	            },
	            error: function(err) {  
	                console.log(err);
	                alert(err);
	            }
	        });
	    })
	
//	function assignDataToTable() {
//		 $("tbody").empty();
//	     $.ajax({    
//	          type:"GET",
//	          contentType: "application/json",
//	          url:"http://localhost:8080",
//	          success: function(data) {
//	            var todos = JSON.parse(JSON.stringify(data));
//	            for (var i in todos) {
//	                $("tbody").
//	                append("<tr> \
//	                            <td id=\"id\">" +  todos[i].id + "</td> \
//	                            <td>" +  todos[i].title + "</td> \
//	                            <td>" +  todos[i].content + "</td> \
//	                            <td>" +  todos[i].created + "</td> \
//	                            <td> \ <button id='delete' class='btn btn-danger'>삭제</button> \
//	                           <button id='edit' class='btn btn-warning'>수정</button> \ </td> \
//	                        </tr>");
//	            }
//	          },
//	          error: function(data) { 
//	            console.log(data);
//	          }
//	      });
//    }
//	});
});