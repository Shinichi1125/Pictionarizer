package com.pictionarizer.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional; 

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.pictionarizer.model.User;
import com.pictionarizer.repos.UserRepository;


@ExtendWith(MockitoExtension.class)
@DisplayName("Unit test for UserController")
public class PictionarizerapiUserControllerTests {
	
	@Mock  //Mock class object
	private UserRepository repository;
	
	@Test 
	@DisplayName("Test case where the find result is 0")
	void testFindAllReturnEmptyList() {
		List<User> list = new ArrayList<>();
		
		// set I/O of the mock class
		when(repository.findAll()).thenReturn(list);
		
		// execute the service
		List<User> actualList = repository.findAll();
		
		// check the number of execution of the mock's method
		verify(repository, times(1)).findAll();
		
		// check the return value (expected, actual) 
		assertEquals(0, actualList.size());
	}
	
	@Test 
	@DisplayName("Test case where the findAll()'s result is 2")
	void testFindAllReturnList() {
		List<User> list = new ArrayList<>();
		User user1 = new User();
		User user2 = new User(); 
		list.add(user1);
		list.add(user2);
		
		// set the mock class's I/O
		when(repository.findAll()).thenReturn(list);
		
		// execute the service
		List<User> actualList = repository.findAll();
		
		// check the number of the mock's method's execution
		verify(repository, times(1)).findAll();
		
		// check the return value (expected, actual) 
		assertEquals(2, actualList.size());
	}
	
	@Test
	@DisplayName("Test case where 1 report gets fetched")
	void testGetUserReturnOne() {
		// instantiate a user with a default value 
		User user = new User(); 
		user.setId(2020);
		Optional<User> userOpt = Optional.ofNullable(user);
		
		// set the mock class's I/O
		when(repository.findById(2020)).thenReturn(userOpt);
		
		// execute the service 
		Optional<User> userActual = repository.findById(2020);
		
		// check the number of the mock's method's executions
		verify(repository, times(1)).findById(2020); 
		
		// check if the report exists 
		assertTrue(userActual.isPresent());
	}
	
//	@Test 
//	@DisplayName("Test case where no user can be fetched")
//	void testGetUserThrowException() {
//		// set the mock class's I/O
//		when(repository.findById(0)).thenThrow(new EmptyResultDataAccessException(1));
//		
//		// check if ReportNotFoundException gets thrown when a report cannot be fetched
//		try {
//			Optional<User> userOpt = Optional.ofNullable(repository.findById(0).get());
//		} catch(NoSuchElementException e) {
//			assertEquals(e.getMessage(), "No value present"); 
//		}
//	}
	
	@Test
	@DisplayName("Test case where user is deleted")
	void testDeleteUser() {
		List<User> list = new ArrayList<>();
		User user1 = new User();
		User user2 = new User(); 
		list.add(user1);
		list.add(user2);
		
	}
	
}

