package com.pictionarizer.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "word")
public class Word {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private int userId;
	
	private String ownLangWordName;
	private String targetLangWordName; 
	private String ownLangExSentence; 
	private String targetLangExSentence; 
	private LocalDateTime createdDate;
	
	@Lob
	@Column
	private byte[] image;
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="user_id", nullable = true) // nullable should be false in production environment
//	private User user; 
	
	public Word() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getOwnLangWordName() {
		return ownLangWordName;
	}

	public void setOwnLangWordName(String ownLangWordName) {
		this.ownLangWordName = ownLangWordName;
	}

	public String getTargetLangWordName() {
		return targetLangWordName;
	}

	public void setTargetLangWordName(String targetLangWordName) {
		this.targetLangWordName = targetLangWordName;
	}

	public String getOwnLangExSentence() {
		return ownLangExSentence;
	}

	public void setOwnLangExSentence(String ownLangExSentence) {
		this.ownLangExSentence = ownLangExSentence;
	}

	public String getTargetLangExSentence() {
		return targetLangExSentence;
	}

	public void setTargetLangExSentence(String targetLangExSentence) {
		this.targetLangExSentence = targetLangExSentence;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	} 
	
}


