const vm = new Vue({
	el: '#todoList',
	data: {
		'fullList': [],
		'todoId': '',
		'selected': 3,
		'searchList':[],
		'current':1
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
					const searchResult = self.searchList;
					const selected = self.selected;
					
					if(self.searchList.length != 0){
						self.fullList = searchResult.slice(0,selected);
						
						if(self.current!=1){
							const num = self.current-1;
							self.fullList = searchResult.slice(num*selected, (num+1)*selected);
						}
					}
					else{
						self.fullList = data;
					}
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
				data: {
					'todoId': id
				},
				url: "http://localhost:8080/api/todo",
				success: function(data){
					alert("삭제되었습니다!");
					location.href="http://localhost:8080";
				}
			});
		},
		pageControll: function(selected){
			pageBar.makeBar(selected);
			pageBar.startNum = 1;
			vm.assignDataTable(selected, pageBar.startNum);
			
		},
		search: function(data){
			this.searchList = data;
			vm.assignDataTable(vm.selected,1);
			pageBar.makeBar(vm.selected);
		}
	}
});

const pageBar = new Vue({
	el: '#bar',
	data:{
		'startNum': 1,
		'current': 1,
		'totalPage': '',
		'maxVisibleButtons': 5,		
	},
	computed:{
		startPage() {
		      if (this.startNum === 1) {
		        return 1;
		      }
		      return this.startNum;
		},
		
		endPage(){
			return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPage);
		},
		
		pages(){
			const range = []
			for(let i= this.startPage; i<= this.endPage; i+=1){
				range.push(i);
			}
			return range;
		},
		
		pageCnt(){
			return Math.ceil(this.totalPage/this.maxVisibleButtons);
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
			this.current = currentPage;
			vm.current = currentPage;
			vm.assignDataTable(vm.selected, currentPage);
		},
		
		goLast: function(){
			const lastPage = this.totalPage;
			const maxButton = this.maxVisibleButtons;
			const check = (this.pageCnt-1)*maxButton + 1;
			
			if(check < lastPage){
				this.startNum = check;
				this.current = check;
			}
			else{
				this.startNum = lastPage;
				this.current = lastPage;
			}
			
			vm.assignDataTable(vm.selected, this.startNum);
		},
		
		goPre: function(){
			const pre = this.startPage;
			
			if(pre >= this.maxVisibleButtons-1){
				vm.assignDataTable(vm.selected, (pre-1));
				if( pre-this.maxVisibleButtons < 1){
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
			const next = this.endPage;
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
					const searchList = vm.searchList;
					if(searchList.length != 0){
						self.totalPage = Math.ceil(searchList.length/selected);
						self.current = 1;
					}
					else{
						self.totalPage = Math.ceil(data/selected);
						self.current = 1;
					}
					
					if(self.totalPage > self.maxVisibleButtons){
						return self.pages;
					}
					else
						self.pages = self.totalPage;
				}
			});
		}
	}
});

const search = new Vue({
	el: '#search',
	data: {
		'title':''
	},
	methods:{
		searchByTitle: function(){
			$.ajax({
				method:"GET",
				url:"http://localhost:8080/api/search",
				data: {
					title: this.title
				},
				success: function(data){
					if(data.length == 0){
						alert("찾는 제목이 없습니다.");
						location.href="http://localhost:8080";
					}
					else{
						vm.search(data);
					}
			     },
			     error: function(err) {
			        console.log(err);
			        alert(err);
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