$(document).ready(function(){
	
	var row = $("select option:selected").val();
	assignDataTest(row);
	makeBar(row);
	
	$('select').change(function(row){
		row = $("select option:selected").val();
		makeBar(row);
		assignDataTest(row,1);
	});

	function makeBar(row){
			$.ajax({
			type: "GET",
			url:"http://localhost:8080/api/count",
			success: function(data){
				var pageCnt = Math.ceil(data/row);
				var $pagination = $('.pagination');
				$pagination.empty();
				
				var previousElement = ''
					+ '<li>'
						+ '<a class="page-link" href="#" aria-label="Previous">' 
							+ '<span aria-hidden="true">&laquo;</span>'
						+ '</a>'
					+ '</li>';
				$pagination.append(previousElement);
				for(var i=0; i<pageCnt; i++){
					$pagination.append(
						"<li class=\"page-item\">"+
						"<a class=\"page-link\" href=\"#\">"+ (i+1) +"</a>" +
						"</li>"
					);
				}

				var nextElement = ''
					+ '<li>'
						+ '<a class="page-link" href="#" aria-label="Next">' 
							+ '<span aria-hidden="true">&raquo;</span>'
						+ '</a>'
					+ '</li>';
				$pagination.append(nextElement);
				$('.page-item').click(function(){
					var pageNo = $('.page-item').index()+1;
					console.log(pageNo);
					assignDataTest(row, pageNo);
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	
	function assignDataTest(row, pageNo){
		var pagingData = {
				pageSize: row,
				pageNo: pageNo
		}
        
		$("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/api/todos",
          data: pagingData,
          success: function(data) {
            var todos = data;
            $("tbody").empty();
            todos.forEach( function( item, index, array ){
                $("tbody").
                append("<tr> \
                            <td>" + item.todoId + "</td> \
                            <td>" +  item.title + "</td> \
                            <td>" +  item.content + "</td> \
                            <td>" +  item.created + "</td> \
                            <td> \ <button id='show' class='btn btn-info'>보기</button> \
                            		<button id='edit' class='btn btn-warning'>수정</button> \
                           <button id='delete' class='btn btn-danger'>삭제</button> \ </td> \
                        </tr>");
            });
            
          },
          error: function(data) { 
            console.log(data);
            }
        });
	}
});