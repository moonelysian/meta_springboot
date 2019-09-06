package com.example.demo.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Todo {
	
	private String todoId;
	
	private String title;
	
	private String content;
	
	private LocalDate created = LocalDate.now();
	
}
