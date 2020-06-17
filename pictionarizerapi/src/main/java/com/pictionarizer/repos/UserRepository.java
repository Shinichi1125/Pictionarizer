package com.pictionarizer.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pictionarizer.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
