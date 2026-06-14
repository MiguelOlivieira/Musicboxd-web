package poo.musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import poo.musicboxd.dto.response.MusicResponseDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MusicMapper {

    @Mapping(target = "id", source = "musicaID")
    @Mapping(target = "title", source = "nomeMusica")
    @Mapping(target = "artist", source = "artista")
    @Mapping(target = "year", constant = "2023")
    @Mapping(target = "genre", source = "genero", defaultValue = "Desconhecido")
    @Mapping(target = "duration", constant = "0:00")
    @Mapping(target = "cover", constant = "")
    @Mapping(target = "rating", constant = "0.0")
    MusicResponseDTO toResponse(poo.musicboxd.model.Music music);

    List<MusicResponseDTO> toResponseList(List<poo.musicboxd.model.Music> musics);
}