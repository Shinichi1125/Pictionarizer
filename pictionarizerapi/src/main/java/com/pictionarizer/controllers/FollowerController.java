package com.pictionarizer.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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
				//LOGGER.info("followerId: " + followerId);
				fetchedUser = userRepository.findById(followerId).get();
				userList.add(fetchedUser);
			}
		}	
		
		return userList;
	}
	
	// fetch the people whom the user is following
	@RequestMapping(value = "/followings/{id}", method = RequestMethod.GET)
	public List<User> getFollowings(@PathVariable("id") int id){
		
		List<FollowerRelation> followingIdList = repository.findAllByFollowerId(id);
		List<User> userList = new ArrayList<User>();
		User fetchedUser = new User();
		int followingId = 0;
		
		if(followingIdList.size() > 0) {
			for(FollowerRelation fr: followingIdList) {
				followingId = fr.getFolloweeId();
				fetchedUser = userRepository.findById(followingId).get();
				userList.add(fetchedUser);
			}
		}
		
		return userList;
	}
	
	// fetch the number of followers the user has
	@RequestMapping(value = "/no-of-followers/{id}", method = RequestMethod.GET)
	public int getNoOfFollowers(@PathVariable("id") int id){
		int noOfFollowers;
		List<FollowerRelation> followerIdList = repository.findAllByFolloweeId(id);
		noOfFollowers = followerIdList.size();
		return noOfFollowers;
	}
	
	// fetch the number of people the user is following
	@RequestMapping(value = "/no-of-followings/{id}", method = RequestMethod.GET)
	public int getNoOfFollowings(@PathVariable("id") int id){
		int noOfFollowings;
		List<FollowerRelation> followingIdList = repository.findAllByFollowerId(id);
		noOfFollowings = followingIdList.size();
		return noOfFollowings; 
	}
	
	// check if you are followed by a particular user 
	@RequestMapping(value = "/is-followed", method = RequestMethod.GET)
	public boolean isFollowed(
			@RequestParam("userId") int userId,
			@RequestParam("followerId") int followerId,
			@RequestParam("followeeId") int followeeId) {
		
		boolean result = false; 
		FollowerRelation followerRelation = repository.findByFollowerIdAndFolloweeId(followerId, followeeId);
		
		Optional<FollowerRelation> frOpt = Optional.ofNullable(followerRelation);
		
		if(frOpt.isPresent()) {
			if(followerRelation.getFolloweeId() == userId) {
				result = true; 
			}	
		}
		
		return result; 
	}
	
	// check if you are following a particular user 
	@RequestMapping(value = "/is-following", method = RequestMethod.GET)
	public boolean isFollowing(
			@RequestParam("userId") int userId,
			@RequestParam("followerId") int followerId,
			@RequestParam("followeeId") int followeeId) {
		
		boolean result = false; 
		FollowerRelation followerRelation = repository.findByFollowerIdAndFolloweeId(followerId, followeeId);
		
		Optional<FollowerRelation> frOpt = Optional.ofNullable(followerRelation);
		
		if(frOpt.isPresent()) {
			if(followerRelation.getFollowerId() == userId) {
				result = true; 
			}	
		}
		
		return result; 
	}
	
	@RequestMapping(value = "/follow", method = RequestMethod.POST)
	public FollowerRelation saveFollowRelation(
			@RequestParam("userId") int userId,
			@RequestParam("followerId") int followerId,
			@RequestParam("followeeId") int followeeId) {
		
		FollowerRelation followerRelation = repository.findByFollowerIdAndFolloweeId(followerId, followeeId);	
		Optional<FollowerRelation> frOpt = Optional.ofNullable(followerRelation);
		
		if(frOpt.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"This followerRelation already exists") ;
		} else {
			followerRelation = new FollowerRelation();
		}
		
		followerRelation.setFollowerId(followerId);
		followerRelation.setFolloweeId(followeeId);		
		
		return repository.save(followerRelation);
	}
	
	@RequestMapping(value = "/unfollow", method = RequestMethod.DELETE)
	public void deleteFollowerRelation(
			@RequestParam("userId") int userId,
			@RequestParam("followerId") int followerId,
			@RequestParam("followeeId") int followeeId) {
		
		FollowerRelation followerRelation = repository.findByFollowerIdAndFolloweeId(followerId, followeeId);	
		Optional<FollowerRelation> frOpt = Optional.ofNullable(followerRelation);
		
		if(!frOpt.isPresent()) {
			return;
		}
		repository.deleteById(followerRelation.getPairId());
	}
}
