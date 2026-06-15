package musicboxd.service;

import org.springframework.stereotype.Service;

import musicboxd.dto.request.LoginRequestDTO;
import musicboxd.dto.request.UserRegisterRequestDTO;
import musicboxd.dto.response.AuthResponseDTO;

@Service
public class AuthService {

    public void register(UserRegisterRequestDTO request) {

    }

    public AuthResponseDTO login(LoginRequestDTO request) {

        return new AuthResponseDTO("token-de-exemplo");
    }

    public void sendRecoveryEmail(String email) {
   
    }

    public void validateEmail(String email) {
        
    }
}
