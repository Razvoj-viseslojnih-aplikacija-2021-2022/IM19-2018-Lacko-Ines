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
import rppstart.model.Racun;
import rppstart.service.RacunService;

@CrossOrigin
@RestController
public class RacunController {
	@Autowired
    private RacunService racunService;

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @ApiOperation(value = "Returns List of all Racun")
    @GetMapping("racun")
    public ResponseEntity<List<Racun>> getAll() {
        List<Racun> racuns = racunService.getAll();
        return new ResponseEntity<>(racuns, HttpStatus.OK);
    }

   @ApiOperation(value = "Returns Racun with id that was forwarded as path variable.")
    @GetMapping("racun/{id}")
    public ResponseEntity<Racun> getOne(@PathVariable("id") Integer id) {
        if (racunService.findById(id).isPresent()) {
            Optional<Racun> racunOpt = racunService.findById(id);
            return new ResponseEntity<>(racunOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @ApiOperation(value = "Returns list of Racuns containing string that was forwarded as path variable in 'nacinplacanja'.")
    @GetMapping("racun/nacinplacanja/{nacinplacanja}")
    public ResponseEntity<List<Racun>> getByNacinplacanja(@PathVariable("nacinplacanja") String nacinplacanja) {
        List<Racun> racuns = racunService.findByNacinplacanjaContainingIgnoreCase(nacinplacanja);
        return new ResponseEntity<>(racuns, HttpStatus.OK);
    }

    @ApiOperation(value = "Adds new Racun to database.")
    @PostMapping("racun")
    public ResponseEntity<Racun> addRacun(@RequestBody Racun racun) {
        Racun savedRacun = racunService.save(racun);
        URI location = URI.create("/racun/" + savedRacun.getId());
        return ResponseEntity.created(location).body(savedRacun);
    }

   @ApiOperation(value = "Updates Racun that has id that was forwarded as path variable with values forwarded in Request Body.")
    @PutMapping(value = "racun/{id}")
    public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun, @PathVariable("id") Integer id) {
        if (racunService.existsById(id)) {
            racun.setId(id);
            Racun savedRacun = racunService.save(racun);
            return ResponseEntity.ok().body(savedRacun);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @ApiOperation(value = "Deletes Racun with id that was forwarded as path variable.")
    @DeleteMapping("racun/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
        if (id == -100 && !racunService.existsById(id)) {
            jdbcTemplate.execute(
                    "INSERT INTO racun (\"id\", \"datum\", \"nacinplacanja\") VALUES (-100, to_date('01.01.2000.', 'dd.mm.yyyy'), 'Test nacin placanja')");
        }

        if (racunService.existsById(id)) {
            racunService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }


}
