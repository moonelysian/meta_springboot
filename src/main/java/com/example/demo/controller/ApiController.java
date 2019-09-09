package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Pagination;
import com.example.demo.model.Todo;
import com.example.demo.service.ApiService;

@RestController
@RequestMapping(value="/api")
public class ApiController {
	
	@Autowired
	private ApiService apiService;
	
	@GetMapping("/todos")
	public List<Todo> paging(@ModelAttribute Pagination page){
		int num = page.getPageNo()-1;
		int size = page.getPageSize();
		int value = num*size;		
		
		page.setValue(value);
		return apiService.paging(page);
	}
	
	@GetMapping("/todo/{id}")
	public List<Todo> showing(@PathVariable(value="id") Integer id) {
		return apiService.findById(id);
	}
	
	@PostMapping("/create")
	public Integer create( @ModelAttribute Todo todo ) {
		return apiService.createTodo(todo);
	}
	
	@PutMapping("/update/{id}")
	public Integer updateTodo(@PathVariable(value="id") Integer id,@ModelAttribute Todo todo) {
		return apiService.updateTodo(id, todo);
	}
	
	@DeleteMapping("/todo/{id}")
	public Integer deleteTodo(@PathVariable(value="id") Integer id) {
		return apiService.deleteById(id);
	}
	
	//pagination
	@GetMapping("/count")
	public Integer countTodo(){
		return apiService.countTodo();
	}
}
