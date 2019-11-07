package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import ch.zli.m223.punchclock.service.UserDetailsServiceImpl;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt

        .BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(UserDetailsServiceImpl userDetailsService, ApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
    }

    @GetMapping("/customers")
    public List<ApplicationUser> getCustomers() {
        return userDetailsService.list();
    }

    @DeleteMapping("/index.html/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {

        if (null == userDetailsService.delete(id)) {
            return new ResponseEntity<String>("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Long>(id, HttpStatus.OK);

    }
    @PostMapping(value = "/index.html")
    public ResponseEntity<?> createCustomer(@RequestBody User user) {

        userDetailsService.create((org.springframework.security.core.userdetails.User) user);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}