package com.pictionarizer.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pictionarizer.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("SELECT Max(id) FROM User")
	int getLargestId();
	
	@Query("SELECT COUNT(id) FROM User")
	int getNoOfUsers();
}
