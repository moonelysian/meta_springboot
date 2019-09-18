const path = $(location).attr('pathname');
	const postId = path.split('/').pop();
	const app = new Vue({
		el: '#form',
		data:{
			'todo': []
		},
		methods:{
			assignData: function(postId){
				const self = this;
				$.ajax({
	 				type:"GET",
	 				url: "http://localhost:8080/api/todo/"+postId,
	 				success: function(data){
	 					self.todo = data[0];
	 				},
	 				error: function(data){
	 					console.log(data);
	 				}
	 			});
			},
			
			updateTodo: function(){
				const self = this
   				$.ajax({
					method:"PUT",
					url:"http://localhost:8080/api/update/",
					data: {
						'todoId': self.todo.toId,
						'title': self.todo.title,
						'content': self.todo.content
					},
					success: function(data){   
						location.href="http://localhost:8080/";
			        },
			        error: function(err) {
			        	console.log(err);
			        	alert(err);
			        }
			    });
			}
		}
	})
	
	app.assignData(postId);
// 	$(document).ready(function(){
// 		var path = $(location).attr('pathname');
// 		var postId = path.split('/').pop();
// 		assignData(postId);

// 		$("#update").click(function(){
// 			var edited = {
// 					title: $("#title").val(),
// 					content: $("#content").val(),
// 				}
			
// 			$.ajax({
// 				type:"PUT",
// 				url: "http://localhost:8080/api/update/"+postId,
// 				data: edited,
// 				success: function(data){
// 					location.href="http://localhost:8080/";
// 				},
// 				error: function(data){
// 					console.log(data);
// 				}
// 			});
// 		});
		
// 		function assignData(postId){
// 			$.ajax({
// 				type:"GET",
// 				url: "http://localhost:8080/api/todo/"+postId,
// 				success: function(data){
// 					data.forEach(function(item,index,array){
// 						$("#title").val(item.title);
// 						$("textarea").append(item.content);
// 					});
// 				},
// 				error: function(data){
// 					console.log(data);
// 				}
// 			});
// 		}
// 	});