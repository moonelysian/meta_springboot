$(document).ready(function(){
	$.ajax({
		type: "GET",
		url:"http://localhost:8080/api/count",
		success: function(data){
			alert(data)
		},
		error: function(error){
			console.log(error);
		}
	});
});