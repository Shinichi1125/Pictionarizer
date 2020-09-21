package com.pictionarizer.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pictionarizer.model.FollowerRelation;
import com.pictionarizer.repos.FollowerRelationRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FollowerController {
	
	private FollowerRelationRepository repository;
	
	@Autowired
	FollowerController(FollowerRelationRepository repository){
		this.repository = repository;
	}
	
	@RequestMapping(value = "/followers", method = RequestMethod.GET)
	public List<FollowerRelation> getFollowerRelations(){
		return repository.findAll();
	}
	
	@RequestMapping(value = "/follower/{id}", method = RequestMethod.GET)
	public FollowerRelation getFollowerRelation(@PathVariable("id") int id){
		return repository.findById(id).get();
	}
	
}
