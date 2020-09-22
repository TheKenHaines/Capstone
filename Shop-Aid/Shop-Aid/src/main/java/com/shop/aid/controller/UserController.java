 package com.shop.aid.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.aid.model.User;
import com.shop.aid.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	

	@RequestMapping(value="submitUserDetails", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.POST)
	public void submitUserDetails(@RequestBody User user) {
		this.userRepository.save(user);
	}
	
	@RequestMapping(value="findUserById", produces=MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.GET)
	public ResponseEntity<Optional<User>> findUserById(@RequestParam String email) {
		return new ResponseEntity<>(this.userRepository.findById(email), HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/login", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.POST)
	public ResponseEntity<Optional<User>> logInUser(@RequestBody User u) {
		System.out.println(u.toString());
		Optional<User> user = this.userRepository.findById(u.getEmail());
		
		if(user.isPresent() && user.get().getPassword1().equals(u.getPassword1())) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
	
	
	
}
