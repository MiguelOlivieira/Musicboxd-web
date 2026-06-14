package poo.musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import poo.musicboxd.dto.response.PlaylistResponseDTO;

import java.util.List;

@Mapper(componentModel = "spring", uses = {MusicMapper.class})
public interface PlaylistMapper {

    @Mapping(target = "playlistID", source = "playlistID")
    @Mapping(target = "nomePlaylist", source = "nomePlaylist")
    @Mapping(target = "playlist", source = "playlist")
    PlaylistResponseDTO toResponse(poo.musicboxd.model.Playlist playlist);

    List<PlaylistResponseDTO> toResponseList(List<poo.musicboxd.model.Playlist> playlists);
}