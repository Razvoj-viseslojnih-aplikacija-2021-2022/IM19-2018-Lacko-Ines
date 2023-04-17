package rppstart.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the racun database table.
 * 
 */
@Entity
@NamedQuery(name="Racun.findAll", query="SELECT r FROM Racun r")
public class Racun implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="RACUN_ID_GENERATOR", sequenceName="RACUN_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RACUN_ID_GENERATOR")
	private Integer id;

	//@Temporal(TemporalType.DATE)
	private Date datum;

	private String nacinplacanja;

	//bi-directional many-to-one association to StavkaRacuna
	@JsonIgnore
	@OneToMany(mappedBy="racun")
	private List<StavkaRacuna> stavkaRacunas;

	public Racun() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDatum() {
		return this.datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getNacinplacanja() {
		return this.nacinplacanja;
	}

	public void setNacinplacanja(String nacinplacanja) {
		this.nacinplacanja = nacinplacanja;
	}

	public List<StavkaRacuna> getStavkaRacunas() {
		return this.stavkaRacunas;
	}

	public void setStavkaRacunas(List<StavkaRacuna> stavkaRacunas) {
		this.stavkaRacunas = stavkaRacunas;
	}

	public StavkaRacuna addStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacunas().add(stavkaRacuna);
		stavkaRacuna.setRacun(this);

		return stavkaRacuna;
	}

	public StavkaRacuna removeStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacunas().remove(stavkaRacuna);
		stavkaRacuna.setRacun(null);

		return stavkaRacuna;
	}

}