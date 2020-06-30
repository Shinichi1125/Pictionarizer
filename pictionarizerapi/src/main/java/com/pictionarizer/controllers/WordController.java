package com.pictionarizer.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.pictionarizer.model.Word;
import com.pictionarizer.repos.WordRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class WordController {
	
	// temporary experimental destination folder to upload the files 
	private static String UPLOAD_FOLDER = "C://springimage//";
	
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
	//public Word saveWord(@RequestBody Word word) {
	public Word saveWord(@RequestParam("ownLangWordName") String ownLangWordName,
								  @RequestParam("targetLangWordName") String targetLangWordName,
								  @RequestParam("ownLangExSentence") String ownLangExSentence,
								  @RequestParam("targetLangExSentence") String targetLangExSentence,
								  @RequestParam("createdDate") String createdDate,
								  @RequestParam("image") MultipartFile image) {	
		Word word = new Word(); 
		word.setOwnLangWordName(ownLangWordName);
		word.setTargetLangWordName(targetLangWordName);
		word.setOwnLangExSentence(ownLangExSentence);
		word.setTargetLangExSentence(targetLangExSentence);	
		
		ZonedDateTime zonedDateTime = ZonedDateTime.parse(createdDate); 
		ZoneId finlandZone = ZoneId.of("Europe/Helsinki");
		ZonedDateTime finlandZoned = zonedDateTime.withZoneSameInstant(finlandZone);
		LocalDateTime finlandLocal = finlandZoned.toLocalDateTime();
			
		word.setCreatedDate(finlandLocal);
		try {
			word.setImage(image.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
	
	@PostMapping("/uploadFile")
    public String fileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
    	if(file.isEmpty()) {
    		return "api/error";
    	}
    	
    	try {
    		// read and write the file to the selected location
    		byte[] bytes = (file).getBytes();
    		Path path = Paths.get(UPLOAD_FOLDER + (file).getOriginalFilename());
    		Files.write(path, bytes);
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    	
    	return "redirect:/api";
    }
}
