package musicboxd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import musicboxd.model.Publication;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Integer> {
    List<Publication> findByUser_UsuarioID(Integer usuarioId);
    List<Publication> findByMusic_MusicaID(Integer musicaId);
}
