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
					if(this.content!='')
						return true;
					else
						alert("내용을 입력하세요!");
				}
			
				else
					alert("제목을 입력하세요!");
			},
			content_typing: function(data){    	
	            this.max_length(data, 500);
	        },
	        max_length: function(data, len){
	        	const val = data.target.value;
	        	if(val.length > len){
	        		const msg = "최대 입력 길이를 초과하셨습니다!";
	        		alert(msg);
	        		this.content = val.substring(0,len);
	        		
	        	}
	        }
		}
	});