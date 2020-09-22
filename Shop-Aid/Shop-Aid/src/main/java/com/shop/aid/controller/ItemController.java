package com.shop.aid.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.aid.dto.ImageTransferDTO;
import com.shop.aid.model.Item;
import com.shop.aid.repository.ItemRepository;

@CrossOrigin
@RestController
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	@RequestMapping(value = "submitItem", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_PROBLEM_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Item> submitItemList(@RequestBody Item item) {
		return new ResponseEntity<Item>(this.itemRepository.save(item), HttpStatus.OK);
	}


	@RequestMapping("delete")
	public void deleteItem(@RequestParam Long id) {
		this.itemRepository.deleteById(id);
	}

	@RequestMapping(value="setPicture", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.POST)
	public ResponseEntity<Item> setPicture(@RequestBody ImageTransferDTO dto) {
		Optional<Item> dbItem =this.itemRepository.findById(dto.getId());
		if(dbItem.isPresent()) {
			
			dbItem.get().setPicture(dto.getPicture() != null? dto.getPicture() : dbItem.get().getPicture());
			
			return new ResponseEntity<Item>(this.itemRepository.save(dbItem.get()), HttpStatus.OK);
		}
		
		return new ResponseEntity<Item>(HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("editItem")
	public void editItem(@RequestParam long id, @RequestParam String title) {
		Optional<Item> dbItem=this.itemRepository.findById(id);
		
		if(dbItem.isPresent()) {
			dbItem.get().setTitle(title);
			itemRepository.save(dbItem.get());
		}
		
	}
	
	@PutMapping("editAisle")
	public void editAisle(@RequestParam long id, @RequestParam String aisle) {
		Optional<Item> dbItem=this.itemRepository.findById(id);
		if(dbItem.isPresent()) {
			dbItem.get().setAisleLocation(aisle);
			itemRepository.save(dbItem.get());
		}
		
	}
	
	
	@RequestMapping(value="getList")
	public ResponseEntity <List<Item>> getList(@RequestParam String email, @RequestParam String listID) {
		return new ResponseEntity<List<Item>>(this.itemRepository.getList(email, listID), HttpStatus.OK);
	}
	
	@GetMapping("getItemsByStore")
	public ResponseEntity<List<Item>> getItemsByStore(@RequestParam String store) {
		return new ResponseEntity<List<Item>>(this.itemRepository.getItemsByStore(store), HttpStatus.OK);
	}
	
	

}




