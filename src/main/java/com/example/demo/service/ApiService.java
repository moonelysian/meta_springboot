package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.ApiMapper;
import com.example.demo.model.Pagination;
import com.example.demo.model.Todo;

@Service
public class ApiService {

	@Autowired
	private ApiMapper apiMapper;
	
	public List<Todo> paging(Pagination page){
		return apiMapper.paging(page);
	}
	
	public List<Todo> findById(Integer id){
		return apiMapper.findById(id);
	}
	
	public Integer createTodo(Todo todo) {
		return apiMapper.createTodo(todo);
	}
	
	public Integer updateTodo(Integer id, Todo todo) {
		return apiMapper.updateTodo(id, todo);
	}
	
	public Integer deleteById(Integer id){
		return apiMapper.deleteById(id);
	}
	
	//pagination
	public Integer countTodo() {
		return apiMapper.countTodo();
	}
	
}
