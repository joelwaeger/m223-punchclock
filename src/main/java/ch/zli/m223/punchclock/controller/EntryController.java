package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Entry;
import ch.zli.m223.punchclock.service.EntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/entries")
public class EntryController {
    private EntryService entryService;

    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Entry>> getAllEntries() {
        return new ResponseEntity<>(entryService.findAll(), HttpStatus.OK);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Entry> createEntry(@Valid @RequestBody Entry entry) {
        return new ResponseEntity<>(entryService.createEntry(entry), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEntry(@PathVariable("id") Long id) {
        entryService.deleteEntry(id);
    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Entry> updateEntry(@Valid @RequestBody Entry entry, @PathVariable("id") Long id) {
        return new ResponseEntity<>(entryService.updateEntryById(entry, id), HttpStatus.OK);
    }

}
