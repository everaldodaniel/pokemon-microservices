package com.poke_catalog_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@EnableCaching
public class PokeCatalogApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokeCatalogApiApplication.class, args);
	}

}
