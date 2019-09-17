const vm = new Vue({
	el: '#todoList',
	data: {
		'fullList': [],
		'todoId': '',
		'selected': 3
	},
	methods: {
		assignDataTable: function(row, pageNo){
			const self = this;
			const pageData = {
					pageSize: row,
					pageNo: pageNo-1
			}
			$.ajax({
				type: "GET",
				url: "http://localhost:8080/api/todos",
				data: pageData,
				success: function(data){
					self.fullList = data;
				},
				error: function(data){
					console.log(data);
				}
			});
		},
		showButton: function(id){
			$.ajax({
				type:"GET",
				url: "http://localhost:8080/api/todo/"+id,
				success: function(data){
					location.href="http://localhost:8080/todo/"+id;
				}
			})
		},
		editButton: function(id){
			$.ajax({
				type:"GET",
				url: "http://localhost:8080/edit/"+id,
				success: function(data){
					location.href="http://localhost:8080/edit/"+id;
				}
			});
		},
		deleteButton: function(id){
			$.ajax({
				type:"DELETE",
				url: "http://localhost:8080/api/todo/"+id,
				success: function(data){
					alert("삭제되었습니다!")
					location.href="http://localhost:8080";
				}
			});
		},
		pageControll: function(selected){
			pageBar.makeBar(selected);
			pageBar.startNum = 1;
			vm.assignDataTable(selected, pageBar.startNum);
			
		},
		
	}
});

const pageBar = new Vue({
	el: '#bar',
	data:{
		'startNum': 1,
		'current': 1,
		'totalPage': '',
		'maxVisibleButtons': 5
		
	},
	computed:{
		startPage() {
		      if (this.startNum === 1) {
		        return 1;
		      }
		      return this.startNum;
		},
		
		endPage(){
			return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPage)
		},
		
		pages(){
			const range = []
			for(let i= this.startPage; i<= this.endPage; i+=1){
				range.push(i);
			}
			return range;
		}
	},
	methods:{
		goFirst: function(){
			const firstPage = 1;
			vm.assignDataTable(vm.selected, firstPage);
			this.startNum = firstPage;
			this.current = firstPage;
		},
		
		changePage: function(currentPage){
			vm.assignDataTable(vm.selected, currentPage);
			this.current = currentPage;
		},
		
		goLast: function(){
			const lastPage = this.totalPage;
			vm.assignDataTable(vm.selected, lastPage);
			this.startNum = lastPage;
			this.current = lastPage;
		},
		
		goPre: function(){
			var pre = this.startPage;
			console.log(pre);
			if(pre >= this.maxVisibleButtons-1){
				vm.assignDataTable(vm.selected, (pre-1));
				if(pre - this.maxVisibleButtons<1){
					this.startNum = 1;
					this.current = 1;
				}
				else{
					this.startNum = pre - this.maxVisibleButtons;
					this.current = pre-1;
				}	
			}
		},
		
		goNext: function(){
			var next = this.endPage;
			if( next < this.totalPage){
				vm.assignDataTable(vm.selected, (next+1));
				this.startNum = next+1;
				this.current = next+1;
			}
		},
		
		makeBar: function(selected){
			const self = this;
			$.ajax({
				type: "GET",
				url:"http://localhost:8080/api/count",
				success: function(data){
					self.totalPage = Math.ceil(data/selected);
					if(self.totalPage > self.maxVisibleButtons)
						return self.pages;
					else
						self.pages = self.totalPage;
				}
			});
		}
	}
});

vm.assignDataTable(vm.selected,1);
pageBar.makeBar(vm.selected);



//$(document).ready(function(){
	
//	assignDataToTable();
    
//	$('table').on('click', 'button[id="show"]', function(e){
//		var postId = $(this).closest('tr').children('td:first').text();
//		location.href="http://localhost:8080/todo/"+postId;
//
//	})
//	
//	$('table').on('click', 'button[id="edit"]', function(e){
//		
//		var postId = $(this).closest('tr').children('td:first').text();
//	    
//	    $.ajax({
//	    	type:"GET",
//	        url:"http://localhost:8080/edit/"+postId,
//	        data: postId,
//	        success: function(data){
//	        	location.href="http://localhost:8080/edit/"+postId;
//	            },
//	            error: function(err) {  
//	                console.log(err);
//	                alert(err);
//	            }
//	        });
//	    })

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