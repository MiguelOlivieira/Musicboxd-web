package musicboxd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import musicboxd.model.Music;

@Repository
public interface MusicRepository extends JpaRepository<Music, Integer> {
}
