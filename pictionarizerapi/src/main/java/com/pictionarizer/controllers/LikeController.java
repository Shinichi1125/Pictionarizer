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
import org.springframework.web.server.ResponseStatusException;

import com.pictionarizer.model.FollowerRelation;
import com.pictionarizer.model.LikeRelation;
import com.pictionarizer.model.User;
import com.pictionarizer.model.Word;
import com.pictionarizer.repos.LikeRelationRepository;
import com.pictionarizer.repos.UserRepository;
import com.pictionarizer.repos.WordRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class LikeController {
	
	private LikeRelationRepository repository;
	private UserRepository userRepository;
	private WordRepository wordRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LikeController.class);
	
	@Autowired
	LikeController(LikeRelationRepository repository, UserRepository userRepository, WordRepository wordRepository){
		this.repository = repository; 
		this.userRepository = userRepository;
		this.wordRepository = wordRepository; 
	}
	
	// fetch the users who liked the word
	@RequestMapping(value = "/likers/{id}", method = RequestMethod.GET)
	public List<User> getLikers(@PathVariable("id") int id){
		
		List<LikeRelation> userIdList = repository.findAllByWordId(id);
		List<User> userList = new ArrayList<User>();
		User fetchedUser = new User();
		int userId = 0;
		
		if(userIdList.size() > 0) {
			for(LikeRelation lr: userIdList) {
				userId = lr.getUserId();
				//LOGGER.info("userId: " + userId);
				fetchedUser = userRepository.findById(userId).get();
				userList.add(fetchedUser);
			}
		}	
		
		return userList;
	}
	
	// fetch the words the user liked
	@RequestMapping(value = "/words-liked/{id}", method = RequestMethod.GET)
	public List<Word> getWordsLiked(@PathVariable("id") int id){
		
		List<LikeRelation> wordIdList = repository.findAllByUserId(id);
		List<Word> wordList = new ArrayList<Word>();
		Word fetchedWord = new Word();
		int wordId = 0;
		
		if(wordIdList.size() > 0) {
			for(LikeRelation lr: wordIdList) {
				wordId = lr.getWordId();
				fetchedWord = wordRepository.findById(wordId).get();
				wordList.add(fetchedWord);
			}
		}
		
		return wordList;
	}
	
	// fetch the number of likes the word has
	@RequestMapping(value = "/no-of-likes/{id}", method = RequestMethod.GET)
	public int getNoOfLikes(@PathVariable("id") int id){
		int noOfLikes;
		List<LikeRelation> userIdList = repository.findAllByWordId(id);
		noOfLikes = userIdList.size();
		return noOfLikes;
	}
	
	// fetch the number of words the user liked
	@RequestMapping(value = "/no-of-liked-words/{id}", method = RequestMethod.GET)
	public int getNoOfLikedWords(@PathVariable("id") int id){
		int noOfLikedWords;
		List<LikeRelation> wordIdList = repository.findAllByUserId(id);
		noOfLikedWords = wordIdList.size();
		return noOfLikedWords; 
	}
	
	// check if the word is already liked  
	@RequestMapping(value = "/is-liked", method = RequestMethod.GET)
	public boolean isLiked(
			@RequestParam("userId") int userId,
			@RequestParam("likeUserId") int likeUserId,
			@RequestParam("wordId") int wordId) {
		
		boolean result = false; 
		LikeRelation likeRelation = repository.findByUserIdAndWordId(likeUserId, wordId);
		
		Optional<LikeRelation> lrOpt = Optional.ofNullable(likeRelation);
		
		if(lrOpt.isPresent()) {
			if(likeRelation.getUserId() == userId) {
				result = true; 
			}	
		}
		
		return result; 
	}	
	
	@RequestMapping(value = "/like", method = RequestMethod.POST)
	public LikeRelation saveLikeRelation(
			@RequestParam("userId") int userId,
			@RequestParam("likeUserId") int likeUserId,
			@RequestParam("wordId") int wordId) {
		
		LikeRelation likeRelation = repository.findByUserIdAndWordId(likeUserId, wordId);
		Optional<LikeRelation> lrOpt = Optional.ofNullable(likeRelation);
		
		if(lrOpt.isPresent()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"This likeRelation already exists") ;
		} else {
			likeRelation = new LikeRelation();
		}
		
		likeRelation.setUserId(likeUserId);
		likeRelation.setWordId(wordId);		
		
		return repository.save(likeRelation);
	}	

	@RequestMapping(value = "/unlike", method = RequestMethod.DELETE)
	public void deleteLikeRelation(
			@RequestParam("userId") int userId,
			@RequestParam("likeUserId") int likeUserId,
			@RequestParam("wordId") int wordId) {
		
		LikeRelation likeRelation = repository.findByUserIdAndWordId(likeUserId, wordId);
		Optional<LikeRelation> lrOpt = Optional.ofNullable(likeRelation);
		
		if(!lrOpt.isPresent()) {
			return;
		}
		repository.deleteById(likeRelation.getLikeId());
	}	

}
