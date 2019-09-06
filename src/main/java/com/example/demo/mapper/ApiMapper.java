package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

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
	
	@Delete(value = "<script>"
			+ "DELETE FROM todos WHERE todo_id=#{id}"
			+ "</script>"
			)
	public Integer deleteById(@Param("id") Integer id);
}
