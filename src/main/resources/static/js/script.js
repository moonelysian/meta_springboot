$(document).ready(function(){
	
	assignDataToTable();
	
	$('table').on('click', 'button[id="delete"]', function(e){
		var id = $(this).closest('tr').children('td:first').text();
	       
	    $.ajax({
	    	type:"DELETE",
	        url:"http://localhost:8080/index" + id,
	        success: function(data){
	              alertUsing("delete.", true);
	              assignDataToTable();
	            },
	            error: function(err) {  
	                console.log(err);
	                alert(err);
	            }
	        });
	    })
	
	
	function assignDataToTable() {
		 $("tbody").empty();
	     $.ajax({    
	          type:"GET",
	          contentType: "application/json",
	          url:"http://localhost:8080",
	          success: function(data) {
	            var todos = JSON.parse(JSON.stringify(data));
	            for (var i in todos) {
	                $("tbody").
	                append("<tr> \
	                            <td id=\"id\">" +  todos[i].id + "</td> \
	                            <td>" +  todos[i].title + "</td> \
	                            <td>" +  todos[i].content + "</td> \
	                            <td>" +  todos[i].created + "</td> \
	                            <td> \ <button id='delete' class='btn btn-danger'>삭제</button> \
	                           <button id='edit' class='btn btn-warning'>수정</button> \ </td> \
	                        </tr>");
	            }
	          },
	          error: function(data) { 
	            console.log(data);
	          }
	      });
    }
});