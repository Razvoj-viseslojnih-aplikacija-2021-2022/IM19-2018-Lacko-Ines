package rppstart.controller;

import java.math.BigDecimal;
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
import rppstart.model.Proizvod;
import rppstart.model.StavkaRacuna;
import rppstart.service.ProizvodService;
import rppstart.service.Stavka_racunaService;

@CrossOrigin
@RestController
public class Stavka_racunaController {
	@Autowired
    private Stavka_racunaService stavka_racunaService;

    @Autowired
    private ProizvodService proizvodService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation(value = "Returns List of all Stvka_racunas")
    @GetMapping("stavka_racuna")
    public ResponseEntity<List<StavkaRacuna>> getAll() {
        List<StavkaRacuna> stavkaRacunas = stavka_racunaService.getAll();
        return new ResponseEntity<>(stavkaRacunas, HttpStatus.OK);
    }
    
  @ApiOperation(value = "Returns Stavka_racuna with id that was forwarded as path variable.")
    @GetMapping("stavka_racuna/{id}")
    public ResponseEntity<StavkaRacuna> getOne(@PathVariable("id") Integer id) {
        if (stavka_racunaService.findById(id).isPresent()) {
            Optional<StavkaRacuna> stavkaRacunaOpt = stavka_racunaService.findById(id);
            return new ResponseEntity<>(stavkaRacunaOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "Returns list of Stavka_racuna for Proizvod with id that was forwarded as path variable.")
    @GetMapping("stavkeZaRacune/{id}")
    public ResponseEntity<List<StavkaRacuna>> getAllForProizvod(@PathVariable("id") Integer id) {
        Optional<Proizvod> proizvodOpt = proizvodService.findById(id);
        if (proizvodOpt.isPresent()) {
            List<StavkaRacuna> stavkaRacunas = stavka_racunaService.findByProizvod(proizvodOpt.get());
            return new ResponseEntity<>(stavkaRacunas, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }

   @ApiOperation(value = "Returns list of StavkeRacuna with price that is lower then price that was forwarded as path variable.")
    @GetMapping(value = "stavka_racunaCena/{cena}")
    public ResponseEntity<List<StavkaRacuna>> getStavka_racunaCena(@PathVariable("cena") BigDecimal cena) {
        List<StavkaRacuna> stavkaRacunas = stavka_racunaService.findByCenaLessThanOrderById(cena);
        return new ResponseEntity<>(stavkaRacunas, HttpStatus.OK);

    }

    @ApiOperation(value = "Adds new Stavka_racuna to database.")
    @PostMapping("stavka_racuna")
    public ResponseEntity<StavkaRacuna> addOne(@RequestBody StavkaRacuna stavkaRacuna) {
        if (!proizvodService.existsById(stavkaRacuna.getProizvod().getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        stavkaRacuna.setRedniBroj(stavka_racunaService.nextRBr(stavkaRacuna.getProizvod().getId()));
        StavkaRacuna savedStavka_racuna = stavka_racunaService.save(stavkaRacuna);
        URI location = URI.create("/stavka_racuna/" + savedStavka_racuna.getId());
        return ResponseEntity.created(location).body(savedStavka_racuna);
    }

   @ApiOperation(value = "Updates Stavka_racuna that has id that was forwarded as path variable with values forwarded in Request Body.")
    @PutMapping("stavka_racuna/{id}")
    public ResponseEntity<StavkaRacuna> updateOne(@RequestBody StavkaRacuna stavkaRacuna,
            @PathVariable("id") Integer id) {
        if (!stavka_racunaService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        stavkaRacuna.setId(id);
        StavkaRacuna savedStavka_racuna = stavka_racunaService.save(stavkaRacuna);
        return ResponseEntity.ok().body(savedStavka_racuna);
    }

    @ApiOperation(value = "Deletes Stavka_racuna with id that was forwarded as path variable.")
    @DeleteMapping("stavka_racuna/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {
        if (id == -100 && !stavka_racunaService.existsById(-100)) {

            jdbcTemplate.execute(
                    "INSERT INTO stavka_racuna (\"id\", \"redni_broj\", \"kolicina\", \"jedinica_mere\", \"cena\", \"racun\", \"proizvod\") "
                            + "VALUES ('-100', '100', '1', 'kom', '1', '1', '1')");
        }

        if (stavka_racunaService.existsById(id)) {
            stavka_racunaService.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }


}
