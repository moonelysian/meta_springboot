package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping("/")
	public String index() {
		return "index";
		
	}
	
	@GetMapping("/new")
	public String add() {
		return "new";
	}
	
}
