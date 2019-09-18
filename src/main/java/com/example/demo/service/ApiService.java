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
	
//	public List<Todo> selectTodoList(){
//		return apiMapper.selectTodoList();
//	}
	
	public List<Todo> paging(Pagination page){
		return apiMapper.paging(page);
	}
	
	public List<Todo> findById(Integer id){
		return apiMapper.findById(id);
	}
	
	//pagination
	public Integer countTodo() {
		return apiMapper.countTodo();
	}
	
}
