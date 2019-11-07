package ch.zli.m223.punchclock;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.domain.Category;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import ch.zli.m223.punchclock.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseFilter implements CommandLineRunner {

    @Autowired
    ApplicationUserRepository applicationUserRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        generateUser("Admin", "password");
        generateCategory("Default", 1);
    }

    private void generateUser(String username, String password) {
        ApplicationUser user = new ApplicationUser();
        user.setUsername(username);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        applicationUserRepository.save(user);
    }

    private void generateCategory(String name, long id) {
        Category category = new Category();
        category.setName(name);
        category.setId(id);
        categoryRepository.save(category);
    }
}