package musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import musicboxd.dto.response.MusicResponseDTO;
import musicboxd.model.Music;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MusicMapper {

    @Mapping(target = "id", expression = "java(String.valueOf(music.getMusicaID()))")
    @Mapping(target = "title", source = "nomeMusica")
    @Mapping(target = "artist", source = "artista")
    @Mapping(target = "year", constant = "2023")
    @Mapping(target = "genre", source = "genero", defaultValue = "Desconhecido")
    @Mapping(target = "duration", constant = "0:00")
    @Mapping(target = "cover", constant = "")
    @Mapping(target = "rating", constant = "0.0")
    MusicResponseDTO toResponse(Music music);

    List<MusicResponseDTO> toResponseList(List<Music> musics);
}