package poo.musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import poo.musicboxd.dto.response.UserResponseDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", source = "usuarioID")
    @Mapping(target = "name", source = "nome")
    @Mapping(target = "username", source = "email")
    @Mapping(target = "avatar", constant = "")
    @Mapping(target = "followers", constant = "0")
    @Mapping(target = "following", constant = "0")
    @Mapping(target = "isFollowing", constant = "false")
    UserResponseDTO toResponse(poo.musicboxd.model.User user);

    List<UserResponseDTO> toResponseList(List<poo.musicboxd.model.User> users);
}