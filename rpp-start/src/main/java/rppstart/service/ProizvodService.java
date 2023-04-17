package rppstart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rppstart.model.Proizvod;
import rppstart.repository.ProizvodRepository;

@Service
public class ProizvodService {
	@Autowired
	private ProizvodRepository proizvodRepository;
	
	public List<Proizvod> getAll(){
		return proizvodRepository.findAll();
	}
	
	public Optional<Proizvod> findById(Integer id) {
		return proizvodRepository.findById(id);
	}
	
	public List<Proizvod> findByNazivContainingIgnoreCase(String naziv) {
        return proizvodRepository.findByNazivContainingIgnoreCase(naziv);
    }
	
	public Proizvod save(Proizvod proizvod) {
		return proizvodRepository.save(proizvod);
	}
	
	public boolean existsById(Integer id) {
		return proizvodRepository.existsById(id);
	}
	
	public void deleteById(Integer id) {
		proizvodRepository.deleteById(id);
	}

}
