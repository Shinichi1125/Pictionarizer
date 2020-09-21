package com.pictionarizer.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.Word;

public interface WordRepository extends JpaRepository<Word, Integer> {
	
	@Query("SELECT w FROM Word w where w.userId = :userId") 
    List<Word> findAllByUserId(@Param("userId") int userId);
	
}
