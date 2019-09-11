//$(document).ready(function(){
	
//	assignDataToTable();
    
	$('table').on('click', 'button[id="show"]', function(e){
		var postId = $(this).closest('tr').children('td:first').text();
		location.href="http://localhost:8080/todo/"+postId;

	})
	
	$('table').on('click', 'button[id="edit"]', function(e){
		
		var postId = $(this).closest('tr').children('td:first').text();
	    
	    $.ajax({
	    	type:"GET",
	        url:"http://localhost:8080/edit/"+postId,
	        data: postId,
	        success: function(data){
	        	location.href="http://localhost:8080/edit/"+postId;
	            },
	            error: function(err) {  
	                console.log(err);
	                alert(err);
	            }
	        });
	    })

//    function assignDataToTable() {
//        $("tbody").empty();
//        $.ajax({    
//          type:"GET",
//          contentType: "application/json",
//          url:"http://localhost:8080/api/todos",
//          success: function(data) {
//            var todos = data;
//            $("tbody").empty();
//            todos.forEach( function( item, index, array ){
//                $("tbody").
//                append("<tr> \
//                            <td>" + item.todoId + "</td> \
//                            <td>" +  item.title + "</td> \
//                            <td>" +  item.content + "</td> \
//                            <td>" +  item.created + "</td> \
//                            <td> \ <button id='show' class='btn btn-info'>보기</button> \
//                            		<button id='edit' class='btn btn-warning'>수정</button> \
//                           <button id='delete' class='btn btn-danger'>삭제</button> \ </td> \
//                        </tr>");
//            });
//            
//          },
//          error: function(data) { 
//            console.log(data);
//            }
//        });
//       
//    }
//});