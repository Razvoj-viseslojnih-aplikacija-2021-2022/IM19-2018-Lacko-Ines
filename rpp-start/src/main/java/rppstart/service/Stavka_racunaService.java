package rppstart.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rppstart.model.Proizvod;
import rppstart.model.StavkaRacuna;
import rppstart.repository.Stavka_racunaRepository;

@Service
public class Stavka_racunaService {
	@Autowired
    private Stavka_racunaRepository stavka_racunaRepository;

    public List<StavkaRacuna> getAll() {
        return stavka_racunaRepository.findAll();
    }

    public List<StavkaRacuna> findByProizvod(Proizvod proizvod) {
        return stavka_racunaRepository.findByProizvod(proizvod);
    }

    public Optional<StavkaRacuna> findById(Integer id) {
        return stavka_racunaRepository.findById(id);
    }

    public List<StavkaRacuna> findByCenaLessThanOrderById(BigDecimal cena) {
        return stavka_racunaRepository.findByCenaLessThanOrderById(cena);
    }

    public Integer nextRBr(Integer proizvodId) {
        return stavka_racunaRepository.nextRBr(proizvodId);
    }

    public StavkaRacuna save(StavkaRacuna stavkaRacuna) {
        return stavka_racunaRepository.save(stavkaRacuna);
    }

    public boolean existsById(Integer id) {
        return stavka_racunaRepository.existsById(id);
    }

    public void deleteById(Integer id) {
    	stavka_racunaRepository.deleteById(id);
    }

}
