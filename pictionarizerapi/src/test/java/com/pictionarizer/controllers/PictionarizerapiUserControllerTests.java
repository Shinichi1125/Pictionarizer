//package com.pictionarizer.controllers;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.ArrayList;
//import java.util.Base64;
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.Optional; 
//
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.mockito.stubbing.OngoingStubbing;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import com.pictionarizer.model.User;
//import com.pictionarizer.repos.UserRepository;
//
//
//@ExtendWith(MockitoExtension.class)
////@ExtendWith(SpringExtension.class)
////@WebMvcTest
//@DisplayName("Unit test for UserController")
//public class PictionarizerapiUserControllerTests {
//	
//	@Mock  //Bean  //Mock class object
//	private UserRepository repository;
//	
//	@Autowired
//	MockMvc mockMvc;
//	
//	@Test 
//	@DisplayName("Test case where the find result is 0")
//	void testFindAllReturnEmptyList() {
//		List<User> list = new ArrayList<>();
//		
//		// set I/O of the mock class
//		when(repository.findAll()).thenReturn(list);
//		
//		// execute the service
//		List<User> actualList = repository.findAll();
//		
//		// check the number of execution of the mock's method
//		verify(repository, times(1)).findAll();
//		
//		// check the return value (expected, actual) 
//		assertEquals(0, actualList.size());
//	}
//	
//	@Test 
//	@DisplayName("Test case where the findAll()'s result is 2")
//	void testFindAllReturnList() {
//		List<User> list = new ArrayList<>();
//		User user1 = new User();
//		User user2 = new User(); 
//		list.add(user1);
//		list.add(user2);
//		
//		// set the mock class's I/O
//		when(repository.findAll()).thenReturn(list);
//		
//		// execute the service
//		List<User> actualList = repository.findAll();
//		
//		// check the number of the mock's method's execution
//		verify(repository, times(1)).findAll();
//		
//		// check the return value (expected, actual) 
//		assertEquals(2, actualList.size());
//	}
//	
//	@Test
//	@DisplayName("Test case where 1 user gets fetched")
//	void testGetUserReturnOne() {
//		// instantiate a user with a default value 
//		User user = new User(); 
//		user.setId(2020);
//		Optional<User> userOpt = Optional.ofNullable(user);
//		
//		// set the mock class's I/O
//		when(repository.findById(2020)).thenReturn(userOpt);
//		
//		// execute the service 
//		Optional<User> userActual = repository.findById(2020);
//		
//		// check the number of the mock's method's executions
//		verify(repository, times(1)).findById(2020); 
//		
//		// check if the report exists 
//		assertTrue(userActual.isPresent());
//	}
//	
//	@Test 
//	@DisplayName("Test case where no user can be fetched")
//	void testGetUserThrowException() {
//		// set the mock class's I/O
//		when(repository.findById(0)).thenThrow(new NoSuchElementException());
//		
//		// check if NoSuchElementException gets thrown when the designated user cannot be fetched
//		try {
//			Optional<User> userOpt = Optional.ofNullable(repository.findById(0).get());
//		} catch(NoSuchElementException e) {
//			assertEquals(e.getMessage(), "No value present"); 
//		}
//	}
	
//	@Test
//	@DisplayName("Test case where user (including image) is updated")
//	void testUpdateUser() throws Exception {
//		User existingUser = new User(); 
//		existingUser.setId(28);
//		existingUser.setName("Alex");
//		existingUser.setTargetLanguage("Swedish");
//		existingUser.setOwnLanguage("English");
//		existingUser.setEmail("alex.armstrong@gmail.com");
//		existingUser.setPassword("testpassword");
//		existingUser.setDescription("Mod ökats hundra gånger, muskler ökats tusen gånger!");
//		
//		existingUser.setImage(Base64.getDecoder().decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="));
//		
//		when(repository.findById(28)).thenReturn(Optional.of(existingUser));
//		when(repository.save(any())).thenAnswer((invocation) -> invocation.getArguments()[0]); 
//		
//		String base64ImageToUpload = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
//		
//		MockMultipartHttpServletRequestBuilder builder = MockMvcRequestBuilders.multipart("/api/user/28");
//		
//		mockMvc.perform(builder
//				.file("image", Base64.getDecoder().decode(base64ImageToUpload))
//		        .param("name", "Armstrong")
//		        .param("ownLanguage", "English")
//		        .param("targetLanguage", "Swedish")
//		        .param("country", "Amestris")
//		        .param("email", "john@example.com")
//		        .param("password", "testpassword")
//		        .param("description", "Mod ökats hundra gånger, muskler ökats tusen gånger!")
//		        .with(request -> {
//		          request.setMethod("PUT");
//		          return request;
//		        }))
//	        .andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
//	        .andExpect(jsonPath("$.name").value("Armstrong"))
//	        .andExpect(jsonPath("$.ownLanguage").value("Japanese"))
//	        .andExpect(jsonPath("$.targetLanguage").value("Chinese"))
//	        .andExpect(jsonPath("$.country").value("Amestris"))
//	        .andExpect(jsonPath("$.email").value("john@example.com"))
//	        .andExpect(jsonPath("$.password").value("testpassword2"))
//	        .andExpect(jsonPath("$.description").value("abc"))
//	        .andExpect(jsonPath("$.image").value(base64ImageToUpload));
//		
//	    ArgumentCaptor<User> argument = ArgumentCaptor.forClass(User.class);
//	    verify(repository, times(1)).save(argument.capture());
//	    assertEquals("Armstrong", argument.getValue().getName());
//	    assertEquals("English", argument.getValue().getOwnLanguage());
//	    assertEquals("Swedish", argument.getValue().getTargetLanguage());
//	    assertEquals("Amestris", argument.getValue().getCountry());
//	    assertEquals("alex.armstrong@gmail.com", argument.getValue().getEmail());
//	    assertEquals("testpassword", argument.getValue().getPassword());
//	    assertEquals(base64ImageToUpload, Base64.getEncoder().encodeToString(argument.getValue().getImage()));
//	}
//	
//}


package com.pictionarizer.controllers;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import java.util.Base64;
import java.util.Optional;
import com.pictionarizer.model.User;
import com.pictionarizer.repos.UserRepository;
import com.pictionarizer.repos.WordRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class) 
@WebMvcTest 
public class PictionarizerapiUserControllerTests {
	
  @MockBean // should be @MockBean instead of @Mock as it's Spring's Bean
  private UserRepository userRepository;
  
  @MockBean
  private WordRepository wordRepository;
  
  @Autowired // have Spring instantiate the field
  private MockMvc mockMvc;
  
  @Test
  @DisplayName("When an update request that updates all the elements (including image) is sent, the User data gets updated properly, and the updated User data gets returned in a form of JSON")
  public void testUpdateUser() throws Exception {
    // User before update
    User existingUser = new User();
    existingUser.setId(28);
    existingUser.setName("Alex");
    existingUser.setTargetLanguage("Swedish");
    existingUser.setOwnLanguage("English");
    existingUser.setEmail("alex.armstrong@gmail.com");
    existingUser.setPassword("testpassword");
    existingUser.setDescription("Mod ökats hundra gånger, muskler ökats tusen gånger!");
    existingUser.setImage(Base64.getDecoder().decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")); // 画像はhttps://png-pixel.com/で作った
    
    // return the User (before update) that is fetched by UserRepository#findById() with ID=28
    when(userRepository.findById(28)).thenReturn(Optional.of(existingUser));
    // UserRepository#save() returns the fetched entity as it is
    when(userRepository.save(any())).thenAnswer((invocation) -> invocation.getArguments()[0]);
    
    String base64ImageToUpload = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    mockMvc
        // send a request to update everything (including image) 
        .perform(MockMvcRequestBuilders.multipart("/api/user/28") 
            .file("image", Base64.getDecoder().decode(base64ImageToUpload)) 
            .param("name", "Armstrong")
            .param("ownLanguage", "Japanese")
            .param("targetLanguage", "Chinese")
            .param("country", "Amestris")
            .param("email", "john@example.com")
            .param("password", "testpassword2")
            .param("description", "abc")
            .with(request -> {
              request.setMethod("PUT");
              return request;
            }))
        // Status=200 should be returned
        .andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()))
        // the updated User is to be returned in a form of JSON
        .andExpect(jsonPath("$.name").value("Armstrong"))
        .andExpect(jsonPath("$.ownLanguage").value("Japanese"))
        .andExpect(jsonPath("$.targetLanguage").value("Chinese"))
        .andExpect(jsonPath("$.country").value("Amestris"))
        .andExpect(jsonPath("$.email").value("john@example.com"))
        .andExpect(jsonPath("$.password").value("testpassword2"))
        .andExpect(jsonPath("$.description").value("abc"))
        .andExpect(jsonPath("$.image").value(base64ImageToUpload));
    // the User is to be updated according to the request that has been sent
    ArgumentCaptor<User> argument = ArgumentCaptor.forClass(User.class);
    verify(userRepository, times(1)).save(argument.capture());
    assertEquals("Armstrong", argument.getValue().getName());
    assertEquals("Japanese", argument.getValue().getOwnLanguage());
    assertEquals("Chinese", argument.getValue().getTargetLanguage());
    assertEquals("Amestris", argument.getValue().getCountry());
    assertEquals("john@example.com", argument.getValue().getEmail());
    assertEquals("testpassword2", argument.getValue().getPassword());
    assertEquals("abc", argument.getValue().getDescription());
    assertEquals(base64ImageToUpload, Base64.getEncoder().encodeToString(argument.getValue().getImage()));
  }
}

