package com.rest.auth.basicauth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BasicAuthController {

    @GetMapping(path = "/basicauth")
    public AuthenticationBean getWelcomeMessage() {
        return new AuthenticationBean("Logged in ");
    }
}
