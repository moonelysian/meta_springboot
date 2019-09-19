package com.example.demo.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="todos")
@Data
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String todoId;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column
	private LocalDate created = LocalDate.now();
	
}
