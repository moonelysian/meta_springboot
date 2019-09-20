package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.demo.model.Pagination;
import com.example.demo.model.Todo;

@Mapper
public interface ApiMapper {
		
	@Select(value = "<script>"
			+ " SELECT * FROM todos WHERE todo_id=#{id}"
			+ "</script>")
	public List<Todo> findById(@Param("id") Integer id);

	@Select(value="<script>"
			+ " SELECT * FROM todos"
			+ " ORDER BY todo_id DESC"
			+ " LIMIT #{pageSize} OFFSET #{value}"
			+ "</script>"
			)
	public List<Todo> paging(Pagination page);
	
	@Select(value = "<script>"
			+ " SELECT * FROM todos"
			+ " WHERE title LIKE"
			+ " '%${title}%'"
			+ " ORDER BY todo_id DESC"
			+ " </script>"
			)
	public List<Todo> search(@Param("title") String title);

//	@Select(value = "<script>"
//			+ "SELECT COUNT(*) FROM todos"
//			+ "</script>"
//			)
//	public Integer countTodo();
	
}
