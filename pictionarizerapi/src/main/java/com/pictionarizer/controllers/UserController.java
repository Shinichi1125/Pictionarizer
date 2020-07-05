package com.pictionarizer.controllers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	// converts File's data type so it will be compatible on back-end side
	// front-end (MultipartFile) -> back-end (byte[ ]) -> database (LongBlob)
	User convertUser(
			String name,
			String ownLanguage,
			String targetLanguage,
			String country,
			String email,
			String password,
			MultipartFile image,
			String description) {	
		
		User user = new User(); 	
		user.setName(name);
		user.setOwnLanguage(ownLanguage);
		user.setTargetLanguage(targetLanguage);
		user.setCountry(country);
		user.setEmail(email);
		user.setPassword(password);
		user.setDescription(description);
		
		Optional<MultipartFile> imageOpt = Optional.ofNullable(image);
		
		if(imageOpt.isPresent()) {
			try {
				user.setImage(image.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return user;
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public User saveUser(
			@RequestParam("name") String name,
			@RequestParam("ownLanguage") String ownLanguage,
			@RequestParam("targetLanguage") String targetLanguage,
			@RequestParam("country") String country,
			@RequestParam("email") String email,
			@RequestParam("password") String password,
			@RequestParam("image") MultipartFile image,
			@RequestParam("description") String description) {
				
		User user = new User();
		
		user = convertUser(
					name,
					ownLanguage,
					targetLanguage,
					country,
					email,
					password,
					image,
					description);
		
		return repository.save(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public User updateUser(
			@RequestParam("name") String name,
			@RequestParam("ownLanguage") String ownLanguage,
			@RequestParam("targetLanguage") String targetLanguage,
			@RequestParam("country") String country,
			@RequestParam("email") String email,
			@RequestParam("password") String password,
			@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam("description") String description,
			@PathVariable("id") int id) {
		
		User user = null;
		Optional<User> optUser = Optional.ofNullable(user);
		optUser = repository.findById(id);
		user = optUser.get();
		
		user = convertUser(
				name,
				ownLanguage,
				targetLanguage,
				country,
				email,
				password,
				image,
				description);
		
		Optional<MultipartFile> imageOpt = Optional.ofNullable(image);
		
		if(!imageOpt.isPresent()) {
			byte[] userImage = optUser.get().getImage();
			user.setImage(userImage);
		}
		
		int userId = optUser.get().getId();
		user.setId(userId);
			
		return repository.save(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
	
	@GetMapping("/users/uploaded-image/{userId}")
	ResponseEntity<byte[]> userImage(@PathVariable int userId){	
		Optional<User> user = repository.findById(userId);
		byte[] image = user.get().getImage();
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
	}
	
}
