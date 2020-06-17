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

import com.pictionarizer.model.Word;
import com.pictionarizer.repos.WordRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class WordController {
	
	private WordRepository repository; 
	
	@Autowired
	WordController(WordRepository repository){
		this.repository = repository; 
	}
	
	@RequestMapping(value = "/words", method = RequestMethod.GET)
	public List<Word> getWords(){
		return repository.findAll(); 
	}
	
	@RequestMapping(value = "/words/{id}", method = RequestMethod.GET)
	public Word getWord(@PathVariable("id") int id) {
		return repository.findById(id).get();
	}
	
	@RequestMapping(value = "/words", method = RequestMethod.POST)
	public Word saveWord(@RequestBody Word word) {
		return repository.save(word);
	}
	
	@RequestMapping(value = "/words/{id}", method = RequestMethod.PUT)
	public Word updateWord(@RequestBody Word newWord, @PathVariable int id) {
		Word word = null;
		Optional<Word> optWord = Optional.ofNullable(word);
		optWord = repository.findById(id);
		word = optWord.get();
		
		word.setOwnLangWordName(newWord.getOwnLangWordName());
		word.setTargetLangWordName(newWord.getTargetLangWordName());
		word.setOwnLangExSentence(newWord.getOwnLangExSentence());
		word.setTargetLangExSentence(newWord.getTargetLangExSentence());
		word.setCreatedDate(newWord.getCreatedDate());
		word.setImage(newWord.getImage());
		
		return repository.save(word);
	}
	
	@RequestMapping(value = "/words/{id}", method = RequestMethod.DELETE)
	public void deleteWord(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
}
