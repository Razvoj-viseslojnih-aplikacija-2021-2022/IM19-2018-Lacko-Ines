package rppstart.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rppstart.model.Proizvod;
import rppstart.model.StavkaRacuna;


public interface Stavka_racunaRepository extends JpaRepository<StavkaRacuna, Integer> {
	List<StavkaRacuna> findByProizvod(Proizvod proizvod);
    List<StavkaRacuna> findByCenaLessThanOrderById(BigDecimal cena);
    
    @Query(value = "select coalesce(max(redni_broj)+1, 1) from stavka_racuna where proizvod = ?1", nativeQuery = true)
    Integer nextRBr(Integer proizvodId);
}
