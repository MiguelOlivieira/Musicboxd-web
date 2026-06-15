package musicboxd.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import musicboxd.dto.response.UserResponseDTO;
import musicboxd.model.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", expression = "java(String.valueOf(user.getUsuarioID()))")
    @Mapping(target = "name", source = "nome")
    @Mapping(target = "username", source = "email")
    @Mapping(target = "avatar", constant = "")
    @Mapping(target = "followers", constant = "0")
    @Mapping(target = "following", constant = "0")
    @Mapping(target = "isFollowing", constant = "false")
    UserResponseDTO toResponse(User user);

    List<UserResponseDTO> toResponseList(List<User> users);
}