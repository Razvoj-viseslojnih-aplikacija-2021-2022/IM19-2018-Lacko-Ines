package rppstart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rppstart.model.Proizvodjac;
import rppstart.repository.ProizvodjacRepository;

@Service
public class ProizvodjacService {
	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	public List<Proizvodjac> getAll(){
		return proizvodjacRepository.findAll();
	}
	
	public Optional<Proizvodjac> findById(Integer id) {
		return proizvodjacRepository.findById(id);
	}
	
	public List<Proizvodjac> findByNazivContainingIgnoreCase(String naziv) {
        return proizvodjacRepository.findByNazivContainingIgnoreCase(naziv);
    }
	
	public Proizvodjac save(Proizvodjac proizvodjac) {
		return proizvodjacRepository.save(proizvodjac);
	}
	
	public boolean existsById(Integer id) {
		return proizvodjacRepository.existsById(id);
	}
	
	public void deleteById(Integer id) {
		proizvodjacRepository.deleteById(id);
	}

}
