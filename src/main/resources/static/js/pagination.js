$(document).ready(function(){
	
	
	var row = $("select option:selected").val();
	makeBar(row);
	
	$('select').change(function(row){
		row = $("select option:selected").val();
		makeBar(row);
	});

	function makeBar(row){
			$.ajax({
			type: "GET",
			url:"http://localhost:8080/api/count",
			success: function(data){
				var pageCnt = Math.ceil(data/row);
				$('.page-item').empty();
				for(var i=0; i<pageCnt; i++){
					var pageNum = '#page'+i;
					var next = i+1;
					$(pageNum).after(
						"<li "+ "id='page"+ next +"'"+" class=\"page-item\">"+
						"<a class=\"page-link\" href=\"#\">"+ next +"</a>" +
						"</li>"
					);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
});