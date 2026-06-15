package musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import musicboxd.dto.response.PlaylistResponseDTO;
import musicboxd.model.Playlist;

import java.util.List;

@Mapper(componentModel = "spring", uses = {MusicMapper.class})
public interface PlaylistMapper {

    @Mapping(target = "playlistID", source = "playlistID")
    @Mapping(target = "nomePlaylist", source = "nomePlaylist")
    @Mapping(target = "playlist", source = "playlist")
    PlaylistResponseDTO toResponse(Playlist playlist);

    List<PlaylistResponseDTO> toResponseList(List<Playlist> playlists);
}