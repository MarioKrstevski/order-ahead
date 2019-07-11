package com.ahead.order.app.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import java.util.stream.Stream;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
@Entity
class Beer {

	@Id
	@GeneratedValue
	private long id;
	private String name;

	public Beer() {}

	public Beer(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Beer{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}

interface  BeerRepository extends JpaRepository<Beer, Long>{

}

@Component
class BeerCommandLineRunner implements CommandLineRunner{
	private final BeerRepository repository;

	public BeerCommandLineRunner(BeerRepository repository){
		this.repository= repository;
	}

	@Override
	public void run(String... strings) throws Exception{
		 Stream.of("Skopsko", "Lashko", "Tuborg", "Krali Marko", "Corona", "Zlaten Dab").forEach(name -> repository.save(new Beer(name)));
		repository.findAll().forEach(System.out::println);
	}
}