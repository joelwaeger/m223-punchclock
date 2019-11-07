package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private ApplicationUserRepository applicationUserRepository;

    public UserDetailsServiceImpl(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.getUsername(), applicationUser.getPassword(), emptyList());
    }

    public List<ApplicationUser> findAll() {
        return applicationUserRepository.findAll();
    }
/*
    private static List<ApplicationUser> users;
    {
        users = new ArrayList<ApplicationUser>();
        users.add(new ApplicationUser(1,"joel", "test"));
        users.add(new ApplicationUser(2,"joel", "123"));
    }
*/


   /* public Long delete(Long id) {

        for (ApplicationUser c : users) {
            if (c.getId().equals(id)) {
                users.remove(c);
                return id;
            }
        }


        return null;
    }

 */
}