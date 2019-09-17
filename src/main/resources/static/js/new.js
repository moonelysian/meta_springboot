var app = new Vue({
		el: '#form',
		data:{
			'title': '' ,
			'content': ''
		},
		methods:{
			sendPost: function(){
   				$.ajax({
					method:"post",
					url:"http://localhost:8080/api/create",
					data: {
						title: this.title, 
						content: this.content
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
});