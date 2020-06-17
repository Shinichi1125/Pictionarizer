package com.pictionarizer.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pictionarizer.model.User;
import com.pictionarizer.model.Word;
import com.pictionarizer.repos.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
	
	private UserRepository repository;
	
	@Autowired
	UserController(UserRepository repository){
		this.repository = repository;
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> getUsers(){
		return repository.findAll();
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public User getUser(@PathVariable("id") int id) {
		return repository.findById(id).get();
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public User saveUser(@RequestBody User user) {
		return repository.save(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public User updateUser(@RequestBody User newUser, @PathVariable int id) {
		User user = null;
		Optional<User> optUser = Optional.ofNullable(user);
		optUser = repository.findById(id);
		user = optUser.get();
		
		user.setName(newUser.getName());
		user.setOwnLanguage(newUser.getOwnLanguage());
		user.setTargetLanguage(newUser.getTargetLanguage());
		user.setCountry(newUser.getCountry());
		user.setEmail(newUser.getEmail());
		user.setPassword(newUser.getPassword());
		user.setImage(newUser.getImage());
		user.setDescription(newUser.getDescription());
		
		return repository.save(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
	
}
