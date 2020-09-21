package com.pictionarizer.controllers;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pictionarizer.model.FollowerRelation;
import com.pictionarizer.model.User;
import com.pictionarizer.repos.FollowerRelationRepository;
import com.pictionarizer.repos.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FollowerController {
	
	private FollowerRelationRepository repository;
	private UserRepository userRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FollowerController.class);
	
	@Autowired
	FollowerController(FollowerRelationRepository repository, UserRepository userRepository){
		this.repository = repository;
		this.userRepository = userRepository;
	}
	
	@RequestMapping(value = "/followers", method = RequestMethod.GET)
	public List<FollowerRelation> getFollowerRelations(){
		return repository.findAll();
	}
	
	// fetch the followers (people who are following the user)
	@RequestMapping(value = "/followers/{id}", method = RequestMethod.GET)
	public List<User> getFollowers(@PathVariable("id") int id){
		
		List<FollowerRelation> followerIdList = repository.findAllByFolloweeId(id);
		List<User> userList = new ArrayList<User>();
		User fetchedUser = new User();
		int followerId = 0;
		
		if(followerIdList.size() > 0) {
			for(FollowerRelation fr: followerIdList) {
				followerId = fr.getFollowerId();
				LOGGER.info("followerId: " + followerId);
				fetchedUser = userRepository.findById(followerId).get();
				userList.add(fetchedUser);
			}
		}	
		
		return userList;
	}
	
	// fetch the people whom the user is following
	@RequestMapping(value = "/followings/{id}", method = RequestMethod.GET)
	public List<FollowerRelation> getFollowings(@PathVariable("id") int id){
		return repository.findAllByFollowerId(id);
	}
	
	@RequestMapping(value = "/follower", method = RequestMethod.POST)
	public FollowerRelation createFollowerRelation(
			@RequestParam("followerId") int followerId,
			@RequestParam("followeeId") int followeeId) {
		
		FollowerRelation followerRelation = new FollowerRelation();
		
		followerRelation.setFollowerId(followerId);
		followerRelation.setFolloweeId(followeeId);
		
		return repository.save(followerRelation);
	}
	
	// helper method that is only to be used in Postman experiment 
	@RequestMapping(value = "/follower/{id}", method = RequestMethod.DELETE)
	public void deleteFollowerRelation(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
}
