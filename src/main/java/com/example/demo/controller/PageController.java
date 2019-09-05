package com.example.demo.controller;

import java.time.LocalDate;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.model.Todo;

@Controller
public class PageController {
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/new")
	public String writeTodo(Model model) {
		model.addAttribute("todo",new Todo());
		return "new";
	}
	
	@PostMapping("/new")
	public String saveTodo(@ModelAttribute Todo todo) {
		todo.setCreated(LocalDate.now());
		return "/test";
	}
	
	
	@GetMapping("todo")
	public String show(Model model) {
		Todo todo = new Todo("test title","test content", LocalDate.now());
		model.addAttribute("todo",todo);
		return "todo";
	}
	
	
	@GetMapping("edit/{id}")
	public String edit(Model model) {
		Todo todo = new Todo("test title","test content",LocalDate.now());
		model.addAttribute("todo",todo);
		return "edit";
	}
	
}
