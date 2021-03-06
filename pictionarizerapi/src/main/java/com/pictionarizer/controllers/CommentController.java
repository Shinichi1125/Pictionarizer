package com.pictionarizer.controllers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.pictionarizer.controllers.UserController.Error;
import com.pictionarizer.model.Comment;
import com.pictionarizer.model.LikeRelation;
import com.pictionarizer.model.User;
import com.pictionarizer.model.Word;
import com.pictionarizer.repos.CommentRepository;
import com.pictionarizer.repos.UserRepository;
import com.pictionarizer.repos.WordRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CommentController {
	
	private CommentRepository repository;
	private WordRepository wordRepository;
	
	private int commentMaxLength = 255;
	
	@Autowired
	CommentController(CommentRepository repository, WordRepository wordRepository){
		this.repository = repository; 
		this.wordRepository = wordRepository; 	
	}
	
	// fetch the comments for the particular word
	@RequestMapping(value = "/comments/{id}", method = RequestMethod.GET)
	public List<Comment> getComments(@PathVariable("id") int id){	
		return repository.findAllByWordId(id);
	}	
	
	// fetch the number of likes the word has
	@RequestMapping(value = "/no-of-comments/{id}", method = RequestMethod.GET)
	public int getNoOfComments(@PathVariable("id") int id){
		int noOfComments;
		List<Comment> commentList = repository.findAllByWordId(id);
		noOfComments = commentList.size();
		return noOfComments;
	}
	
	public List<Word> reverseWordArrayList(List<Word> alist) { 
        List<Word> revArrayList = new ArrayList<Word>(); 
        for (int i = alist.size() - 1; i >= 0; i--) { 
            revArrayList.add(alist.get(i)); 
        } 
        return revArrayList; 
    } 	
	
	// fetch the words for the user commented
	@RequestMapping(value = "/commented-words/{id}", method = RequestMethod.GET)
	public List<Word> getCommentedWords(@PathVariable("id") int id){	
		
		List<Comment> commentList = repository.findAllByUserId(id);
		List<Word> wordList = new ArrayList<Word>(); 
		ArrayList<Integer> wordIdList = new ArrayList<Integer>();
		boolean contains = false; 
		Word word = new Word();
		Optional<Word> wordOpt = Optional.ofNullable(word);
		
		if(commentList.size() > 0) {
			for(Comment comment: commentList) {
				contains = wordIdList.contains(comment.getWordId());
				if(!contains) {
					wordOpt = wordRepository.findById(comment.getWordId());
					if(wordOpt.isPresent()) {
						word = wordOpt.get();
						wordList.add(word);
						wordIdList.add(word.getId());
					}
				}
			}
		}
		
		wordList = reverseWordArrayList(wordList);
		
		return wordList;
	}	
	
	// converts Date's data type so that it will be compatible on back-end side
	// front-end (ISO String) -> back-end (LocalDateTime) 
	LocalDateTime convertToLDT(String createdDate) {	
		ZonedDateTime zonedDateTime = ZonedDateTime.parse(createdDate); 
		ZoneId zone = ZoneId.of("Europe/Helsinki");
		ZonedDateTime zoned = zonedDateTime.withZoneSameInstant(zone);
		LocalDateTime localDateTime = zoned.toLocalDateTime();		
		return localDateTime; 
	}	
	
	public class Error {
		String message; 	
		public Error(String message) {
			this.message = message; 
		}
		public String getMessage() {
			return message; 
		}
	}
	
	@RequestMapping(value = "/comment", method = RequestMethod.POST)
	public ResponseEntity<?> saveComment(
			@RequestParam("wordId") int wordId,
			@RequestParam("userId") int userId,
			@RequestParam("text") String text,
			@RequestParam("date") String date) {	
		
		if(text.length() > commentMaxLength) {
			return new ResponseEntity<>(
					new Error("Your comment must not be longer than " + String.valueOf(commentMaxLength) + " characters"),  
					HttpStatus.BAD_REQUEST
			);
		}
		
		Comment comment = new Comment(); 
		
		// the date is LocalDateTime type, 
		// so the it needs to be converted before saving in the database 
		LocalDateTime convertedDate = convertToLDT(date);
		
		comment.setWordId(wordId);
		comment.setUserId(userId);
		comment.setText(text);
		comment.setDate(convertedDate);
		
		comment = repository.save(comment);
		
		return new ResponseEntity<>(comment, HttpStatus.OK);
	}	
	
	@RequestMapping(value = "/comment/{id}", method = RequestMethod.DELETE)
	public void deleteComment(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
}
