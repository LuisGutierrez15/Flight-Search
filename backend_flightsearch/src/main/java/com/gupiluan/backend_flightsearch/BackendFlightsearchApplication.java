package com.gupiluan.backend_flightsearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class BackendFlightsearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendFlightsearchApplication.class, args);
	}

}
