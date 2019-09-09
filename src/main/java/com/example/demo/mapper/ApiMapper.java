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
			+ " SELECT * FROM todos "
			+ "</script>")
	public List<Todo> selectTodoList();
	
	@Select(value = "<script>"
			+ " SELECT * FROM todos WHERE todo_id=#{id}"
			+ "</script>")
	public List<Todo> findById(@Param("id") Integer id);
	
	@Insert(value = "<script>"
			+ "INSERT INTO todos (title,content,created) VALUES(#{title}, #{content}, #{created})"
			+ "</script>"
			)
	public Integer createTodo(Todo todo);
	
	@Update(value="<script>"
			+ " UPDATE todos "
			+ " SET title=#{todo.title}, content=#{todo.content}, created=#{todo.created} "
			+ " WHERE todo_id=#{id} "
			+ "</script>"
			)
	public Integer updateTodo(@Param("id") Integer id,Todo todo);
	
	@Delete(value = "<script>"
			+ "DELETE FROM todos WHERE todo_id=#{id}"
			+ "</script>"
			)
	public Integer deleteById(@Param("id") Integer id);
	
	//pagination
	@Select(value = "<script>"
			+ "SELECT COUNT(*) FROM todos"
			+ "</script>"
			)
	public Integer countTodo();
	
	@Select(value="<script>"
			+ " SELECT * FROM todos"
			+ " ORDER BY todo_id"
			+ " LIMIT #{pageSize} OFFSET #{value}"
			+"</script>"
			)
	public List<Todo> paging(Pagination page);
	
}
