package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PageController {
	
	@RequestMapping("/test")
	@ResponseBody
	
	
	@GetMapping("/new")
	public String write() {
		return "new";
	}
	
	@GetMapping("todo")
	public String show() {
		return "todo";
	}
	
	
	@GetMapping("edit")
	public String edit() {
		return "edit";
	}
	
}
