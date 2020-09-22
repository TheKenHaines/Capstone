package com.shop.aid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.shop.aid.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	
	@Query("FROM Item WHERE listID=?1")
	List<Item> findByItemList(String listID);
	
	@Modifying
	@Query("UPDATE Item i SET i.title=?1  WHERE i.id=?2")
	void editItem(String title, long id);
	
	@Modifying
	@Query("UPDATE Item i SET i.aisleLocation=?1  WHERE i.id=?2")
	void editAisle(String aisle, long id);
	
	
	@Query("FROM Item WHERE email=?1 AND listID=?2")
	List<Item> getList(String email, String listID);
	

	@Query("FROM Item WHERE store=?1")
	List<Item> getItemsByStore(String sore);
	

}

