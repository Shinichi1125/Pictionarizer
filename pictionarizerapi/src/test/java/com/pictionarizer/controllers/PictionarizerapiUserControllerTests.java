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

