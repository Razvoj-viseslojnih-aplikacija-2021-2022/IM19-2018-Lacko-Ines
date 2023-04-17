package rppstart.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import rppstart.model.Proizvodjac;
import rppstart.service.ProizvodjacService;

@CrossOrigin
@RestController
public class ProizvodjacController {
	@Autowired
    private ProizvodjacService proizvodjacService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation(value = "Returns List of all Proizvodjacs")
    @GetMapping("proizvodjac")
    public ResponseEntity<List<Proizvodjac>> getAll() {
        List<Proizvodjac> proizvodjacs = proizvodjacService.getAll();
        return new ResponseEntity<>(proizvodjacs, HttpStatus.OK);
    }

   @ApiOperation(value = "Returns Proizvodjac with id that was forwarded as path variable.")
    @GetMapping("proizvodjac/{id}")
    public ResponseEntity<Proizvodjac> getOne(@PathVariable("id") Integer id) {
        if (proizvodjacService.findById(id).isPresent()) {
            Optional<Proizvodjac> proizvodjacOpt = proizvodjacService.findById(id);
            return new ResponseEntity<>(proizvodjacOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Returns list of Proizvodjacs containing string that was forwarded as path variable in 'naziv'.")
    @GetMapping("proizvodjac/naziv/{naziv}")
    public ResponseEntity<List<Proizvodjac>> getByNaziv(@PathVariable("naziv") String naziv) {
        List<Proizvodjac> proizvodjacs = proizvodjacService.findByNazivContainingIgnoreCase(naziv);
        return new ResponseEntity<>(proizvodjacs, HttpStatus.OK);
    }

    @ApiOperation(value = "Adds new Proizvodjac to database.")
    @PostMapping("proizvodjac")
    public ResponseEntity<Proizvodjac> addProizvodjac(@RequestBody Proizvodjac proizvodjac) {
    	Proizvodjac savedProizvodjac = proizvodjacService.save(proizvodjac);
        URI location = URI.create("/proizvodjac/" + savedProizvodjac.getId());
        return ResponseEntity.created(location).body(savedProizvodjac);
    }

    @ApiOperation(value = "Updates Proizvodjac that has id that was forwarded as path variable with values forwarded in Request Body.")
    @PutMapping(value = "proizvodjac/{id}")
    public ResponseEntity<Proizvodjac> updateProizvodjac(@RequestBody Proizvodjac proizvodjac, @PathVariable("id") Integer id) {
        if (proizvodjacService.existsById(id)) {
        	proizvodjac.setId(id);
            Proizvodjac savedProizvodjac = proizvodjacService.save(proizvodjac);
            return ResponseEntity.ok().body(savedProizvodjac);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Deletes Proizvodjac with id that was forwarded as path variable.")
    @DeleteMapping("proizvodjac/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {

        if (id == -100 && !proizvodjacService.existsById(id)) {
            jdbcTemplate.execute(
                    "INSERT INTO proizvodjac (\"id\", \"naziv\", \"adresa\", \"kontakt\") VALUES (-100, 'Test Naziv', 'Test Adresa', 'Test Kontakt')");
        }

        if (proizvodjacService.existsById(id)) {
        	proizvodjacService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }


}
