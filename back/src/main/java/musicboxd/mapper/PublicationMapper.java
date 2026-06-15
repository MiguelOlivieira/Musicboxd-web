package musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import musicboxd.dto.response.PublicationResponseDTO;
import musicboxd.model.Publication;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, MusicMapper.class})
public interface PublicationMapper {

    @Mapping(target = "id", expression = "java(String.valueOf(publication.getPublicationID()))")
    @Mapping(target = "album", source = "music")
    @Mapping(target = "rating", source = "avaliacao")
    @Mapping(target = "review", source = "descricao")
    @Mapping(target = "likes", source = "like", qualifiedByName = "booleanToInt")
    @Mapping(target = "comments", constant = "0")
    @Mapping(target = "timestamp", expression = "java(getCurrentTimestamp())")
    PublicationResponseDTO toResponse(Publication publication);

    List<PublicationResponseDTO> toResponseList(List<Publication> publications);

    @Named("booleanToInt")
    default int booleanToInt(boolean isLike) {
        return isLike ? 1 : 0;
    }

    default String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }
}