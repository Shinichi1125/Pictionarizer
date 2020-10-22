package com.pictionarizer.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("SELECT Max(id) FROM User")
	int getLargestId();
	
	@Query("SELECT COUNT(id) FROM User")
	int getNoOfUsers();
	
	@Query("SELECT u FROM User u where u.targetLanguage = :targetLanguage") 
    List<User> findAllByTargetLanguage(@Param("targetLanguage") String targetLanguage);
	
	@Query("SELECT u FROM User u where u.ownLanguage = :ownLanguage") 
    List<User> findAllByOwnLanguage(@Param("ownLanguage") String ownLanguage);
	
	@Query("SELECT u FROM User u where u.name LIKE %:name%") 
    List<User> findAllByUserName(@Param("name") String name);
	
	@Query("SELECT u FROM User u where u.email = :email") 
    List<User> findByEmail(@Param("email") String email);
}
