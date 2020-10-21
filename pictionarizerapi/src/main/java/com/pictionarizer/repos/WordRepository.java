package com.pictionarizer.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pictionarizer.model.Word;

public interface WordRepository extends JpaRepository<Word, Integer> {
	
	@Query("SELECT w FROM Word w where w.userId = :userId") 
    List<Word> findAllByUserId(@Param("userId") int userId);
	
	@Query("SELECT w FROM Word w where w.targetLangWordName LIKE %:wordName% OR w.targetLangExSentence LIKE %:wordName%") 
    List<Word> findAllByWordName(@Param("wordName") String wordName);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Word w where w.userId = :userId") 
    void deleteAllByUserId(@Param("userId") int userId);	
	
}
