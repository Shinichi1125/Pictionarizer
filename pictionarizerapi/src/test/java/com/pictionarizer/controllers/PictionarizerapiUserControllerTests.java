package com.pictionarizer.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional; 

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

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
}

