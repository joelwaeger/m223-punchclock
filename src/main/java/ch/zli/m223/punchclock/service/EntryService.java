package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.Entry;
import ch.zli.m223.punchclock.repository.EntryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService {
    private EntryRepository entryRepository;

    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    public Entry createEntry(Entry entry) {
        if (entry.isDateEqual() == 0) {
            throw new BadRequestException("Dates cannot be same");
        }

        return entryRepository.saveAndFlush(entry);
    }

    public void deleteEntry(Long id) {
        entryRepository.deleteById(id);
    }

    public Entry updateEntryById(Entry entry, Long id) {
        entryRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Entity not found"));

        if (entry.isDateEqual() == 0) {
            throw new BadRequestException("Dates cannot be same");
        }
        entry.setId(id);
        return entryRepository.save(entry);

    }


    public List<Entry> findAll() {
        return entryRepository.findAll();
    }

}
