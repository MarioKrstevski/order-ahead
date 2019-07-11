package com.ahead.order.app.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class BeerController {
	private BeerRepository repository;

	public BeerController(BeerRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/good-beers")
	@CrossOrigin(origins = "http://localhost:4200")
	public Collection<Beer> goodBeers() {

		return repository.findAll().stream()
				.filter(this::isGreat)
				.collect(Collectors.toList());
	}

	private boolean isGreat(Beer beer) {
		return !beer.getName().equals("Skopsko") &&
				!beer.getName().equals("Tuborg") &&
				!beer.getName().equals("Corona");
	}
}
