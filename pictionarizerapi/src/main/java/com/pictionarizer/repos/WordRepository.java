package com.pictionarizer.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pictionarizer.model.Word;

public interface WordRepository extends JpaRepository<Word, Integer> {
	
}
