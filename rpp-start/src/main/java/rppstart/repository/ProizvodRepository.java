package rppstart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.model.Proizvod;


public interface ProizvodRepository extends JpaRepository<Proizvod, Integer>{
	List<Proizvod> findByNazivContainingIgnoreCase(String naziv);
}
