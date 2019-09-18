package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Pagination;
import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import com.example.demo.service.ApiService;

@RestController
@RequestMapping(value="/api")
public class ApiController {
	
	@Autowired
	private ApiService apiService;
	
	@Autowired
	TodoRepository todoRepository;
	
	@GetMapping("/todos")
	public List<Todo> paging(@ModelAttribute Pagination page){
		int num = page.getPageNo();
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
	public Todo create(@ModelAttribute Todo todo) {
		return todoRepository.save(todo);
	}
	
	@PutMapping("/update")
	public Todo updateTodo(@ModelAttribute Todo todo) {
		return todoRepository.save(todo);
	}
	
	@DeleteMapping("/todo")
	public void deleteTodo(@ModelAttribute Todo todo) {
		todoRepository.delete(todo);
	}
	
	//pagination
	@GetMapping("/count")
	public Integer countTodo(){
		return apiService.countTodo();
	}
}
