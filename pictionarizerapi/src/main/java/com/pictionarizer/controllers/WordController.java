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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	// temporary, experimental destination folder for uploading files 
	private static String UPLOAD_FOLDER = "C://springimage//";
	
	// logger for a debugging purpose
	//private static final Logger LOGGER = LoggerFactory.getLogger(WordController.class);
	
	private WordRepository repository; 
	
	@Autowired
	WordController(WordRepository repository){
		this.repository = repository; 
	}
	
	@RequestMapping(value = "/words", method = RequestMethod.GET)
	public List<Word> getWords(){
		return repository.findAll(); 
	}
	
	@RequestMapping(value = "/word/{id}", method = RequestMethod.GET)
	public Word getWord(@PathVariable("id") int id) {
		return repository.findById(id).get();
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
	
	// converts File's data type so it will be compatible on back-end side
	// front-end (MultipartFile) -> back-end (byte[ ]) -> database (LongBlob)
	Word convertWord(
			int userId,
			String ownLangWordName,
			String targetLangWordName,
			String ownLangExSentence,
			String targetLangExSentence,
			String createdDate,
			MultipartFile image) {	
		
		Word word = new Word(); 	
		
		word.setUserId(userId);
		
		word.setOwnLangWordName(ownLangWordName);
		word.setTargetLangWordName(targetLangWordName);
		word.setOwnLangExSentence(ownLangExSentence);
		word.setTargetLangExSentence(targetLangExSentence);			
		LocalDateTime convertedDate = convertToLDT(createdDate);
		
		word.setCreatedDate(convertedDate);
		
		// needs to be Optional in case the value of the image is null
		// -> prevents NullPointerException in the if clause right below 
		Optional<MultipartFile> imageOpt = Optional.ofNullable(image);
		
		// if the user input includes MultipartFile, assign it in the word object, otherwise do nothing
		if(imageOpt.isPresent()) {
			try {
				word.setImage(image.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
			
		return word;
	}
	
	@RequestMapping(value = "/word", method = RequestMethod.POST)
	public Word saveWord(
			@RequestParam("userId") int userId,
			@RequestParam("ownLangWordName") String ownLangWordName,
			@RequestParam("targetLangWordName") String targetLangWordName,
			@RequestParam("ownLangExSentence") String ownLangExSentence,
			@RequestParam("targetLangExSentence") String targetLangExSentence,
			@RequestParam("createdDate") String createdDate,
			@RequestParam("image") MultipartFile image) {	
		Word word = new Word(); 
		
		// the date and image are LocalDateTime and byte[ ] types respectively, 
		// so the word object needs to be converted before saving in the database 
		word = convertWord(
				userId,
				ownLangWordName, 
				targetLangWordName,
				ownLangExSentence,
				targetLangExSentence,
				createdDate,
				image);
		
		return repository.save(word);
	}
	
	@RequestMapping(value = "/word/{id}", method = RequestMethod.PUT)
	public Word updateWord(
			@RequestParam("userId") int userId,
			@RequestParam("ownLangWordName") String ownLangWordName,
			@RequestParam("targetLangWordName") String targetLangWordName,
			@RequestParam("ownLangExSentence") String ownLangExSentence,
			@RequestParam("targetLangExSentence") String targetLangExSentence,
			@RequestParam("createdDate") String createdDate,
			@RequestParam(value = "image", required = false) MultipartFile image,
			@PathVariable("id") int id) {
		
		Word word = null;
		Optional<Word> optWord = Optional.ofNullable(word);
		optWord = repository.findById(id);
		word = optWord.get();
		
		word = convertWord(
				userId,
				ownLangWordName, 
				targetLangWordName,
				ownLangExSentence,
				targetLangExSentence,
				createdDate,
				image);
		
		Optional<MultipartFile> imageOpt = Optional.ofNullable(image);
		
		// if the user input doesn't include a MultipartFile, assign the existing image data
		// that has been fetched by repository.findById(id) in the beginning of this method
		if(!imageOpt.isPresent()) {
			byte[] wordImage = optWord.get().getImage();
			word.setImage(wordImage);
		}
		
		int wordId = optWord.get().getId();
		word.setId(wordId);
		
		return repository.save(word);
	}
	
	@RequestMapping(value = "/word/{id}", method = RequestMethod.DELETE)
	public void deleteWord(@PathVariable("id") int id) {
		repository.deleteById(id);
	}
	
	// displays an image on the front-end side that is specified by the path <img src={` `}>
	@GetMapping("/word/uploaded-image/{wordId}")
	ResponseEntity<byte[]> wordImage(@PathVariable int wordId){	
		Optional<Word> word = repository.findById(wordId);
		byte[] image = word.get().getImage();
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
	}
	
	// temporary, experimental method to see if image upload works with the local device
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
