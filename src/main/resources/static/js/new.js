var app = new Vue({
		el: '#form',
		data:{
			'title': '' ,
			'content': ''
		},
		methods:{
			sendPost: function(){
				if(app.checkRequire()){
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
		},
		checkRequire: function(){
			if(this.title!=''){
				if(this.content!=''){
					return true;
				}
				else{
					alert("내용을 입력하세요!");
				}
			}
			else{
				alert("제목을 입력하세요!");
			}
		}
	}
});