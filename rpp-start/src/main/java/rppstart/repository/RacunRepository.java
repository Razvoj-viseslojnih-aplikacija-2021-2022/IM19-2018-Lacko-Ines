package rppstart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.model.Racun;


public interface RacunRepository extends JpaRepository<Racun, Integer>{
	List<Racun> findByNacinplacanjaContainingIgnoreCase(String nacinplacanja);
}
