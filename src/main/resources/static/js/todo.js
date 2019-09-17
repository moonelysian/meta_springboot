const path = $(location).attr('pathname');
	
const app = new Vue({
	el: '#todo',
	data:{
		'todoList' : [],
	},
	methods:{
		getPost: function(data){
			const self = this;
			$.ajax({
				type:"GET",
		 		url:"http://localhost:8080/api/"+path,
		 		success: function(data){
		 			self.todoList = data[0];
		 		},
		 		error: function(err) {  
		 			console.log(err);
		 			alert(err);
		 		}
		 	});
		} ,
		editPost: function(){
			const self = this;
			location.href="http://localhost:8080/edit/"+self.todoList.todoId;
		}
	}
});

app.getPost();
// $(document).ready(function(){
// 		var path = $(location).attr('pathname');
// 		$.ajax({
// 			type:"GET",
// 			url:"http://localhost:8080/api/"+path,
// 			success: function(data){
// 				data.forEach(function (item, index, arry){
// 					$("#todo").
// 					append( "<h4 id='postId'>Post Id: " + item.todoId + "</h4>"+
// 							"<h3>" + item.title + "</h3>" +
// 							"<span>Reported Date:" + item.created + "</span></br></br>" +
// 							"<p>" + item.content + "</p>" );
					
// 					$('#buttons').on('click', 'button[id="edit"]', function(e){
// 						location.href="http://localhost:8080/edit/" + item.todoId;
// 					})
// 				});
// 			},
// 			error: function(err) {  
// 				console.log(err);
// 				alert(err);
// 			}
// 		});
// })