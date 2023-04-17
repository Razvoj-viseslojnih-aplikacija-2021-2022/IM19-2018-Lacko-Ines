package rppstart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.model.Proizvodjac;


public interface ProizvodjacRepository extends JpaRepository<Proizvodjac, Integer> {
	List<Proizvodjac> findByNazivContainingIgnoreCase(String naziv);
}
