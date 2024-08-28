package com.cnmmtrestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.support.DatabaseStartupValidator;

import javax.sql.DataSource;

@SpringBootApplication
public class CnmmtRestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CnmmtRestApiApplication.class, args);
	}

}
