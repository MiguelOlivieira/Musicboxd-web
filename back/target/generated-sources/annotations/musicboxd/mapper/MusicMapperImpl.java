package musicboxd.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.model.Music;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-15T03:51:02-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.19 (Microsoft)"
)
@Component
public class MusicMapperImpl implements MusicMapper {

    @Override
    public MusicResponseDTO toResponse(Music music) {
        if ( music == null ) {
            return null;
        }

        String title = null;
        String artist = null;
        String genre = null;

        title = music.getNomeMusica();
        artist = music.getArtista();
        if ( music.getGenero() != null ) {
            genre = music.getGenero();
        }
        else {
            genre = "Desconhecido";
        }

        String id = String.valueOf(music.getMusicaID());
        Integer year = 2023;
        String duration = "0:00";
        String cover = "";
        double rating = 0.0;

        MusicResponseDTO musicResponseDTO = new MusicResponseDTO( id, title, artist, year, genre, duration, cover, rating );

        return musicResponseDTO;
    }

    @Override
    public List<MusicResponseDTO> toResponseList(List<Music> musics) {
        if ( musics == null ) {
            return null;
        }

        List<MusicResponseDTO> list = new ArrayList<MusicResponseDTO>( musics.size() );
        for ( Music music : musics ) {
            list.add( toResponse( music ) );
        }

        return list;
    }
}
